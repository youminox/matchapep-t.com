"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import BuyLink from "../BuyLink";
import { PRICE, PRICE_PER_SACHET } from "@/lib/client-constants";

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let w = 0,
      h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const N = w < 700 ? 45 : 110;
    const ps = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.05,
      hue: Math.random() < 0.7 ? 88 : 200,
      a: Math.random() * 0.6 + 0.2,
    }));
    let mx = -999,
      my = -999;
    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const dx = p.x - mx,
          dy = p.y - my,
          d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          p.vx += dx / 9000;
          p.vy += dy / 9000;
        }
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 - 0.004;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 70%, 62%, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => (raf = requestAnimationFrame(tick));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ric = (window as any).requestIdleCallback || ((f: () => void) => setTimeout(f, 300));
    ric(start);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 -z-[1] h-full w-full" aria-hidden />;
}

export default function Hero() {
  const card = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = card.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`;
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      el.style.transform = `rotateY(${Math.max(-15, Math.min(15, e.gamma / 2))}deg) rotateX(${Math.max(-12, Math.min(12, (e.beta - 45) / 3))}deg)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onOrient, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  const words = ["Matcha", "latte", "con", "péptidos"];
  return (
    <section className="hero min-h-[100svh] pt-[68px]">
      <div className="hero-aurora" />
      <div className="hero-grid" />
      <Particles />
      <div className="wrap grid min-h-[calc(100svh-68px)] items-center gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:py-0">
        <div className="relative z-10">
          <span className="chip">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fxlime" /> Nuevo de FuXion · con Nextida® GC
          </span>
          <h1 className="hero-title mt-6">
            <span className="block whitespace-nowrap text-gradient">Matcha Pep-T</span>
            <span className="mt-4 block text-[0.44em] font-bold leading-[1.25] tracking-[-0.02em] text-white/90">
              {words.map((w, i) => (
                <span key={w} className="reveal-word mr-[0.25em]">
                  <span style={{ animationDelay: `${0.15 + i * 0.09}s` }}>{w}</span>
                </span>
              ))}
              <span className="reveal-word">
                <span style={{ animationDelay: "0.55s" }} className="text-fxlime">
                  de colágeno
                </span>
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Una taza cremosa de matcha con <strong className="text-white">péptidos de colágeno Nextida® GC</strong>, fibra, chía y cromo. 46 kcal por
            porción, endulzado con estevia y listo en 30 segundos con agua fría o caliente.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BuyLink source="hero" className="btn btn-lime shine text-base">
              Comprar en tienda oficial · {PRICE}
            </BuyLink>
            <a href="#del-sobre-a-la-taza" className="btn btn-glass">
              Ver cómo se prepara
            </a>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              ["46", "kcal por taza"],
              ["4.9 g", "de fibra"],
              ["4.7 g", "de proteína"],
            ].map(([v, l]) => (
              <div key={l} className="glass px-4 py-3">
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-2xl font-extrabold text-white">{v}</dd>
                <p className="text-xs text-white/60">{l}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="tilt-stage relative z-10 mx-auto w-full max-w-[560px]">
          <div ref={card} className="tilt-card relative">
            <div className="tilt-glow" />
            <div className="relative" style={{ transform: "translateZ(40px)" }}>
              <div className="float-y">
              <Image
                src="/img/producto/matcha-pep-t-composicion-transparente.webp"
                alt="Matcha Pep-T de FuXion: doypack de 14 sobres, sobre individual y taza de matcha latte"
                width={900}
                height={741}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 90vw, 560px"
                className="h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
              />
              </div>
            </div>
            <div className="price-badge left-0 top-2 sm:left-auto sm:right-2 sm:top-6">
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-wider">Precio oficial</p>
                <p className="font-display text-2xl font-extrabold leading-none">S/158</p>
                <p className="text-[0.62rem] font-semibold">{PRICE_PER_SACHET} / sobre</p>
              </div>
            </div>
            <div className="absolute -left-2 bottom-4 hidden rounded-2xl border border-white/15 bg-[#0b1820]/90 px-4 py-3 shadow-xl backdrop-blur sm:block" style={{ transform: "translateZ(70px)" }}>
              <p className="text-[0.68rem] uppercase tracking-wider text-white/60">Contenido</p>
              <p className="font-display font-bold">14 sobres × 15 g</p>
            </div>
          </div>
        </div>
      </div>
      <a href="#que-es" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/50 lg:flex" aria-label="Bajar">
        <span className="h-10 w-6 rounded-full border border-white/30 p-1">
          <span className="block h-2 w-full animate-bounce rounded-full bg-fxlime" />
        </span>
      </a>
    </section>
  );
}
