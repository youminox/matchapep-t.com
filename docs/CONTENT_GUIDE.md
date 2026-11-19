# Guía editorial — matchapep-t.com

Sitio SEO de **un solo producto**: *Matcha Pep-T* de FuXion, para el mercado de **Perú** (español neutro-peruano, tuteo, moneda S/). Lo administra un distribuidor autorizado independiente: **CARLOS EDEN LINGAN BORJA (Lima, Perú)**. NO es el sitio oficial de FuXion.

## Fuente de verdad
- `src/data/product.json` → TODOS los datos (precio S/ 158.00, 14 sobres x 15 g, S/ 11.29 por sobre, tabla nutricional, ingredientes, preparación 1 sobre + 180 ml, hechos de Nextida GC y lo NO declarado). **Nunca inventes cifras** que no estén ahí. Si necesitas un dato externo general (p. ej. qué es el GLP-1), redáctalo de forma general y cita una fuente reconocida en `sources`.
- `src/data/keyword_map.json` → lista de las 98 URLs, su keyword principal, qué cubrir (`cover`) y qué NO cubrir (`avoid`). Respeta tu intención; para lo que pertenece a otra URL, resume en 1 frase y **enlaza** a esa URL.

## Reglas obligatorias
1. **Solo se habla de Matcha Pep-T.** No menciones ni recomiendes otros productos FuXion. Otros productos genéricos (café, té verde, colágeno genérico, Ozempic) solo como comparación.
2. **Exactitud de etiqueta**: porción = 1 sobre (15 g) en **180 ml** de agua. Azúcares añadidos = **0.9 g** por porción (NUNCA digas "sin azúcar" o "cero azúcar añadido"; sí puedes decir "endulzado con estevia y con muy poca azúcar"). Cafeína, L-teanina, EGCG y la dosis de Nextida GC **no están declaradas**.
3. **YMYL / salud**: no es un medicamento; no cura, no trata, no previene enfermedades; no prometas kilos ni plazos. Los efectos sobre GLP-1/glucosa se atribuyen SIEMPRE a "estudios del fabricante del ingrediente (Rousselot) con dosis de 5–10 g del ingrediente aislado", no al producto. Recomienda consultar a un profesional de salud cuando corresponda (embarazo, diabetes, medicación…).
4. **Sin testimonios inventados**, sin nombres ficticios de clientes, sin calificaciones/estrellas, sin "miles de personas ya lo usan". Las afirmaciones de FuXion se presentan como "lo que comunica la marca".
5. **Texto 100 % original.** No copies ni parafrasees de cerca fuxion.site ni otras webs. Cada artículo debe tener una introducción distinta, ejemplos propios (contexto peruano: Lima, garúa, tráfico, menú, combi, oficina en San Isidro, universidad, invierno húmedo, verano, mercados, etc.) y evitar frases plantilla repetidas entre artículos.
6. **Intención única**: la keyword principal aparece en el H1 (`title`), en `seoTitle`, en la primera frase de `quickAnswer` o del primer párrafo, y en al menos un H2, de forma natural (sin relleno).
7. **Enlazado interno**: 3–6 enlaces internos en el texto usando paths de `keyword_map.json` (formato `[ancla descriptiva](/pilar/slug/)`), siempre incluyendo el pilar de tu categoría y la página de compra `/comprar-matcha-pep-t/` al menos una vez. Anclas variadas y descriptivas (no "clic aquí").
8. Enlace a la tienda: si lo pones en el texto, usa exactamente `https://carlos-lingan.site.fuxion.com/producto/matcha-pep-t/`. El componente añade además tarjetas de compra automáticamente.
9. Estilo: claro, cercano y experto; párrafos cortos (2–4 frases); listas y tablas cuando ayuden; respuestas directas. Nada de emojis.

## Extensión
- Artículos: **900–1,500 palabras** (contando bloques y FAQs).
- Pilares: **2,000–3,000 palabras**, con una sección que liste y enlace TODOS los artículos de su categoría con 1 frase cada uno.

## Formato del archivo
Escribe un JSON por URL en `src/content/articles/<slug>.json` (para pilares el slug es el del pilar). UTF-8, JSON válido:

```json
{
  "slug": "para-bajar-de-peso",
  "pillar": "que-es-matcha-pep-t",
  "path": "/que-es-matcha-pep-t/para-bajar-de-peso/",
  "isPillar": false,
  "primaryKeyword": "Matcha Pep-T para bajar de peso",
  "title": "H1 (máx. 70 caracteres)",
  "seoTitle": "Title tag (máx. 60 caracteres)",
  "metaDescription": "140–155 caracteres, con la keyword y un beneficio",
  "excerpt": "1–2 frases para tarjetas",
  "quickAnswer": "Respuesta directa de 40–60 palabras (para fragmento destacado)",
  "readingMinutes": 6,
  "image": {
    "prompt": "English prompt for an AMBIENT photo, e.g. 'A tall glass of iced green matcha latte on a light wood desk next to a laptop in a bright Lima apartment, morning light, minimal Scandinavian style'. NO packaging, NO text, NO logos, NO visible faces.",
    "alt": "Texto alternativo en español, descriptivo y único"
  },
  "blocks": [
    { "type": "p", "text": "Párrafo con **negritas**, *cursivas* y [enlaces](/ingredientes-matcha-pep-t/)." },
    { "type": "h2", "text": "Subtítulo en forma de pregunta o beneficio" },
    { "type": "h3", "text": "Subtítulo opcional" },
    { "type": "ul", "items": ["…", "…"] },
    { "type": "ol", "items": ["…", "…"] },
    { "type": "table", "caption": "…", "headers": ["…", "…"], "rows": [["…", "…"]] },
    { "type": "callout", "variant": "etiqueta | fabricante | aviso | tip", "title": "…", "text": "…" },
    { "type": "steps", "items": [{ "name": "Paso", "text": "…" }] },
    { "type": "cta", "text": "Frase corta que invita a ver el precio o comprar" }
  ],
  "faqs": [{ "q": "Pregunta", "a": "Respuesta de 2–4 frases" }],
  "sources": [{ "label": "Nombre de la fuente", "url": "https://…" }],
  "related": ["/ingredientes-matcha-pep-t/calorias/", "/…/"]
}
```
- Incluye 1 bloque `cta` hacia la mitad del artículo.
- Incluye al menos 1 `callout` (`etiqueta` para datos de la etiqueta, `fabricante` para lo que comunica FuXion/Rousselot, `aviso` para salud).
- En recetas/preparación usa un bloque `steps` (se marca como HowTo).
- 3–5 FAQs que NO repitan los H2. `related`: 3–4 paths existentes y cercanos.
- `sources`: solo URLs reales y estables (p. ej. rousselot.com, pubmed.ncbi.nlm.nih.gov, ods.od.nih.gov, efsa.europa.eu, fda.gov, who.int, digesa.minsa.gob.pe). Si no estás seguro de una URL exacta, usa la página principal del organismo.
- NO incluyas fechas; las añade el sistema.

## Validación
Tras escribir cada archivo ejecuta: `python3 scripts/validate_article.py src/content/articles/<slug>.json` y corrige hasta que diga OK.
