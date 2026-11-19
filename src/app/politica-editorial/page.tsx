import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política editorial | matchapep-t.com",
  description: "Cómo se investiga, redacta, revisa y actualiza el contenido de matchapep-t.com sobre Matcha Pep-T.",
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function Page() {
  return (
    <SimplePage title="Política editorial" crumb="Política editorial" href="/politica-editorial/">
      <p>
        Responsable: <strong>Distribuidor autorizado: {LEGAL_OWNER}, domiciliado en {LEGAL_LOCATION}.</strong>
      </p>
      <h2>Fuentes</h2>
      <p>
        La fuente principal es la etiqueta oficial de Matcha Pep-T (información nutricional e ingredientes). Para conceptos científicos usamos fuentes
        públicas reconocidas: el fabricante del ingrediente (Rousselot), PubMed, la Oficina de Suplementos Dietéticos de los NIH, EFSA, FDA y la OMS.
      </p>
      <h2>Tres tipos de afirmaciones</h2>
      <ul>
        <li><strong>Lo que dice la etiqueta:</strong> datos verificables del envase.</li>
        <li><strong>Lo que comunica el fabricante:</strong> mensajes de FuXion o Rousselot, presentados como tales.</li>
        <li><strong>Opiniones de clientes:</strong> solo verificadas y con consentimiento expreso.</li>
      </ul>
      <h2>Salud</h2>
      <p>
        No hacemos promesas de pérdida de peso ni de curación. Recomendamos consultar a un profesional de salud en los casos sensibles (embarazo,
        enfermedades crónicas, medicación, menores de edad).
      </p>
      <h2>Imágenes</h2>
      <p>
        Las fotografías del empaque y la etiqueta son oficiales de FuXion. Las imágenes de ambiente (tazas, cocinas, recetas) son ilustrativas y se
        generaron con herramientas de inteligencia artificial; no muestran resultados reales de consumo.
      </p>
      <h2>Actualización y correcciones</h2>
      <p>
        Revisamos el precio y la etiqueta periódicamente. Si encuentras un error, escríbenos mediante el asesor virtual o en la página de{" "}
        <Link href="/contacto/">contacto</Link> y lo corregiremos.
      </p>
      <h2>Relación comercial</h2>
      <p>Los enlaces de compra dirigen a la tienda oficial FuXion del distribuidor, que recibe una comisión por las ventas. Esto no influye en los datos que publicamos.</p>
    </SimplePage>
  );
}
