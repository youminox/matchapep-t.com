# matchapep-t.com

Sitio SEO de un solo producto: **Matcha Pep-T de FuXion** (Perú). Todas las llamadas a la acción envían a la tienda oficial del distribuidor:
https://carlos-lingan.site.fuxion.com/producto/matcha-pep-t/

Distribuidor autorizado: **CARLOS EDEN LINGAN BORJA**, domiciliado en Lima, Perú.

## Stack
- Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 (SSG, `trailingSlash`), desplegado en Vercel desde GitHub (`main`).
- GSAP ScrollTrigger (escena "del sobre a la taza"), canvas de partículas, tilt 3D, comparador frío/caliente.
- Supabase (proyecto charlielingan `ehwjvuhbimqakvzqbvvg`):
  - Edge function `matchapep-chat`: asesor IA (gpt-4o-mini por defecto / gpt-4o), registro de clics a la tienda y opiniones.
  - Edge function `matchapep-images`: genera imágenes de ambiente con la API de imágenes de OpenAI (protegida por token).
  - Tablas `matchapep_chat_*`, `matchapep_reviews`, `matchapep_image_tokens` (RLS cerrado; admin en charlielingan.com → "matchapep-t.com").

## Contenido (100 URLs indexables)
Home + `/comprar-matcha-pep-t/` + 6 pilares + 92 artículos en `src/content/articles/*.json`.
- `src/data/product.json`: fuente única de verdad (etiqueta oficial, precio S/ 158.00).
- `src/data/keyword_map.json`: 1 URL = 1 intención (generado por `scripts/keyword_map_source.py`).
- `docs/CONTENT_GUIDE.md`: reglas editoriales (YMYL, exactitud de etiqueta, sin testimonios inventados).

## Scripts
- `python3 scripts/validate_article.py src/content/articles/*.json` — valida cada artículo.
- `python3 scripts/seo_quality_check.py` — canibalización interna y similitud con fuxion.site.
- `python3 scripts/gen_images.py articles|home` — genera y comprime imágenes (WebP 1200/800/400, ≤70 KB).

## Desarrollo
```bash
npm install
npm run dev
npm run build
```
