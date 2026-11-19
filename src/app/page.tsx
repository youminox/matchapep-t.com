import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuyLink from "@/components/BuyLink";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import IngredientOrbit from "@/components/home/IngredientOrbit";
import NutritionCounters from "@/components/home/NutritionCounters";
import TempSlider from "@/components/home/TempSlider";
import CostCalculator from "@/components/home/CostCalculator";
import { SITE_URL, getCategories, getArticlesIn, getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Matcha Pep-T FuXion Perú: qué es, precio y cómo se prepara",
  description:
    "Matcha Pep-T de FuXion: matcha latte con péptidos de colágeno Nextida® GC, fibra, chía y cromo. 46 kcal por taza. Precio oficial S/ 158.00 y compra en la tienda oficial.",
  alternates: { canonical: `${SITE_URL}/` },
};

const FAQ = [
  {
    q: "¿Qué es Matcha Pep-T?",
    a: "Es una mezcla en polvo de FuXion para preparar al instante un matcha latte. Combina té matcha y chía con colágeno hidrolizado (péptidos Nextida® GC), crema de coco, fibra de maíz y cromo, endulzado con estevia. Cada sobre de 15 g rinde una taza de 180 ml.",
  },
  {
    q: "¿Cuánto cuesta Matcha Pep-T en Perú?",
    a: "El precio oficial es S/ 158.00 por el doypack de 14 sobres, es decir, unos S/ 11.29 por taza. Se compra en la tienda oficial FuXion del distribuidor autorizado, con envío a Lima y provincias.",
  },
  {
    q: "¿Cómo se prepara?",
    a: "Mezcla 1 sobre (15 g) con 180 ml de agua fría o caliente, sin hervir, y agita o bate hasta disolver. Si te gusta más cremoso, añade un chorrito de bebida vegetal.",
  },
  {
    q: "¿Matcha Pep-T sirve para bajar de peso?",
    a: "No es un quemador de grasa ni un medicamento. Aporta 46 kcal, 4.7 g de proteína y 4.9 g de fibra por taza, y su ingrediente Nextida® GC se ha estudiado por su relación con la saciedad. Puede ayudarte a ordenar los antojos dentro de una alimentación equilibrada, pero no hace el trabajo solo.",
  },
  {
    q: "¿Tiene azúcar o cafeína?",
    a: "Tiene 2.0 g de azúcares totales por porción, de los cuales 0.9 g son añadidos (de la isomaltulosa); el resto del dulzor viene de la estevia. El matcha contiene cafeína de forma natural, pero la etiqueta no declara la cantidad.",
  },
  {
    q: "¿Dónde comprarlo original?",
    a: "En la tienda oficial FuXion del distribuidor autorizado Carlos Eden Lingan Borja. Así recibes producto sellado, con lote y fecha de vencimiento, al precio oficial.",
  },
];

const MOMENTS = [
  { img: "/img/ambiente/home-ritual-manana.webp", t: "A media mañana", d: "Cuando el desayuno ya quedó lejos y todavía falta para el almuerzo.", href: "/como-preparar-matcha-pep-t/mejor-hora-para-tomarlo/" },
  { img: "/img/ambiente/home-oficina.webp", t: "En la oficina", d: "Un sobre en la mochila, agua del dispensador y listo.", href: "/que-es-matcha-pep-t/en-la-oficina-y-teletrabajo/" },
  { img: "/img/ambiente/home-estudio.webp", t: "Para estudiar", d: "Una alternativa al tercer café de la noche de parciales.", href: "/que-es-matcha-pep-t/para-estudiantes-y-concentracion/" },
  { img: "/img/ambiente/home-entrenamiento.webp", t: "Si entrenas", d: "Ligero, con algo de proteína y fácil de llevar en el shaker.", href: "/como-preparar-matcha-pep-t/antes-o-despues-de-entrenar/" },
];

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const latest = all.filter((a) => !a.isPillar && a.imageUrl).slice(0, 6);
  return (
    <>
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />
      <main>
        <Hero />

        {/* Cinta */}
        <div className="border-y border-[var(--line)] bg-white py-4">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div key={k} className="marquee-track font-display text-lg font-bold text-fxink/70" aria-hidden={k === 1}>
                {["Péptidos de colágeno Nextida® GC", "46 kcal por taza", "4.9 g de fibra", "Té matcha + chía", "Crema de coco", "Endulzado con estevia", "Cromo 45 % VD", "14 sobres × 15 g", "Frío o caliente"].map((t) => (
                  <span key={t} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-2 w-2 rotate-45 bg-fxlime" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Qué es */}
        <section id="que-es" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div data-reveal>
              <span className="eyebrow">Qué es Matcha Pep-T</span>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                El matcha latte que <span className="text-fxblue">también suma</span> péptidos, fibra y proteína
              </h2>
              <p className="mt-5 text-lg text-[var(--muted)]">
                Matcha Pep-T es la bebida instantánea de FuXion que convierte un sobre de 15 g en una taza cremosa de matcha. Su diferencia está en la
                fórmula: <strong className="text-fxink">colágeno hidrolizado con péptidos Nextida® GC</strong> como primer ingrediente, fibra de maíz,
                chía, crema de coco y cromo. Sin lácteos en la lista de ingredientes y endulzado con estevia.
              </p>
              <p className="mt-4 text-lg text-[var(--muted)]">
                No es un medicamento ni un sustituto de comida: es una bebida ligera para los momentos en que normalmente caerías en un snack dulce o en
                otro café con azúcar.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/que-es-matcha-pep-t/" className="btn btn-ghost">
                  Guía completa: qué es y para qué sirve
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-reveal>
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl">
                <Image src="/img/ambiente/home-hero-ambiente.webp" alt="Vaso alto de Matcha Pep-T frío con hielo junto a hojas de té, chía y coco" fill sizes="(max-width:1024px) 100vw, 600px" className="object-cover" />
              </div>
              {[
                ["🧬", "Nextida® GC", "Péptidos de colágeno estudiados por su relación con el GLP-1"],
                ["🌾", "4.9 g de fibra", "El 18 % del valor diario en una sola taza"],
              ].map(([e, t, d]) => (
                <div key={t} className="card spot p-5">
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold">{t}</p>
                  <p className="text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ScrollStory />

        {/* Nextida GC */}
        <section className="relative overflow-hidden bg-[#0b1820] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-fxblue/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-fxlime/20 blur-3xl" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div data-reveal>
              <span className="eyebrow !text-fxlime">La ciencia del “Pep”</span>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Nextida® GC y el GLP-1, explicado sin humo</h2>
              <p className="mt-5 text-lg text-white/75">
                Nextida® GC es una composición específica de péptidos de colágeno desarrollada por <strong className="text-white">Rousselot</strong>. En
                estudios del fabricante, tomar <strong className="text-white">5 a 10 g</strong> del ingrediente unos 30 minutos antes de comer se asoció a
                una mayor liberación de GLP-1 (la hormona intestinal ligada a la saciedad) y a picos de glucosa más suaves después de la comida.
              </p>
              <div className="glass mt-6 p-5 text-sm text-white/75">
                <strong className="text-white">Para ser claros:</strong> esos resultados corresponden al ingrediente aislado, no al producto terminado, y la
                etiqueta no declara cuántos gramos de Nextida® GC lleva cada sobre (la proteína total es 4.7 g). Matcha Pep-T no es un fármaco GLP-1 como la
                semaglutida.
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/ciencia-matcha-pep-t/" className="btn btn-glass">
                  Leer la ciencia completa
                </Link>
                <Link href="/ingredientes-matcha-pep-t/nextida-gc-estudios/" className="btn btn-glass">
                  Ver los estudios
                </Link>
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[460px]" data-reveal aria-hidden>
              <svg viewBox="0 0 400 400" className="h-full w-full">
                <defs>
                  <radialGradient id="core" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#8CC63F" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#0093DD" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="200" cy="200" r="150" fill="url(#core)" opacity="0.35">
                  <animate attributeName="r" values="140;160;140" dur="5s" repeatCount="indefinite" />
                </circle>
                {Array.from({ length: 9 }).map((_, i) => {
                  const a = (i / 9) * Math.PI * 2;
                  const x = 200 + Math.cos(a) * 120;
                  const y = 200 + Math.sin(a) * 120;
                  return (
                    <g key={i}>
                      <line x1="200" y1="200" x2={x} y2={y} stroke="#5cc8ff" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 6">
                        <animate attributeName="stroke-dashoffset" values="0;-40" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
                      </line>
                      <circle cx={x} cy={y} r={10 + (i % 3) * 4} fill={i % 2 ? "#8CC63F" : "#0093DD"}>
                        <animate attributeName="r" values={`${10 + (i % 3) * 4};${14 + (i % 3) * 4};${10 + (i % 3) * 4}`} dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
                      </circle>
                    </g>
                  );
                })}
                <circle cx="200" cy="200" r="46" fill="#fff" />
                <text x="200" y="196" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="22" fill="#12232E">
                  GLP-1
                </text>
                <text x="200" y="218" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#5A6B78">
                  saciedad
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* Ingredientes */}
        <section className="wrap py-24">
          <IngredientOrbit />
        </section>

        {/* Etiqueta */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2a3f] via-[#0b1820] to-[#12331c] py-24 text-white">
          <div className="wrap grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="eyebrow !text-fxlime">Información nutricional real</span>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Lo que dice la etiqueta, cifra por cifra</h2>
              <p className="mt-4 max-w-xl text-white/70">Por porción de 1 sobre (15 g) disuelto en 180 ml de agua. Sin redondeos de marketing.</p>
              <div className="mt-8">
                <NutritionCounters />
              </div>
              <Link href="/ingredientes-matcha-pep-t/tabla-nutricional/" className="btn btn-glass mt-8">
                Cómo leer la tabla nutricional
              </Link>
            </div>
            <figure className="rounded-3xl bg-white p-3 shadow-2xl" data-reveal>
              <Image
                src="/img/producto/matcha-pep-t-informacion-nutricional-etiqueta.webp"
                alt="Etiqueta de información nutricional e ingredientes de Matcha Pep-T"
                width={600}
                height={1289}
                sizes="(max-width:1024px) 90vw, 420px"
                className="h-auto w-full rounded-2xl"
              />
              <figcaption className="px-2 pt-2 text-center text-xs text-[var(--muted)]">Etiqueta oficial de Matcha Pep-T (FuXion Perú)</figcaption>
            </figure>
          </div>
        </section>

        {/* Frío o caliente */}
        <section className="wrap py-24">
          <div className="mb-10 max-w-2xl" data-reveal>
            <span className="eyebrow">Frío o caliente</span>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Para la garúa de julio y para el sol de febrero</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">Arrastra la línea: el mismo sobre funciona con agua tibia en invierno o con hielo en verano.</p>
          </div>
          <TempSlider />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/como-preparar-matcha-pep-t/frio-con-hielo/" className="btn btn-ghost">
              Receta fría
            </Link>
            <Link href="/como-preparar-matcha-pep-t/caliente/" className="btn btn-ghost">
              Receta caliente
            </Link>
          </div>
        </section>

        {/* Momentos */}
        <section className="bg-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4" data-reveal>
              <div>
                <span className="eyebrow">Tu momento Matcha Pep-T</span>
                <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">¿Cuándo encaja en tu día?</h2>
              </div>
              <Link href="/como-preparar-matcha-pep-t/" className="font-semibold text-fxblue hover:underline">
                Ver todas las recetas →
              </Link>
            </div>
            <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none]">
              {MOMENTS.map((m) => (
                <Link key={m.t} href={m.href} className="card group relative w-[78%] shrink-0 snap-start overflow-hidden sm:w-[46%] lg:w-[calc(25%-15px)]">
                  <div className="relative aspect-[4/5]">
                    <Image src={m.img} alt={`${m.t}: momento para tomar Matcha Pep-T`} fill sizes="(max-width:640px) 80vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="font-display text-2xl font-extrabold">{m.t}</p>
                      <p className="mt-1 text-sm text-white/80">{m.d}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Precio */}
        <section className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div data-reveal>
              <span className="eyebrow">Precio oficial en Perú</span>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                S/ 158.00 por 14 sobres. <span className="text-fxblue">S/ 11.29 por taza.</span>
              </h2>
              <p className="mt-5 text-lg text-[var(--muted)]">
                Es el precio de catálogo en la tienda oficial FuXion. Comprando ahí recibes el producto sellado, con lote y fecha de vencimiento visibles, y
                envío a Lima y provincias.
              </p>
              <ul className="mt-6 space-y-3">
                {["Producto original y sellado", "Pago seguro en la tienda oficial", "Envíos a todo el Perú", "Atención del distribuidor autorizado en Lima"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-fxlime/20 text-sm text-[#3b630c]">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <BuyLink source="home-precio" className="btn btn-buy shine">
                  Comprar en la tienda oficial
                </BuyLink>
                <Link href="/precio-matcha-pep-t-peru/" className="btn btn-ghost">
                  Detalles de precio y envío
                </Link>
              </div>
            </div>
            <div data-reveal>
              <CostCalculator />
            </div>
          </div>
        </section>

        {/* Guías */}
        <section className="bg-gradient-to-b from-white to-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl" data-reveal>
              <span className="eyebrow">Guías especializadas</span>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Todo sobre Matcha Pep-T, ordenado por tema</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cats.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/`}
                  className={`card spot group p-7 ${i === 0 ? "lg:row-span-2 bg-gradient-to-br from-fxblue to-[#0a5f8f] text-white" : ""}`}
                  data-reveal
                >
                  <p className={`text-sm font-bold uppercase tracking-wider ${i === 0 ? "text-fxlime" : "text-fxblue"}`}>{getArticlesIn(c.slug).length} guías</p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold">{c.name}</h3>
                  <p className={`mt-2 ${i === 0 ? "text-white/80" : "text-[var(--muted)]"}`}>{c.description}</p>
                  {i === 0 && (
                    <ul className="mt-6 space-y-2 text-sm text-white/85">
                      {getArticlesIn(c.slug)
                        .slice(0, 6)
                        .map((a) => (
                          <li key={a.path}>→ {a.title}</li>
                        ))}
                    </ul>
                  )}
                  <span className={`mt-5 inline-block font-semibold ${i === 0 ? "text-white" : "text-fxblue"}`}>Explorar →</span>
                </Link>
              ))}
            </div>
            {latest.length > 0 && (
              <div className="mt-16">
                <h3 className="font-display text-2xl font-extrabold">Lo más consultado</h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {latest.map((a) => (
                    <ArticleCard key={a.path} a={a} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="wrap py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div data-reveal>
              <span className="eyebrow">Preguntas frecuentes</span>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Respuestas rápidas</h2>
              <p className="mt-4 text-[var(--muted)]">¿Te queda alguna duda? El asesor virtual responde al instante.</p>
              <Link href="/opiniones-matcha-pep-t/" className="btn btn-ghost mt-6">
                Más preguntas y opiniones
              </Link>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details key={f.q} className="card group p-5 open:shadow-lg">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxblue transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="wrap pb-10">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-fxblue via-[#0a6fa6] to-[#3f8f2a] px-8 py-16 text-center text-white sm:px-16">
            <div className="hero-grid opacity-60" />
            <h2 className="relative mx-auto max-w-3xl text-4xl font-extrabold sm:text-6xl">Tu próxima taza de matcha puede sumar más</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">Matcha Pep-T original, 14 sobres, al precio oficial de S/ 158.00 con envío a todo el Perú.</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <BuyLink source="home-final" className="btn btn-lime shine text-base">
                Comprar Matcha Pep-T ahora
              </BuyLink>
              <Link href="/comprar-matcha-pep-t/" className="btn btn-glass">
                Ver ficha del producto
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ClientEffects />
    </>
  );
}
