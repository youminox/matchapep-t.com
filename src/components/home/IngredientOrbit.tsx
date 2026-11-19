"use client";

import Image from "next/image";
import { useState } from "react";

const ING = [
  { k: "Nextida® GC", e: "🧬", d: "Péptidos de colágeno hidrolizado de Rousselot. Es el primer ingrediente de la lista y la razón del “Pep” en Pep-T.", href: "/ingredientes-matcha-pep-t/nextida-gc-que-es/" },
  { k: "Té matcha", e: "🍵", d: "Té verde en polvo de hoja entera: sabor vegetal suave y el color jade de cada taza.", href: "/ingredientes-matcha-pep-t/te-matcha/" },
  { k: "Chía", e: "🌱", d: "Semilla que va en mezcla con el matcha y suma al perfil de fibra.", href: "/ingredientes-matcha-pep-t/chia/" },
  { k: "Crema de coco", e: "🥥", d: "Da la textura de latte sin necesidad de leche de vaca.", href: "/ingredientes-matcha-pep-t/crema-de-coco/" },
  { k: "Fibra de maíz", e: "🌽", d: "Parte de los 4.9 g de fibra por porción (18 % del valor diario).", href: "/ingredientes-matcha-pep-t/fibra-de-maiz/" },
  { k: "Cromo", e: "⚛", d: "14.9 µg por porción: el 45 % del valor diario de referencia.", href: "/ingredientes-matcha-pep-t/cromo/" },
  { k: "Isomaltulosa", e: "🍠", d: "Palatinose™ obtenida de la betarraga: un carbohidrato de liberación lenta.", href: "/ingredientes-matcha-pep-t/isomaltulosa-palatinose/" },
  { k: "Estevia", e: "🍃", d: "Edulcorante de origen vegetal que endulza sin sumar calorías.", href: "/ingredientes-matcha-pep-t/estevia/" },
];

export default function IngredientOrbit() {
  const [active, setActive] = useState(0);
  const a = ING[active];
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
      <div className="orbit mx-auto w-full max-w-[520px]">
        <div className="orbit-ring" />
        <div className="orbit-ring r2" />
        <div className="absolute inset-[26%] grid place-items-center rounded-full bg-gradient-to-br from-fxsky to-fxcream shadow-inner">
          <Image src="/img/producto/matcha-pep-t-composicion-transparente.webp" alt="Composición de Matcha Pep-T" width={240} height={198} className="h-auto w-[86%]" />
        </div>
        {ING.map((it, i) => {
          const ang = (i / ING.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(ang) * 44;
          const y = 50 + Math.sin(ang) * 44;
          const on = i === active;
          return (
            <button
              key={it.k}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={on}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-sm font-semibold shadow-lg transition-all duration-300 ${
                on ? "scale-110 border-fxblue bg-fxblue text-white" : "border-[var(--line)] bg-white text-fxink hover:border-fxblue"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span aria-hidden>{it.e}</span>
              <span className="hidden sm:inline">{it.k}</span>
            </button>
          );
        })}
      </div>
      <div>
        <span className="eyebrow">Ingrediente a ingrediente</span>
        <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Lo que hay dentro de cada sobre</h2>
        <div key={active} className="card mt-8 p-7" style={{ animation: "wordup .5s ease both" }}>
          <p className="text-4xl" aria-hidden>
            {a.e}
          </p>
          <p className="mt-3 font-display text-2xl font-extrabold">{a.k}</p>
          <p className="mt-2 text-lg text-[var(--muted)]">{a.d}</p>
          <a href={a.href} className="mt-4 inline-block font-semibold text-fxblue hover:underline">
            Saber más sobre {a.k} →
          </a>
        </div>
        <p className="mt-5 text-sm text-[var(--muted)]">
          Lista completa según la etiqueta: colágeno hidrolizado (Nextida® GC), fibra de maíz, crema de coco, mix de té matcha y chía, isomaltulosa,
          tapioca, saborizantes naturales, goma xantana, dióxido de silicio, estevia, lecitina de girasol y cromo.
        </p>
      </div>
    </div>
  );
}
