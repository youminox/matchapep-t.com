"use client";

import Image from "next/image";
import { useState } from "react";

const IMGS = [
  { src: "/img/producto/matcha-pep-t-fuxion-doypack-y-sobre.webp", alt: "Matcha Pep-T FuXion: doypack de 14 sobres, sobre de 15 g y taza de matcha latte", w: 1000, h: 1000, contain: true },
  { src: "/img/ambiente/producto-taza-fria.webp", alt: "Dos vasos de matcha latte frío preparados con Matcha Pep-T", w: 1200, h: 675 },
  { src: "/img/ambiente/producto-taza-caliente.webp", alt: "Matcha Pep-T caliente con arte latte en taza blanca", w: 1200, h: 675 },
  { src: "/img/producto/matcha-pep-t-informacion-nutricional-etiqueta.webp", alt: "Información nutricional e ingredientes de Matcha Pep-T", w: 600, h: 1289, contain: true },
];

export default function ProductGallery() {
  const [i, setI] = useState(0);
  const cur = IMGS[i];
  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-[var(--line)] bg-white">
        <Image
          key={cur.src}
          src={cur.src}
          alt={cur.alt}
          fill
          priority={i === 0}
          sizes="(max-width:1024px) 100vw, 560px"
          className={cur.contain ? "object-contain p-4" : "object-cover"}
          style={{ animation: "wordup .4s ease both" }}
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {IMGS.map((im, k) => (
          <button
            key={im.src}
            onClick={() => setI(k)}
            className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white ${k === i ? "border-fxblue" : "border-transparent"}`}
            aria-label={`Ver imagen ${k + 1}`}
          >
            <Image src={im.src} alt="" fill sizes="120px" className={im.contain ? "object-contain p-1" : "object-cover"} />
          </button>
        ))}
      </div>
    </div>
  );
}
