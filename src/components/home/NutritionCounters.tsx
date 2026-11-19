"use client";

import { useEffect, useRef, useState } from "react";

const DATA = [
  { v: 46, dec: 0, u: "kcal", l: "Energía por porción", pct: 2 },
  { v: 4.7, dec: 1, u: "g", l: "Proteína", pct: 9 },
  { v: 4.9, dec: 1, u: "g", l: "Fibra dietaria", pct: 18 },
  { v: 0.9, dec: 1, u: "g", l: "Azúcares añadidos", pct: 2 },
  { v: 28, dec: 0, u: "mg", l: "Sodio", pct: 1 },
  { v: 14.9, dec: 1, u: "µg", l: "Cromo", pct: 45 },
];

export default function NutritionCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / 1600);
        setT(1 - Math.pow(1 - p, 3));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {DATA.map((d) => (
        <div key={d.l} className="glass p-5">
          <p className="font-display text-4xl font-extrabold text-white tabular-nums">
            {(d.v * t).toFixed(d.dec)}
            <span className="ml-1 text-lg text-fxlime">{d.u}</span>
          </p>
          <p className="mt-1 text-sm text-white/70">{d.l}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-fxlime to-fxblue" style={{ width: `${Math.max(3, d.pct) * t}%` }} />
          </div>
          <p className="mt-1 text-[0.7rem] text-white/50">{d.pct}% del valor diario</p>
        </div>
      ))}
    </div>
  );
}
