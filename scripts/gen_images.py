#!/usr/bin/env python3
"""Genera imágenes de ambiente vía la edge function matchapep-images (Supabase charlielingan → OpenAI)
y las convierte a WebP ligeros en public/img/.

Uso:
  python3 scripts/gen_images.py articles        # una imagen destacada por artículo (image.prompt)
  python3 scripts/gen_images.py home            # imágenes de la home / producto (HOME_PROMPTS)
  python3 scripts/gen_images.py one <slug> "<prompt>"
Tamaños de salida: <slug>.webp (1200x675, ≤70 KB), <slug>-800.webp, <slug>-400.webp
"""
import json, sys, io, pathlib, urllib.request, concurrent.futures as cf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/matchapep-images"
TOKEN = (ROOT / "scripts/.cache/image_token").read_text().strip()
RAW = ROOT / "scripts/.cache/raw"; RAW.mkdir(parents=True, exist_ok=True)

HOME_PROMPTS = {
    "home-hero-ambiente": "A tall clear glass of iced jade-green matcha latte with ice cubes and a creamy swirl, on a white marble counter, scattered fresh green tea leaves, chia seeds and a piece of fresh coconut, bright airy kitchen, soft morning light, lots of negative space on the left",
    "home-ritual-manana": "Overhead view of a cozy breakfast table in a Lima apartment with a ceramic mug of hot frothy matcha latte, a small bowl of matcha powder with bamboo whisk, notebook and sunlight through linen curtains",
    "home-oficina": "A matcha latte in a reusable glass cup on a modern office desk next to a laptop and plants, city view of Lima's San Isidro skyline through window, soft daylight",
    "home-ingredientes": "Flat lay of natural ingredients on light wood: bright green matcha powder in a ceramic bowl, chia seeds in a wooden scoop, halved fresh coconut, corn, fresh tea leaves, a small beet, minimalist composition",
    "home-verano": "Iced matcha latte in a mason jar with straw on a sunny terrace facing the Pacific ocean in Miraflores, Lima, summer afternoon",
    "home-invierno": "Hot matcha latte with latte art in a stoneware cup next to a window with grey drizzle (garua) outside, warm blanket, cozy winter afternoon in Lima",
    "home-entrenamiento": "Shaker bottle with green matcha drink next to running shoes and a towel on a bench in a bright gym, morning light",
    "home-estudio": "Matcha latte beside open textbooks, highlighters and a laptop on a university library desk, focused study atmosphere",
    "preparacion-paso-1": "A clear glass being filled with water from a glass pitcher on a white counter, minimal, close-up, soft light",
    "preparacion-paso-2": "Bright green matcha latte powder being poured from above into a glass of water creating a cloud of green, close-up, white background, high speed photography",
    "preparacion-paso-3": "A hand stirring a jade-green matcha latte in a glass with a long spoon, creamy texture, ice cubes, close-up, white counter",
    "producto-taza-fria": "Two glasses of iced matcha latte, one with oat milk swirl, on a light blue linen tablecloth with green tea leaves around, elegant",
    "producto-taza-caliente": "Steaming hot matcha latte in a white cup with delicate leaf latte art on a saucer, soft green background, elegant product-style still life",
    "og-default": "Hero shot of a jade-green iced matcha latte glass centered on a gradient background from sky blue to fresh lime green, minimalist, studio lighting",
}

def call(slug, prompt):
    data = json.dumps({"slug": slug, "prompt": prompt}).encode()
    req = urllib.request.Request(ENDPOINT, data=data, headers={"Content-Type": "application/json", "x-matchapep-token": TOKEN})
    with urllib.request.urlopen(req, timeout=240) as r:
        res = json.loads(r.read())
    if not res.get("ok"):
        raise RuntimeError(res.get("error"))
    with urllib.request.urlopen(res["url"] + "?v=1", timeout=120) as r:
        return r.read()

def save_variants(slug, raw_bytes, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    # recorte 16:9
    w, h = im.size; target = 16 / 9
    if w / h > target:
        nw = int(h * target); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    sizes = {"": 1200, "-800": 800, "-400": 400}
    limits = {"": 70_000, "-800": 42_000, "-400": 16_000}
    out = {}
    for suf, width in sizes.items():
        r = im.resize((width, round(width * 9 / 16)), Image.LANCZOS)
        q = 78
        while True:
            buf = io.BytesIO(); r.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= limits[suf] or q <= 45: break
            q -= 6
        p = outdir / f"{slug}{suf}.webp"; p.write_bytes(buf.getvalue()); out[suf] = buf.tell()
    return out

def job(slug, prompt, outdir):
    final = outdir / f"{slug}.webp"
    if final.exists():
        return slug, "skip"
    rawp = RAW / f"{slug}.webp"
    if rawp.exists():
        b = rawp.read_bytes()
    else:
        last = None
        for _ in range(3):
            try:
                b = call(slug, prompt); break
            except Exception as e:
                last = e
        else:
            return slug, f"ERROR {last}"
        rawp.write_bytes(b)
    sizes = save_variants(slug, b, outdir)
    return slug, f"ok {sizes['']//1024}KB"

def main():
    mode = sys.argv[1]
    tasks = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text())
            tasks.append((a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos"))
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for slug, status in ex.map(lambda t: job(*t), tasks):
            print(slug, status, flush=True)

if __name__ == "__main__":
    main()
