import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Aviso legal | matchapep-t.com",
  description: "Aviso legal de matchapep-t.com: titular, distribuidor autorizado FuXion en Lima, Perú, condiciones de uso y responsabilidad del contenido.",
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <SimplePage title="Aviso legal" crumb="Aviso legal" href="/aviso-legal/" intro="Última actualización: 19 de noviembre de 2026.">
      <h2>1. Titular del sitio</h2>
      <p>
        <strong>Distribuidor autorizado: {LEGAL_OWNER}, domiciliado en {LEGAL_LOCATION}.</strong> Es el responsable del sitio web matchapep-t.com (en
        adelante, «el sitio») y actúa como distribuidor independiente autorizado de productos FuXion.
      </p>
      <h2>2. Naturaleza del sitio</h2>
      <p>
        El sitio es una guía informativa especializada en el producto Matcha Pep-T de FuXion. No es la web corporativa de FuXion Biotech S.A.C. ni de
        sus empresas vinculadas. Las marcas FuXion®, Matcha Pep-T, Nextida® y Palatinose™ pertenecen a sus respectivos titulares y se mencionan solo con
        fines descriptivos.
      </p>
      <h2>3. Compras</h2>
      <p>
        En el sitio no se venden productos directamente. Los botones de compra dirigen a la tienda oficial FuXion del distribuidor
        (carlos-lingan.site.fuxion.com), donde se gestionan precio, pago, facturación, envío y atención posventa según las condiciones de esa
        plataforma. El distribuidor puede recibir una comisión por las compras realizadas a través de esos enlaces, sin costo adicional para ti.
      </p>
      <h2>4. Información de salud</h2>
      <p>
        El contenido es informativo y se basa en la etiqueta oficial del producto y en fuentes públicas. No constituye consejo médico, diagnóstico ni
        tratamiento. Matcha Pep-T no es un medicamento. Consulta a un profesional de salud antes de consumirlo si estás embarazada, das de lactar, tienes
        alguna enfermedad o tomas medicación.
      </p>
      <h2>5. Precios</h2>
      <p>
        Los precios mostrados (S/ 158.00 por doypack de 14 sobres) son referenciales y corresponden al catálogo vigente en la fecha de actualización. El
        precio final es el que figura en la tienda oficial al momento de la compra.
      </p>
      <h2>6. Propiedad intelectual</h2>
      <p>
        Los textos e imágenes de ambiente de este sitio son originales y están protegidos. Las imágenes del empaque y la etiqueta pertenecen a FuXion. No
        se permite su reproducción sin autorización.
      </p>
      <h2>7. Responsabilidad</h2>
      <p>
        El titular procura que la información sea exacta y esté actualizada, pero no garantiza la ausencia de errores. No se responsabiliza del contenido
        de sitios de terceros enlazados.
      </p>
      <h2>8. Legislación aplicable</h2>
      <p>
        Este aviso se rige por las leyes de la República del Perú, incluido el Código de Protección y Defensa del Consumidor (Ley N.º 29571). Para
        cualquier controversia serán competentes los jueces y tribunales de Lima.
      </p>
      <p>
        Consulta también la <Link href="/politica-de-privacidad/">política de privacidad</Link>, la <Link href="/politica-de-cookies/">política de cookies</Link> y
        la <Link href="/politica-editorial/">política editorial</Link>.
      </p>
    </SimplePage>
  );
}
