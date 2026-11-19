# -*- coding: utf-8 -*-
"""Fuente del mapa de palabras clave (1 URL = 1 intención). Genera src/data/keyword_map.json.
Formato: (pilar, slug, keyword principal, enfoque/qué cubrir, qué NO cubrir -> ver URL)."""
import json, pathlib

A, B, C, D, E, F = ("que-es-matcha-pep-t", "precio-matcha-pep-t-peru", "ingredientes-matcha-pep-t",
                    "como-preparar-matcha-pep-t", "opiniones-matcha-pep-t", "ciencia-matcha-pep-t")

PILLARS = [
 (A, "", "qué es Matcha Pep-T y para qué sirve", "Definición completa (mezcla instantánea de matcha latte con colágeno Nextida GC, fibra, chía, cromo), para qué sirve y beneficios declarados vs. lo que no promete, para quién es, qué esperar. Hub que enlaza a los 16 artículos A.", "No profundizar precio (B), recetas (D) ni estudios (F)."),
 (B, "", "Matcha Pep-T precio Perú", "Precio oficial S/ 158.00, contenido (14 sobres), S/ 11.29 por sobre, puntos, qué incluye, cómo comprar paso a paso en la tienda oficial, envío Lima/provincias en términos generales, garantía de originalidad. Hub de los 10 artículos B.", "No detallar ingredientes ni recetas."),
 (C, "", "Matcha Pep-T ingredientes", "Lista completa de la etiqueta en orden, función de cada ingrediente, tabla nutricional resumida, lo que no está declarado (cafeína, dosis de Nextida). Hub de los 20 artículos C.", "No profundizar estudios de GLP-1 (F)."),
 (D, "", "cómo preparar Matcha Pep-T", "Receta oficial 1 sobre + 180 ml, frío vs caliente, utensilios, horario sugerido, variantes con leche vegetal, resumen de recetas. HowTo. Hub de los 18 artículos D.", "No repetir en detalle cada receta, enlazar."),
 (E, "", "Matcha Pep-T opiniones", "Cómo evaluar opiniones: testimonio verificable vs afirmación comercial; qué dice FuXion (marcado como comercial), qué dice la etiqueta, qué preguntan los usuarios; FAQ amplia de seguridad. Formulario para que clientes reales dejen su opinión. NO inventar testimonios. Hub de los 14 artículos E.", "Sin testimonios inventados ni ratings falsos."),
 (F, "", "Matcha Pep-T GLP-1", "Qué es GLP-1, qué hace Nextida GC según estudios del fabricante (dosis 5-10 g, ingrediente aislado), qué significa para Matcha Pep-T con honestidad, resumen de comparativas. Hub de los 14 artículos F.", "No prometer pérdida de peso ni comparar con fármacos como equivalentes."),
]

ART = [
 # A — Qué es y para qué sirve (16)
 (A, "para-bajar-de-peso", "Matcha Pep-T para bajar de peso", "Qué puede aportar (46 kcal, 4.9 g fibra, 4.7 g proteína, saciedad) dentro de un déficit calórico y hábitos; qué NO hace (no quema grasa sola). Expectativas realistas.", "Mecanismo GLP-1 detallado -> F/que-es-glp-1"),
 (A, "saciedad-control-apetito", "Matcha Pep-T saciedad", "Cómo fibra + proteína + péptidos ayudan a sentirse satisfecho entre comidas; momento de toma antes de comidas; ejemplos de día típico en Lima.", "Evidencia científica de hormonas -> F/hormonas-de-la-saciedad"),
 (A, "para-mamas-ocupadas", "Matcha Pep-T para mamás", "Uso práctico para mamás con poco tiempo: preparación en 1 minuto, media mañana, reemplazar snack dulce; advertencia embarazo/lactancia enlazando a E.", "Embarazo en detalle -> E/embarazo-y-lactancia"),
 (A, "ansiedad-por-dulce-en-la-tarde", "Matcha Pep-T antojos de dulce", "El antojo de las 4-5 pm; sabor latte con estevia como alternativa a galletas/postres; estrategia de uso.", "Azúcar del producto -> C/tiene-azucar"),
 (A, "en-la-menopausia", "Matcha Pep-T menopausia", "Cambios metabólicos y de apetito en la menopausia; rol de proteína, fibra y colágeno; consultar médico; sin promesas hormonales.", ""),
 (A, "para-hombres", "Matcha Pep-T para hombres", "Uso en hombres: control de barriga/porciones, alternativa al café, combinar con entrenamiento; sin promesas de testosterona.", ""),
 (A, "para-personas-activas", "Matcha Pep-T deportistas", "Personas que entrenan/caminan/corren: aporte de proteína modesto (4.7 g), no reemplaza proteína post-entreno; cuándo tomarlo.", "Timing entrenamiento -> D/antes-o-despues-de-entrenar"),
 (A, "en-la-oficina-y-teletrabajo", "Matcha Pep-T en la oficina", "Llevar sobres al trabajo, preparación con agua del dispensador, evitar picoteo, reuniones largas.", ""),
 (A, "y-la-glucosa", "Matcha Pep-T glucosa", "Qué dicen los estudios del ingrediente sobre picos de glucosa post comida (fabricante), cromo 45% VD, isomaltulosa de liberación lenta; no reemplaza tratamiento; diabéticos consultar.", "Diabetes y seguridad -> E/diabetes"),
 (A, "colageno-y-piel", "Matcha Pep-T colágeno piel", "El colágeno hidrolizado del producto y la piel: qué se sabe del colágeno en general, cantidad modesta; no es un producto de belleza específico.", "Ingrediente técnico -> C/colageno-hidrolizado"),
 (A, "fibra-y-digestion", "Matcha Pep-T digestión", "4.9 g de fibra (18% VD) y tránsito intestinal, tomar agua, posibles gases al inicio.", "Fibra de maíz técnica -> C/fibra-de-maiz"),
 (A, "quien-fabrica-matcha-pep-t", "quién fabrica Matcha Pep-T", "FuXion (empresa peruana de bebidas funcionales, presencia internacional), el rol del distribuidor independiente, Rousselot como proveedor de Nextida. Incluir 1 enlace a https://fuxion.site/ como catálogo completo FuXion.", ""),
 (A, "es-sustituto-de-comida", "Matcha Pep-T reemplaza comida", "No es sustituto de comida (46 kcal); cómo integrarlo junto a comidas reales; riesgos de saltarse comidas.", ""),
 (A, "para-estudiantes-y-concentracion", "Matcha Pep-T para estudiar", "Época de exámenes, universidad, preuniversitario: matcha como alternativa al café/energizantes, rutina de estudio, sueño. Ángulo estudio (no oficina).", "Ciencia L-teanina -> F/l-teanina"),
 (A, "despues-de-los-40", "Matcha Pep-T después de los 40", "Metabolismo después de los 40, pérdida muscular, apetito; cómo encaja; actividad física.", "Menopausia -> A/en-la-menopausia"),
 (A, "novedades-y-lanzamiento", "Matcha Pep-T nuevo FuXion", "Qué trae de nuevo frente a otros productos: primer matcha latte de FuXion con Nextida GC; tendencia GLP-1 en 2025-2026; por qué llama la atención.", ""),
 # B — Precio y compra (10)
 (B, "cuanto-cuesta-un-sobre", "Matcha Pep-T precio por sobre", "S/ 158 / 14 = S/ 11.29 por sobre; comparación con un snack o bebida típica; costo por gramo de proteína y fibra.", ""),
 (B, "donde-comprar-original-en-lima", "dónde comprar Matcha Pep-T en Lima", "Canales oficiales: tienda oficial online del distribuidor; por qué evitar revendedores; cómo es la compra; entrega en Lima.", ""),
 (B, "envio-a-provincias", "Matcha Pep-T envío provincias", "Comprar desde Arequipa, Trujillo, Piura, Cusco, Chiclayo, etc. vía tienda oficial; tiempos y costos según la tienda (no inventar cifras exactas, indicar que se ven al pagar).", ""),
 (B, "original-vs-falsificado", "Matcha Pep-T original", "Señales de producto original: sobre sellado, lote y vencimiento, registro, texto de la etiqueta (ingredientes exactos), precio sospechosamente bajo.", ""),
 (B, "precio-vs-matcha-latte-de-cafeteria", "Matcha Pep-T vs matcha latte cafetería precio", "Un matcha latte en cafetería de Lima cuesta aprox. S/ 14-20 (indicar rango aproximado) vs S/ 11.29 por sobre; diferencias nutricionales (azúcar, calorías).", ""),
 (B, "presupuesto-mensual", "Matcha Pep-T cuánto dura y cuánto gastar al mes", "Escenarios: 1 sobre diario = ~2 doypacks/mes (S/ 316); 5 días a la semana; cálculo por semana.", "Duración del doypack -> E/cuanto-dura-un-doypack"),
 (B, "riesgos-de-comprar-en-marketplaces", "Matcha Pep-T Mercado Libre", "Riesgos de comprar en marketplaces/redes: vencidos, mal almacenados, falsificados, sin garantía; preferir tienda oficial.", "Señales de originalidad -> B/original-vs-falsificado"),
 (B, "formas-de-pago", "comprar Matcha Pep-T con tarjeta o Yape", "Medios de pago habituales en la tienda oficial FuXion (indicar que se confirman al pagar), paso a paso del checkout.", ""),
 (B, "precio-socio-vs-cliente", "Matcha Pep-T precio socio", "Diferencia entre comprar como cliente y registrarse como afiliado/socio FuXion (precio preferente, puntos 24); sin promesas de ingresos.", ""),
 (B, "ofertas-y-promociones", "Matcha Pep-T oferta", "Cómo funcionan las promociones de FuXion, cuándo suelen aparecer, desconfiar de 'ofertas' demasiado bajas; el precio de referencia S/ 158.", ""),
 # C — Ingredientes (20)
 (C, "nextida-gc-que-es", "Nextida GC qué es", "Qué es Nextida GC (Rousselot), péptidos de colágeno específicos, para qué fue diseñado (glucose control), por qué está en Matcha Pep-T.", "Estudios detallados -> C/nextida-gc-estudios"),
 (C, "nextida-gc-estudios", "Nextida GC estudios", "Resumen de estudios del fabricante: preclínico en ratones, pilotos en humanos, dosis 5 y 10 g, 30 min antes de comer, GLP-1/GIP, pico de glucosa; limitaciones y que la dosis por sobre no está declarada.", ""),
 (C, "colageno-hidrolizado", "Matcha Pep-T colágeno hidrolizado", "Qué es el colágeno hidrolizado, origen animal, digestibilidad, rol en la fórmula (primer ingrediente), proteína total 4.7 g.", "Piel -> A/colageno-y-piel"),
 (C, "te-matcha", "té matcha en Matcha Pep-T", "Qué es el matcha (té verde en polvo de hoja entera, sombreado), qué aporta, sabor; cantidad no declarada.", "Catequinas -> C/catequinas-egcg"),
 (C, "chia", "chía en Matcha Pep-T", "Chía: fibra, omega-3 vegetal, en mezcla con el matcha; aporte modesto.", ""),
 (C, "fibra-de-maiz", "fibra de maíz soluble", "Fibra de maíz (dextrina/fibra soluble) qué es, tolerancia, aporte a los 4.9 g de fibra.", "Digestión práctica -> A/fibra-y-digestion"),
 (C, "crema-de-coco", "crema de coco en Matcha Pep-T", "Por qué crema de coco: cremosidad sin lácteos, grasa saturada 0.5 g, sabor.", ""),
 (C, "isomaltulosa-palatinose", "isomaltulosa Palatinose", "Isomaltulosa de betarraga: carbohidrato de absorción lenta, bajo índice glucémico, cuenta como azúcar en la etiqueta.", "Azúcar total -> C/tiene-azucar"),
 (C, "cromo", "Matcha Pep-T cromo", "Cromo 14.9 µg (45% VD): qué es, rol en metabolismo de carbohidratos, límites seguros.", ""),
 (C, "estevia", "Matcha Pep-T estevia", "Estevia como edulcorante: glicósidos de esteviol, sin calorías, sabor, seguridad.", ""),
 (C, "aditivos-goma-xantana-silice-lecitina", "goma xantana dióxido de silicio lecitina", "Explicación honesta de los aditivos: goma xantana, dióxido de silicio, lecitina de girasol, tapioca, saborizantes naturales; por qué están, seguridad.", ""),
 (C, "tabla-nutricional", "Matcha Pep-T tabla nutricional", "La tabla completa por 100 ml y por porción de 180 ml con %VD y cómo leerla.", "Calorías -> C/calorias"),
 (C, "calorias", "Matcha Pep-T calorías", "46 kcal por porción, 26 kcal/100 ml; comparación con otras bebidas; con leche agregada cuánto sube.", ""),
 (C, "tiene-cafeina", "Matcha Pep-T tiene cafeína", "El matcha contiene cafeína de forma natural, pero la cantidad no está declarada; orientación para sensibles, embarazadas y de noche.", ""),
 (C, "tiene-azucar", "Matcha Pep-T tiene azúcar", "Azúcares totales 2.0 g y añadidos 0.9 g por porción (de la isomaltulosa); endulzado principalmente con estevia; aclarar el mito de 'cero azúcar'.", ""),
 (C, "es-keto-low-carb", "Matcha Pep-T keto", "7.8 g carbohidratos totales, 4.9 g fibra -> ~2.9 g netos; encaje en low carb/keto con matices.", ""),
 (C, "gluten-lactosa-alergenos", "Matcha Pep-T gluten lactosa", "Revisión de ingredientes frente a alérgenos comunes: no lista lácteos ni trigo en ingredientes, pero revisar advertencias del envase; coco como alérgeno potencial.", ""),
 (C, "es-vegano", "Matcha Pep-T vegano", "No es vegano: colágeno de origen animal; alternativas de uso para vegetarianos; cómo leer la etiqueta.", ""),
 (C, "cuanta-proteina-aporta", "Matcha Pep-T proteína", "4.7 g de proteína por porción (9% VD), de colágeno; diferencia con proteína completa; cómo complementar.", ""),
 (C, "catequinas-egcg", "matcha catequinas EGCG", "Antioxidantes del matcha (EGCG) en general, qué dice la ciencia, que la dosis en el producto no está declarada.", "L-teanina -> F/l-teanina"),
 # D — Cómo preparar (18)
 (D, "receta-clasica-180-ml", "receta Matcha Pep-T", "Receta base paso a paso con imágenes: 1 sobre + 180 ml, vaso o shaker, resultado; trucos de textura. Formato HowTo.", ""),
 (D, "frio-con-hielo", "Matcha Pep-T frío", "Iced matcha latte con hielo, en verano limeño, en botella para llevar.", ""),
 (D, "caliente", "Matcha Pep-T caliente", "Versión caliente para invierno limeño: temperatura sin hervir (~70-80 °C), cómo evitar grumos.", ""),
 (D, "latte-con-leche-de-almendra", "Matcha Pep-T con leche de almendra", "Receta con bebida de almendra, calorías extra, sabor.", ""),
 (D, "latte-con-avena", "Matcha Pep-T con leche de avena", "Receta con bebida de avena, cremosidad, carbohidratos extra.", ""),
 (D, "frappe", "frappé de Matcha Pep-T", "Frappé en licuadora con hielo, opcional plátano congelado.", ""),
 (D, "smoothie-con-platano", "smoothie de Matcha Pep-T", "Smoothie con plátano/espinaca/fruta peruana (aguaymanto, mango); calorías.", ""),
 (D, "overnight-oats", "overnight oats con matcha", "Avena remojada en refrigerador con 1 sobre; desayuno para llevar.", ""),
 (D, "pudin-de-chia", "pudín de chía con matcha", "Pudín de chía con Matcha Pep-T, proporciones, toppings.", ""),
 (D, "paletas-heladas", "paletas heladas de matcha", "Paletas/helado casero con Matcha Pep-T, ideal verano.", ""),
 (D, "en-shaker-sin-grumos", "Matcha Pep-T sin grumos", "Técnica con shaker, orden de agua primero, temperatura, batidor eléctrico.", ""),
 (D, "como-hacer-espuma", "espuma matcha latte casera", "Espuma tipo barista con espumador de mano o prensa francesa.", ""),
 (D, "mejor-hora-para-tomarlo", "a qué hora tomar Matcha Pep-T", "Horario: 30 min antes de una comida principal (lógica de los estudios), media mañana/tarde, evitar de noche por cafeína natural.", ""),
 (D, "cuantos-sobres-al-dia", "cuántos Matcha Pep-T al día", "1 sobre al día como referencia de la etiqueta (1 porción); no exceder; por qué más no es mejor.", ""),
 (D, "en-ayunas", "Matcha Pep-T en ayunas", "Tomarlo en ayunas: tolerancia gástrica, alternativas.", "Ayuno intermitente -> E/rompe-el-ayuno"),
 (D, "antes-o-despues-de-entrenar", "Matcha Pep-T antes de entrenar", "Pre-entreno vs post-entreno, hidratación.", ""),
 (D, "errores-al-prepararlo", "errores al preparar Matcha Pep-T", "Agua hirviendo, poca agua (no 18 ml: son 180 ml), mezclar mal, añadir azúcar, tomar varios.", ""),
 (D, "como-conservar-los-sobres", "cómo conservar Matcha Pep-T", "Lugar fresco y seco, humedad de Lima, cerrar el doypack, vencimiento, no refrigerar polvo.", ""),
 # E — Opiniones y FAQ (14)
 (E, "funciona", "Matcha Pep-T funciona", "Qué esperar realistamente, en qué plazo, de qué depende; distinguir lo que promete el marketing de lo que respalda la evidencia.", ""),
 (E, "efectos-secundarios", "Matcha Pep-T efectos secundarios", "Posibles molestias: gases por fibra, sensibilidad a cafeína, alergia al coco/colágeno; cuándo suspender.", ""),
 (E, "contraindicaciones", "Matcha Pep-T contraindicaciones", "Quiénes deben consultar antes: embarazo, lactancia, niños, enfermedades renales, medicación, alergias.", ""),
 (E, "embarazo-y-lactancia", "Matcha Pep-T embarazo", "Embarazo y lactancia: cafeína natural no declarada, consultar obstetra; enfoque prudente.", ""),
 (E, "diabetes", "Matcha Pep-T diabetes", "Personas con diabetes o prediabetes: lo que se sabe del ingrediente, carbohidratos 7.8 g, nunca reemplazar medicación, monitoreo.", ""),
 (E, "hipertension", "Matcha Pep-T presión alta", "Sodio 28 mg, cafeína natural; prudencia con hipertensión.", ""),
 (E, "ninos-y-adolescentes", "Matcha Pep-T niños", "No está pensado para niños; adolescentes con supervisión; cafeína.", ""),
 (E, "registro-sanitario", "Matcha Pep-T registro sanitario DIGESA", "Qué es el registro sanitario en Perú, dónde verificarlo en el envase, por qué importa.", ""),
 (E, "rompe-el-ayuno", "Matcha Pep-T rompe el ayuno", "Ayuno intermitente: 46 kcal y proteína rompen el ayuno estricto; cómo usarlo en la ventana de alimentación.", ""),
 (E, "interaccion-con-medicamentos", "Matcha Pep-T medicamentos", "Interacciones posibles (antidiabéticos, anticoagulantes por té verde, estimulantes); consultar médico. Mencionar análogos GLP-1.", ""),
 (E, "cuanto-dura-un-doypack", "cuánto dura Matcha Pep-T", "14 sobres = 14 días a 1 diario; vida útil cerrada/abierta según envase.", ""),
 (E, "garantia-y-devoluciones", "Matcha Pep-T devolución", "Políticas de la tienda oficial, qué hacer si llega dañado, conservar comprobante.", ""),
 (E, "como-dejar-tu-opinion", "opinar sobre Matcha Pep-T", "Invitación a clientes reales a dejar su experiencia mediante formulario moderado; cómo verificamos; por qué no publicamos testimonios sin verificar.", ""),
 (E, "sabor-y-textura", "Matcha Pep-T sabor", "Descripción objetiva del sabor declarado (matcha latte, crema caramelo, coco, estevia), textura, cómo ajustarlo.", ""),
 # F — Ciencia y comparativas (14)
 (F, "que-es-glp-1", "qué es GLP-1", "Hormona GLP-1 explicada para no médicos: intestino, saciedad, insulina, vaciamiento gástrico.", ""),
 (F, "vs-ozempic", "Matcha Pep-T vs Ozempic", "Diferencias de fondo: semaglutida es un fármaco agonista de GLP-1 con receta; Matcha Pep-T es un alimento con péptidos que estimulan liberación natural en estudios; no son equivalentes ni sustitutos.", ""),
 (F, "peptidos-bioactivos", "péptidos bioactivos qué son", "Qué son los péptidos bioactivos, cómo se obtienen por hidrólisis, ejemplos y evidencia.", ""),
 (F, "hormonas-de-la-saciedad", "hormonas de la saciedad", "GLP-1, PYY, CCK, grelina, leptina; cómo influyen proteína y fibra.", ""),
 (F, "vs-cafe", "Matcha Pep-T vs café", "Comparativa nutricional y de experiencia vs café pasado/americano; tabla.", ""),
 (F, "vs-te-verde", "Matcha Pep-T vs té verde", "Té verde en bolsita vs matcha vs Matcha Pep-T; tabla.", ""),
 (F, "vs-matcha-puro", "Matcha Pep-T vs matcha puro", "Matcha ceremonial puro vs mezcla funcional; ventajas y desventajas, precio.", ""),
 (F, "vs-colageno-en-polvo", "Matcha Pep-T vs colágeno en polvo", "Colágeno genérico (10 g típicos) vs Nextida específico; propósito distinto.", ""),
 (F, "vs-batidos-sustitutos", "Matcha Pep-T vs batidos sustitutos de comida", "Batidos sustitutos (200+ kcal) vs bebida de 46 kcal; uso distinto.", ""),
 (F, "vs-quemadores-termogenicos", "Matcha Pep-T vs quemadores de grasa", "Termogénicos con altas dosis de estimulantes vs enfoque de saciedad; riesgos de quemadores.", ""),
 (F, "l-teanina", "matcha L-teanina", "L-teanina natural del matcha y estado de alerta calmada: evidencia; no declarada en etiqueta.", ""),
 (F, "fibra-y-saciedad-evidencia", "fibra y saciedad estudios", "Qué dice la evidencia sobre fibra soluble y saciedad/peso.", ""),
 (F, "vs-cafe-con-colageno", "Matcha Pep-T vs café con colágeno", "Café con colágeno genérico vs Matcha Pep-T.", ""),
 (F, "suplementos-glp-1-en-peru", "suplementos GLP-1 Perú", "Panorama de productos 'GLP-1 natural' en Perú (probióticos, fibras, péptidos) sin marcas competidoras específicas; cómo evaluar claims; dónde encaja Matcha Pep-T.", ""),
]

out = []
for p, s, kw, cover, avoid in PILLARS:
    out.append({"slug": p, "pillar": p, "isPillar": True, "primaryKeyword": kw, "cover": cover, "avoid": avoid, "path": f"/{p}/"})
for p, s, kw, cover, avoid in ART:
    out.append({"slug": s, "pillar": p, "isPillar": False, "primaryKeyword": kw, "cover": cover, "avoid": avoid, "path": f"/{p}/{s}/"})

kws = [o["primaryKeyword"].lower() for o in out]
assert len(kws) == len(set(kws)), "keyword duplicada"
slugs = [o["path"] for o in out]
assert len(slugs) == len(set(slugs))
counts = {}
for o in out:
    if not o["isPillar"]:
        counts[o["pillar"]] = counts.get(o["pillar"], 0) + 1
print(len(out), "URLs de contenido", counts)
pathlib.Path(__file__).resolve().parent.parent.joinpath("src/data/keyword_map.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
