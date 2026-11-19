import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import { SITE_URL, LEGAL_OWNER, LEGAL_LOCATION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidad | matchapep-t.com",
  description: "Cómo matchapep-t.com trata tus datos personales conforme a la Ley N.º 29733 de Protección de Datos Personales del Perú.",
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function Page() {
  return (
    <SimplePage title="Política de privacidad" crumb="Privacidad" href="/politica-de-privacidad/" intro="Última actualización: 19 de noviembre de 2026.">
      <h2>Responsable del tratamiento</h2>
      <p>
        <strong>Distribuidor autorizado: {LEGAL_OWNER}, domiciliado en {LEGAL_LOCATION}.</strong> Tratamos tus datos conforme a la Ley N.º 29733, Ley de
        Protección de Datos Personales, y su reglamento.
      </p>
      <h2>Qué datos recogemos</h2>
      <ul>
        <li><strong>Asesor virtual (chat):</strong> los mensajes que escribes, un identificador anónimo del navegador, la página desde la que escribes y datos técnicos básicos (navegador). No te pedimos datos personales para usarlo; te recomendamos no compartir información sensible.</li>
        <li><strong>Formulario de opiniones:</strong> nombre, ciudad, correo (opcional), número de pedido (opcional), valoración y comentario.</li>
        <li><strong>Clics en enlaces de compra:</strong> registramos de forma anónima desde qué página se hizo clic, para medir qué contenidos son útiles.</li>
      </ul>
      <h2>Para qué los usamos</h2>
      <ul>
        <li>Responder tus consultas sobre Matcha Pep-T mediante un sistema de inteligencia artificial.</li>
        <li>Verificar y, con tu consentimiento expreso, publicar tu opinión con tu nombre y ciudad (nunca tu correo ni tu número de pedido).</li>
        <li>Mejorar el contenido y medir el uso del sitio de forma agregada.</li>
      </ul>
      <h2>Encargados y transferencias</h2>
      <p>
        Los datos se alojan en Supabase y Vercel, y los mensajes del chat se procesan con la API de OpenAI para generar respuestas. Estos proveedores
        pueden estar ubicados fuera del Perú y actúan como encargados del tratamiento.
      </p>
      <h2>Conservación</h2>
      <p>Conservamos las conversaciones hasta 12 meses y las opiniones mientras estén publicadas o hasta que solicites su eliminación.</p>
      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición (ARCO) escribiendo a través del asesor virtual o de la tienda
        oficial, indicando «Protección de datos». También puedes acudir a la Autoridad Nacional de Protección de Datos Personales.
      </p>
      <h2>Compras</h2>
      <p>
        Los datos de compra, pago y envío se gestionan en la tienda oficial FuXion (carlos-lingan.site.fuxion.com) bajo su propia política de
        privacidad.
      </p>
    </SimplePage>
  );
}
