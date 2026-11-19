import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import BuyLink from "@/components/BuyLink";
import OpenChatButton from "@/components/OpenChatButton";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto | matchapep-t.com",
  description: "Contacta con el distribuidor autorizado de Matcha Pep-T en Lima: dudas sobre el producto, pedidos y correcciones.",
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function Page() {
  return (
    <SimplePage title="Contacto" crumb="Contacto" href="/contacto/" intro="¿Tienes una duda sobre Matcha Pep-T o sobre tu pedido? Estas son las vías más rápidas.">
      <p>
        <strong>Distribuidor autorizado: {LEGAL_OWNER}, domiciliado en {LEGAL_LOCATION}.</strong>
      </p>
      <h2>Dudas sobre el producto</h2>
      <p>El asesor virtual responde al instante preguntas sobre preparación, ingredientes, precio y envíos.</p>
      <OpenChatButton />
      <h2>Pedidos, pagos y envíos</h2>
      <p>Para todo lo relacionado con una compra (estado del pedido, comprobantes, reclamos), utiliza los canales de atención de la tienda oficial FuXion.</p>
      <p>
        <BuyLink source="contacto">Ir a la tienda oficial</BuyLink>
      </p>
      <h2>Opiniones y correcciones</h2>
      <p>
        Si ya probaste Matcha Pep-T, deja tu experiencia en la página de <Link href="/opiniones-matcha-pep-t/">opiniones</Link>. Si detectas un error en
        alguna guía, avísanos por el asesor virtual indicando la página.
      </p>
    </SimplePage>
  );
}
