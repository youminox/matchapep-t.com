import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de cookies | matchapep-t.com",
  description: "Qué cookies y almacenamiento local utiliza matchapep-t.com y cómo puedes gestionarlos.",
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function Page() {
  return (
    <SimplePage title="Política de cookies" crumb="Cookies" href="/politica-de-cookies/" intro="Última actualización: 19 de noviembre de 2026.">
      <p>
        Responsable: <strong>Distribuidor autorizado: {LEGAL_OWNER}, domiciliado en {LEGAL_LOCATION}.</strong>
      </p>
      <h2>Qué usamos</h2>
      <ul>
        <li><strong>Almacenamiento local (localStorage):</strong> guarda un identificador anónimo y el historial de tu conversación con el asesor virtual para que no se pierda al cambiar de página. Puedes borrarlo con el botón «Reiniciar» del chat.</li>
        <li><strong>Cookies técnicas de la plataforma de alojamiento (Vercel):</strong> necesarias para servir el sitio de forma segura.</li>
        <li><strong>Analítica:</strong> si se activa, usamos herramientas de medición agregada para saber qué páginas son más útiles.</li>
      </ul>
      <h2>Cookies de terceros</h2>
      <p>Al ir a la tienda oficial FuXion, esa plataforma aplica su propia política de cookies.</p>
      <h2>Cómo gestionarlas</h2>
      <p>Puedes bloquear o eliminar cookies y datos de sitios desde la configuración de tu navegador. El sitio seguirá funcionando, aunque el chat no recordará tu conversación.</p>
    </SimplePage>
  );
}
