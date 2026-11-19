import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import BuyLink from "@/components/BuyLink";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre el distribuidor: Carlos Lingan | matchapep-t.com",
  description: "Quién está detrás de matchapep-t.com: Carlos Eden Lingan Borja, distribuidor autorizado independiente de FuXion en Lima, Perú.",
  alternates: { canonical: `${SITE_URL}/sobre-el-distribuidor/` },
};

export default function Page() {
  return (
    <SimplePage title="Sobre el distribuidor" crumb="Sobre el distribuidor" href="/sobre-el-distribuidor/" intro="Quién escribe y revisa las guías de matchapep-t.com.">
      <p>
        <strong>Distribuidor autorizado: {LEGAL_OWNER}, domiciliado en {LEGAL_LOCATION}.</strong>
      </p>
      <p>
        Soy Carlos Lingan, distribuidor independiente autorizado de FuXion en Lima. Creé matchapep-t.com para reunir en un solo lugar información clara,
        ordenada y verificable sobre un único producto: Matcha Pep-T. Cuando salió al mercado, las preguntas se repetían —cuánta agua lleva, si tiene
        azúcar, qué es eso del GLP-1, dónde comprarlo original— y las respuestas que circulaban en redes muchas veces eran exageradas o simplemente
        incorrectas.
      </p>
      <h2>Cómo trabajamos el contenido</h2>
      <ul>
        <li>Cada dato nutricional se contrasta con la etiqueta oficial del producto.</li>
        <li>Las afirmaciones científicas se atribuyen a su fuente (por ejemplo, los estudios de Rousselot sobre Nextida® GC) y se explican sus límites.</li>
        <li>Separamos lo que dice la etiqueta, lo que comunica la marca y lo que opinan los clientes verificados.</li>
        <li>No publicamos testimonios inventados ni prometemos resultados.</li>
      </ul>
      <p>
        Puedes leer más en nuestra <Link href="/politica-editorial/">política editorial</Link>. Si quieres el catálogo completo de productos FuXion, visita{" "}
        <a href="https://fuxion.site/" target="_blank" rel="noopener">fuxion.site</a>.
      </p>
      <h2>Transparencia comercial</h2>
      <p>
        Como distribuidor, recibo una comisión cuando compras Matcha Pep-T en mi tienda oficial FuXion. Pagas exactamente el precio oficial (S/ 158.00),
        sin recargos.
      </p>
      <p>
        <BuyLink source="sobre-distribuidor">Visitar la tienda oficial de Carlos Lingan</BuyLink>
      </p>
    </SimplePage>
  );
}
