"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/** Comparador arrastrable: versión caliente (invierno) vs fría (verano). */
export default function TempSlider() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={box}
      className="compare aspect-[16/10] w-full cursor-ew-resize shadow-2xl sm:aspect-[16/8]"
      onPointerDown={(e) => {
        drag.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => drag.current && move(e.clientX)}
      onPointerUp={() => (drag.current = false)}
    >
      <Image src="/img/ambiente/home-verano.webp" alt="Matcha Pep-T frío con hielo en una terraza de Miraflores en verano" fill sizes="(max-width:1200px) 100vw, 1200px" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src="/img/ambiente/home-invierno.webp" alt="Matcha Pep-T caliente junto a una ventana con garúa en invierno limeño" fill sizes="(max-width:1200px) 100vw, 1200px" className="object-cover" />
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.4)]" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-fxblue shadow-xl">
          ⟷
        </div>
      </div>
      <span className="chip absolute left-4 top-4 !bg-black/40 text-white">☕ Caliente · invierno</span>
      <span className="chip absolute right-4 top-4 !bg-black/40 text-white">🧊 Frío · verano</span>
      <input
        type="range"
        min={4}
        max={96}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 opacity-0"
        aria-label="Comparar versión caliente y fría"
      />
    </div>
  );
}
