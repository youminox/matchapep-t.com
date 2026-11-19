import type { Metadata } from "next";
import Link from "next/link";
import SimplePage from "@/components/SimplePage";
import BuyLink from "@/components/BuyLink";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Envíos y devoluciones de Matcha Pep-T | matchapep-t.com",
  description: "Cómo funcionan los envíos de Matcha Pep-T a Lima y provincias, y qué hacer si tu pedido llega dañado o incompleto.",
  alternates: { canonical: `${SITE_URL}/envios-y-devoluciones/` },
};

export default function Page() {
  return (
    <SimplePage title="Envíos y devoluciones" crumb="Envíos y devoluciones" href="/envios-y-devoluciones/" intro="Información general sobre entregas y posventa de pedidos realizados en la tienda oficial FuXion.">
      <p>
        <strong>Distribuidor autorizado: {LEGAL_OWNER}, domiciliado en {LEGAL_LOCATION}.</strong>
      </p>
      <h2>Dónde se procesa tu pedido</h2>
      <p>
        Los pedidos de Matcha Pep-T se realizan y pagan en la tienda oficial FuXion del distribuidor. Desde ahí se gestiona la facturación, el despacho
        y la atención posventa.
      </p>
      <h2>Envíos</h2>
      <ul>
        <li>Se realizan envíos a Lima Metropolitana, Callao y provincias.</li>
        <li>El costo y el plazo dependen de tu dirección y se muestran antes de confirmar el pago.</li>
        <li>Recibirás la confirmación del pedido por los medios que indiques en la tienda.</li>
      </ul>
      <h2>Al recibir tu pedido</h2>
      <ul>
        <li>Verifica que el doypack llegue sellado, con lote y fecha de vencimiento legibles.</li>
        <li>Si el empaque llega dañado, abierto o incompleto, toma fotos y comunícate dentro de las 48 horas por la tienda oficial o el asesor virtual de este sitio.</li>
        <li>Conserva tu comprobante de pago.</li>
      </ul>
      <h2>Devoluciones</h2>
      <p>
        Por tratarse de un alimento, solo se aceptan cambios o devoluciones por productos defectuosos, dañados en el transporte o errores en el pedido,
        conforme al Código de Protección y Defensa del Consumidor. Tienes a tu disposición el Libro de Reclamaciones de la tienda oficial.
      </p>
      <p>
        Más detalles en la guía de <Link href="/opiniones-matcha-pep-t/garantia-y-devoluciones/">garantía y devoluciones de Matcha Pep-T</Link>.
      </p>
      <p>
        <BuyLink source="envios">Ir a la tienda oficial FuXion</BuyLink>
      </p>
    </SimplePage>
  );
}
