import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs, { JsonLd } from "@/components/Breadcrumbs";
import BuyLink from "@/components/BuyLink";
import ClientEffects from "@/components/ClientEffects";
import ProductGallery from "@/components/ProductGallery";
import { SITE_URL, product, productLd } from "@/lib/content";

export const metadata: Metadata = {
  title: "Comprar Matcha Pep-T FuXion original | S/ 158.00 en Perú",
  description:
    "Compra Matcha Pep-T de FuXion original: doypack de 14 sobres x 15 g a S/ 158.00 en la tienda oficial. Ficha técnica, ingredientes, tabla nutricional y envío a todo el Perú.",
  alternates: { canonical: `${SITE_URL}/comprar-matcha-pep-t/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/comprar-matcha-pep-t/`,
    title: "Comprar Matcha Pep-T FuXion original en Perú",
    images: [{ url: "/img/producto/matcha-pep-t-fuxion-doypack-y-sobre.webp", width: 1000, height: 1000, alt: "Matcha Pep-T FuXion doypack" }],
  },
};

const n = product.nutrition;
const ROWS: [string, string, string, string][] = [
  ["Energía", `${n.per100ml.kcal} kcal / ${n.per100ml.kj} kJ`, `${n.perServing.kcal} kcal / ${n.perServing.kj} kJ`, `${n.dailyValuePct.kcal}%`],
  ["Grasas totales", `${n.per100ml.fat} g`, `${n.perServing.fat} g`, `${n.dailyValuePct.fat}%`],
  ["Grasas saturadas", `${n.per100ml.satFat} g`, `${n.perServing.satFat} g`, `${n.dailyValuePct.satFat}%`],
  ["Grasas trans", `${n.per100ml.transFat} g`, `${n.perServing.transFat} g`, "—"],
  ["Colesterol", `${n.per100ml.cholesterolMg} mg`, `${n.perServing.cholesterolMg} mg`, `${n.dailyValuePct.cholesterol}%`],
  ["Sodio", `${n.per100ml.sodiumMg} mg`, `${n.perServing.sodiumMg} mg`, `${n.dailyValuePct.sodium}%`],
  ["Carbohidratos totales", `${n.per100ml.carbs} g`, `${n.perServing.carbs} g`, `${n.dailyValuePct.carbs}%`],
  ["Fibra dietaria", `${n.per100ml.fiber} g`, `${n.perServing.fiber} g`, `${n.dailyValuePct.fiber}%`],
  ["Azúcares totales", `${n.per100ml.sugars} g`, `${n.perServing.sugars} g`, `${n.dailyValuePct.sugars}%`],
  ["Azúcares añadidos", `${n.per100ml.addedSugars} g`, `${n.perServing.addedSugars} g`, "—"],
  ["Proteínas", `${n.per100ml.protein} g`, `${n.perServing.protein} g`, `${n.dailyValuePct.protein}%`],
  ["Cromo", `${n.per100ml.chromiumUg} µg`, `${n.perServing.chromiumUg} µg`, `${n.dailyValuePct.chromium}%`],
];

const FAQ = [
  { q: "¿Dónde se compra Matcha Pep-T original?", a: "En la tienda oficial FuXion del distribuidor autorizado. Al hacer clic en «Comprar» llegas directamente a la página del producto en carlos-lingan.site.fuxion.com, donde pagas y eliges la entrega." },
  { q: "¿Cuánto cuesta y cuántas tazas trae?", a: "S/ 158.00 por un doypack de 14 sobres de 15 g. Cada sobre es una taza de 180 ml, así que sale a unos S/ 11.29 por taza." },
  { q: "¿Hacen envíos a provincias?", a: "Sí. La tienda oficial despacha a Lima y a provincias. El costo y el plazo exactos se muestran al finalizar la compra, según tu dirección." },
  { q: "¿Cuánto me dura un doypack?", a: "Tomando 1 sobre al día, como indica la porción de la etiqueta, un doypack dura 14 días. Si lo tomas de lunes a viernes, rinde casi tres semanas." },
  { q: "¿Necesito ser socio de FuXion para comprar?", a: "No. Puedes comprar como cliente al precio oficial. Si te interesa registrarte como afiliado para obtener precio preferente, el distribuidor te puede orientar." },
];

export default function ComprarPage() {
  return (
    <>
      <Header />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            productLd(),
            { "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
          ],
        }}
      />
      <main className="pt-[68px]">
        <section className="bg-gradient-to-b from-fxsky to-white">
          <div className="wrap pb-16 pt-8">
            <Breadcrumbs items={[{ name: "Comprar Matcha Pep-T", href: "/comprar-matcha-pep-t/" }]} />
            <div className="mt-6 grid gap-12 lg:grid-cols-2">
              <ProductGallery />
              <div>
                <p className="eyebrow">FuXion · SKU {product.sku}</p>
                <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Comprar Matcha Pep-T FuXion original</h1>
                <p className="mt-3 text-lg text-[var(--muted)]">{product.packDescription}. {product.flavor}.</p>
                <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-1">
                  <p className="whitespace-nowrap font-display text-5xl font-extrabold text-fxink">{product.formattedPrice}</p>
                  <p className="pb-1.5 text-[var(--muted)]">{product.formattedPricePerSachet} por taza · IGV incluido</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  {[
                    ["Contenido", "14 sobres"],
                    ["Peso neto", "210 g"],
                    ["Por sobre", "15 g"],
                    ["Por taza", "180 ml"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-[var(--line)] bg-white p-3 text-center">
                      <p className="text-xs text-[var(--muted)]">{k}</p>
                      <p className="font-display font-bold">{v}</p>
                    </div>
                  ))}
                </div>
                <BuyLink source="ficha-principal" className="btn btn-buy shine mt-7 w-full text-lg">
                  Comprar en la tienda oficial FuXion →
                </BuyLink>
                <ul className="mt-5 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
                  {["Producto original y sellado", "Envío a Lima y provincias", "Pago seguro en tienda oficial", "Distribuidor autorizado en Lima"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="text-fxlime">✓</span> {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-2xl bg-white p-5 text-sm shadow-[0_10px_40px_-25px_rgba(0,80,130,0.5)]">
                  <p className="font-display font-bold text-fxink">En el empaque dice:</p>
                  <p className="mt-1 text-[var(--muted)]">Con péptidos de colágeno + fibra + chía + cromo. Mezcla en polvo para preparar bebida instantánea de té matcha, con colágeno hidrolizado y crema de coco.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wrap grid grid-cols-1 gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="prose-fx min-w-0">
            <h2 id="por-que">Por qué elegir Matcha Pep-T</h2>
            <p>
              Matcha Pep-T reúne en un solo sobre lo que normalmente comprarías por separado: el sabor de un matcha latte, una dosis de colágeno
              hidrolizado con péptidos <Link href="/ingredientes-matcha-pep-t/nextida-gc-que-es/">Nextida® GC</Link>, fibra y cromo. Todo con 46 kcal por
              taza y sin necesidad de licuadora ni leche.
            </p>
            <ul>
              <li><strong>Péptidos de colágeno Nextida® GC</strong>, un ingrediente de Rousselot estudiado por su relación con la liberación de GLP-1 y la saciedad.</li>
              <li><strong>4.9 g de fibra y 4.7 g de proteína</strong> por porción, dos nutrientes que ayudan a sentirte satisfecho entre comidas.</li>
              <li><strong>Endulzado con estevia</strong>: solo 2.0 g de azúcares totales por taza (0.9 g añadidos).</li>
              <li><strong>Cromo</strong>: 14.9 µg por porción, el 45 % del valor diario.</li>
              <li><strong>Práctico</strong>: se prepara en 30 segundos con agua fría o caliente.</li>
            </ul>

            <h2 id="modo-de-uso">Modo de uso</h2>
            <ol>
              {product.preparation.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p>
              Para sacarle provecho a la saciedad, muchas personas lo toman a media mañana o media tarde, o un rato antes de una comida principal. Encuentra
              recetas y horarios en la <Link href="/como-preparar-matcha-pep-t/">guía de preparación</Link>.
            </p>

            <h2 id="ingredientes">Ingredientes</h2>
            <p>{product.ingredientsText}</p>
            <p>
              ¿Qué hace cada uno? Lo explicamos en la <Link href="/ingredientes-matcha-pep-t/">guía de ingredientes y composición</Link>.
            </p>

            <h2 id="tabla-nutricional">Información nutricional</h2>
            <figure className="my-6 overflow-x-auto rounded-2xl border border-[var(--line)]">
              <table className="nowrap-table">
                <thead>
                  <tr>
                    <th>Nutriente</th>
                    <th>Por 100 ml</th>
                    <th>Por porción (180 ml)</th>
                    <th>% VD*</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r[0]}>
                      {r.map((c, i) => (
                        <td key={i}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <figcaption className="px-4 py-2 text-xs text-[var(--muted)]">
                Tamaño por ración: 15 g (1 sobre para diluir en 1 taza de agua). 14 raciones por empaque. *{n.dvBasis}.
              </figcaption>
            </figure>

            <h2 id="para-quien">¿Para quién es y para quién no?</h2>
            <p>
              Es una opción para adultos que buscan una bebida ligera y práctica para ordenar los antojos, reemplazar el snack dulce de la tarde o variar el
              café de siempre. No es un medicamento ni un sustituto de comida.
            </p>
            <aside className="my-6 rounded-2xl border border-rose-300/60 bg-rose-50 p-5">
              <p className="!mb-1 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">⚕ Aviso de salud</p>
              <p className="!mb-0">
                Si estás embarazada o dando de lactar, tienes diabetes, hipertensión, enfermedad renal, tomas medicación o es para un menor de edad, consulta
                antes con un profesional de salud. Contiene colágeno de origen animal y coco. Revisa las <Link href="/opiniones-matcha-pep-t/contraindicaciones/">contraindicaciones</Link>.
              </p>
            </aside>

            <h2 id="como-comprar">Cómo comprar en 4 pasos</h2>
            <ol>
              <li>Haz clic en «Comprar en la tienda oficial FuXion».</li>
              <li>En la página de Matcha Pep-T elige la cantidad y agrégalo al carrito.</li>
              <li>Ingresa tus datos y dirección de entrega en Lima o provincias.</li>
              <li>Paga con el medio que prefieras entre los disponibles y espera tu pedido.</li>
            </ol>
            <p>
              Más detalles sobre costos, envíos y originalidad en la guía de <Link href="/precio-matcha-pep-t-peru/">precio de Matcha Pep-T en Perú</Link>.
            </p>

            <h2 id="preguntas">Preguntas frecuentes de compra</h2>
            {FAQ.map((f) => (
              <details key={f.q} className="card group mb-3 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxblue transition group-open:rotate-45">+</span>
                </summary>
                <p className="!mb-0 mt-3 text-[var(--muted)]">{f.a}</p>
              </details>
            ))}
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 overflow-hidden rounded-3xl bg-[#0b1820] p-6 text-white">
              <Image src="/img/producto/matcha-pep-t-composicion-transparente.webp" alt="Matcha Pep-T" width={300} height={247} className="mx-auto h-auto w-full" />
              <p className="mt-3 font-display text-xl font-bold">Matcha Pep-T · 14 sobres</p>
              <p className="mt-1 font-display text-4xl font-extrabold text-fxlime">{product.formattedPrice}</p>
              <BuyLink source="ficha-sidebar" className="btn btn-lime shine mt-5 w-full">
                Comprar ahora
              </BuyLink>
              <p className="mt-4 text-xs text-white/60">Serás dirigido a la tienda oficial FuXion de Carlos Lingan (carlos-lingan.site.fuxion.com).</p>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
      <ClientEffects />
    </>
  );
}
