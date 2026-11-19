import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// matchapep-chat — asesor IA de matchapep-t.com (solo Matcha Pep-T).
// Modos: config (GET), chat, track_click, reviews, submit_review.
// Modelos permitidos: gpt-4o-mini (predeterminado) y gpt-4o.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const supabase = createClient(Deno.env.get("SUPABASE_URL") || "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "");

const SHOP = "https://carlos-lingan.site.fuxion.com/producto/matcha-pep-t/";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const SITE = "https://matchapep-t.com";

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

function cost(model: string, p: number, c: number) {
  if (model === "gpt-4o") return Number((p * 0.0000025 + c * 0.00001).toFixed(6));
  return Number((p * 0.00000015 + c * 0.0000006).toFixed(6));
}

const PRODUCT_FACTS = `
PRODUCTO ÚNICO: Matcha Pep-T de FuXion (SKU 151023).
- Presentación: doypack de 14 sobres x 15 g (210 g). Sabor natural a matcha latte.
- Precio oficial en Perú: S/ 158.00 (S/ 11.29 por sobre). 24 puntos FuXion.
- Compra: ${SHOP} (tienda oficial FuXion del distribuidor autorizado Carlos Eden Lingan Borja, Lima). Envíos a Lima y provincias; costos y plazos se ven al pagar.
- Preparación (etiqueta): 1 sobre (15 g) en 180 ml de agua (1 taza), fría con hielo o caliente sin hervir; mezclar o agitar. Opcional: chorrito de bebida vegetal. 1 porción al día como referencia.
- Tabla nutricional por porción (180 ml): 46 kcal; grasas 0.6 g (saturadas 0.5 g, trans 0 g); colesterol 0 mg; sodio 28 mg; carbohidratos 7.8 g; fibra 4.9 g (18% VD); azúcares totales 2.0 g; azúcares añadidos 0.9 g; proteína 4.7 g (9% VD); cromo 14.9 µg (45% VD).
- Ingredientes: colágeno hidrolizado (péptidos de proteína de colágeno Nextida® GC), fibra de maíz, crema de coco, mix de té matcha y chía, isomaltulosa (Palatinose™, de betarraga), tapioca, saborizantes naturales (crema caramelo y leche de coco), goma xantana, dióxido de silicio, estevia, lecitina de girasol, cromo.
- NO declarado en etiqueta: cantidad de cafeína (el matcha la contiene de forma natural), L-teanina, catequinas, ni la dosis exacta de Nextida GC.
- No es vegano (colágeno animal). No es sustituto de comida. No es medicamento.
- Nextida GC (Rousselot): en estudios del fabricante con 5–10 g del ingrediente aislado, tomado ~30 min antes de comer, se observó mayor liberación de GLP-1/GIP y menor pico de glucosa posprandial. Son resultados del ingrediente, no del producto; no es un fármaco GLP-1 como Ozempic.
GUÍAS DEL SITIO (puedes enlazarlas): ${SITE}/como-preparar-matcha-pep-t/ · ${SITE}/ingredientes-matcha-pep-t/ · ${SITE}/precio-matcha-pep-t-peru/ · ${SITE}/ciencia-matcha-pep-t/ · ${SITE}/opiniones-matcha-pep-t/ · ${SITE}/comprar-matcha-pep-t/
`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    let body: any = {};
    if (req.method === "POST") {
      const raw = await req.text();
      try { body = JSON.parse(raw || "{}"); } catch { body = {}; }
    }
    const mode = body.mode || "chat";

    const { data: configRow } = await supabase.from("matchapep_chat_config").select("*").eq("id", "default").maybeSingle();
    const config = configRow || {
      is_enabled: true, ai_model: "gpt-4o-mini", temperature: 0.4, max_messages_per_session: 20, daily_budget_usd: 5,
      welcome_message: "¡Hola! 👋 Soy el asesor virtual de Matcha Pep-T. ¿En qué te ayudo?", custom_instructions: "",
    };
    const activeModel = ALLOWED_MODELS.includes(config.ai_model) ? config.ai_model : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({ is_enabled: config.is_enabled, welcome_message: config.welcome_message, max_messages_per_session: config.max_messages_per_session });
    }

    if (mode === "track_click") {
      await supabase.from("matchapep_chat_clicks").insert({
        session_id: body.session_id || null,
        visitor_id: String(body.visitor_id || "anon").slice(0, 80),
        source: String(body.source || "chat").slice(0, 60),
        shop_url: SHOP,
        page_url: String(body.page_url || "").slice(0, 400),
      });
      if (body.session_id) {
        const { data: s } = await supabase.from("matchapep_chat_sessions").select("clicks_count").eq("id", body.session_id).maybeSingle();
        if (s) await supabase.from("matchapep_chat_sessions").update({ clicks_count: (s.clicks_count || 0) + 1, clicked_urls: [SHOP] }).eq("id", body.session_id);
      }
      return json({ success: true });
    }

    if (mode === "reviews") {
      const { data: rows } = await supabase
        .from("matchapep_reviews")
        .select("id, name, city, rating, comment, verified_purchase, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(30);
      return json({ reviews: rows || [] });
    }

    if (mode === "submit_review") {
      const name = String(body.name || "").trim().slice(0, 80);
      const comment = String(body.comment || "").trim().slice(0, 2000);
      if (!name || comment.length < 20 || body.consent !== true) return json({ ok: false, error: "Completa nombre, comentario (mín. 20 caracteres) y acepta el consentimiento." }, 400);
      if (body.website) return json({ ok: true }); // honeypot
      await supabase.from("matchapep_reviews").insert({
        name, comment,
        city: String(body.city || "").slice(0, 80) || null,
        email: String(body.email || "").slice(0, 120) || null,
        order_reference: String(body.order_reference || "").slice(0, 80) || null,
        rating: Number(body.rating) >= 1 && Number(body.rating) <= 5 ? Number(body.rating) : null,
        consent: true,
        page_url: String(body.page_url || "").slice(0, 400),
      });
      return json({ ok: true });
    }

    if (!config.is_enabled) {
      return json({ reply: `El asesor está en pausa por unos minutos. Puedes ver precio y comprar Matcha Pep-T en la [tienda oficial FuXion](${SHOP}).`, suggested_options: [], disabled: true });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);
    const visitorId = String(body.visitor_id || "visitor-" + crypto.randomUUID().slice(0, 8)).slice(0, 80);
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 400);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    const start = new Date(); start.setUTCHours(0, 0, 0, 0);
    const { data: today } = await supabase.from("matchapep_chat_sessions").select("estimated_cost_usd").gte("last_message_at", start.toISOString());
    const spent = (today || []).reduce((a: number, r: any) => a + Number(r.estimated_cost_usd || 0), 0);
    if (spent >= Number(config.daily_budget_usd || 5)) {
      return json({ reply: `Por hoy alcanzamos el límite de consultas automáticas. Puedes revisar la [guía de preparación](${SITE}/como-preparar-matcha-pep-t/) o comprar directo en la [tienda oficial](${SHOP}).`, suggested_options: [] });
    }

    let session: any = null;
    if (sessionId) {
      const { data: s } = await supabase.from("matchapep_chat_sessions").select("*").eq("id", sessionId).maybeSingle();
      session = s;
    }
    if (session && session.messages_count >= (config.max_messages_per_session || 20) * 2) {
      return json({ session_id: session.id, reply: `Llegamos al máximo de mensajes de esta conversación. Si ya te decidiste, puedes comprar Matcha Pep-T aquí: [tienda oficial FuXion](${SHOP}).`, suggested_options: [] });
    }
    if (!session) {
      const { data: created } = await supabase.from("matchapep_chat_sessions").insert({
        visitor_id: visitorId, page_url: pageUrl, user_agent: (req.headers.get("user-agent") || "").slice(0, 300),
        first_user_message: userMessage.slice(0, 250), last_user_message: userMessage.slice(0, 250), messages_count: 1, model_used: activeModel,
      }).select("*").single();
      if (created) { session = created; sessionId = created.id; }
    }
    if (sessionId) await supabase.from("matchapep_chat_messages").insert({ session_id: sessionId, role: "user", content: userMessage });

    const systemPrompt = `Eres el asesor virtual de matchapep-t.com, un sitio especializado ÚNICAMENTE en Matcha Pep-T de FuXion para Perú, gestionado por el distribuidor autorizado Carlos Eden Lingan Borja (Lima).
Objetivo: resolver dudas con precisión y calidez, y guiar a la compra en la tienda oficial.

REGLAS:
1. Habla SOLO de Matcha Pep-T. Si preguntan por otros productos, responde amablemente que este asesor solo cubre Matcha Pep-T y vuelve al tema.
2. Usa EXCLUSIVAMENTE los datos de la ficha de abajo. Nunca inventes cifras (cafeína, dosis de Nextida, resultados, kilos, plazos). Si algo no está declarado, dilo.
3. Salud: no es medicamento; no diagnostiques ni prometas curar o bajar X kilos. Ante embarazo, lactancia, diabetes, hipertensión, medicación, enfermedad renal o menores, recomienda consultar a un profesional de salud.
4. El único enlace de compra permitido es ${SHOP}. Inclúyelo en formato Markdown [texto](${SHOP}) cuando el usuario muestre interés en comprar, precio o envío, y al cerrar respuestas útiles. Puedes enlazar guías de ${SITE}. Nunca uses otros dominios.
5. Respuestas breves (máx. 120 palabras), en español peruano, tuteo, con viñetas si ayudan.
6. Contexto: el visitante está en ${pageUrl}.
${config.custom_instructions ? "7. Instrucción del administrador: " + config.custom_instructions : ""}

FICHA:
${PRODUCT_FACTS}

Responde SOLO con JSON válido: {"reply": "texto con markdown", "suggested_options": ["opción corta 1", "opción corta 2", "opción corta 3"]}`;

    const messages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (h && (h.role === "user" || h.role === "assistant") && typeof h.content === "string") messages.push({ role: h.role, content: h.content.slice(0, 1200) });
    }
    messages.push({ role: "user", content: userMessage });

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
      body: JSON.stringify({ model: activeModel, messages, temperature: Number(config.temperature) || 0.4, max_tokens: 600, response_format: { type: "json_object" } }),
    });
    if (!r.ok) { console.error(await r.text()); throw new Error("OpenAI " + r.status); }
    const data = await r.json();
    let parsed: any = {};
    try { parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}"); } catch { parsed = { reply: data.choices?.[0]?.message?.content }; }
    const reply: string = parsed.reply || `Puedes ver todos los detalles y comprar en la [tienda oficial FuXion](${SHOP}).`;
    const options: string[] = Array.isArray(parsed.suggested_options) ? parsed.suggested_options.slice(0, 3).map((s: unknown) => String(s).slice(0, 60)) : [];
    const pt = data.usage?.prompt_tokens || 0, ct = data.usage?.completion_tokens || 0, tt = data.usage?.total_tokens || pt + ct;
    const c = cost(activeModel, pt, ct);

    if (sessionId && session) {
      await supabase.from("matchapep_chat_messages").insert({ session_id: sessionId, role: "assistant", content: reply, suggested_options: options, model: activeModel, prompt_tokens: pt, completion_tokens: ct, total_tokens: tt, cost_usd: c });
      await supabase.from("matchapep_chat_sessions").update({
        last_user_message: userMessage.slice(0, 250), messages_count: (session.messages_count || 1) + 2,
        prompt_tokens: (session.prompt_tokens || 0) + pt, completion_tokens: (session.completion_tokens || 0) + ct, total_tokens: (session.total_tokens || 0) + tt,
        estimated_cost_usd: Number((Number(session.estimated_cost_usd || 0) + c).toFixed(6)), model_used: activeModel, last_message_at: new Date().toISOString(),
      }).eq("id", sessionId);
    }
    await supabase.from("token_usage").insert({ source: "matchapep-t.com", content_type: "ai_chat", model: activeModel, prompt_tokens: pt, completion_tokens: ct, total_tokens: tt, images_generated: 0, estimated_cost_usd: c, slug: sessionId || visitorId });

    return json({ session_id: sessionId, reply, suggested_options: options, model: activeModel });
  } catch (err: any) {
    console.error("matchapep-chat error:", err);
    return json({ error: err.message || "Error interno", reply: `Tuvimos un problema momentáneo. Puedes comprar Matcha Pep-T directamente en la [tienda oficial FuXion](${SHOP}).`, suggested_options: ["Intentar de nuevo"] }, 500);
  }
});
