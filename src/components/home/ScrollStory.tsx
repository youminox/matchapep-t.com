"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  { n: "01", t: "180 ml de agua", d: "Fría con hielo o caliente sin hervir. Es la medida exacta que indica la etiqueta: una taza." },
  { n: "02", t: "1 sobre de 15 g", d: "Vierte el polvo verde jade. Ahí están el matcha, la chía, la crema de coco y los péptidos Nextida® GC." },
  { n: "03", t: "Mezcla y disfruta", d: "Agita en shaker o bate con cuchara. Si quieres más cremosidad, un chorrito de bebida vegetal." },
];

/** Escena fijada con GSAP ScrollTrigger: el vaso se llena mientras avanzas. */
export default function ScrollStory() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".liquid"), { attr: { y: 70, height: 250 } });
          gsap.set(q(".milk"), { opacity: 1 });
          gsap.set(q(".step"), { opacity: 1, y: 0 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "+=1800", scrub: 0.8, pin: q(".pin")[0], anticipatePin: 1 },
        });
        tl.to(q(".water"), { attr: { y: 120, height: 200 }, duration: 1 }, 0)
          .to(q(".step-0"), { opacity: 1, y: 0, duration: 0.3 }, 0)
          .to(q(".step-0"), { opacity: 0.25, duration: 0.3 }, 1)
          .to(q(".powder"), { y: 210, opacity: 1, stagger: 0.02, duration: 0.6 }, 1)
          .to(q(".step-1"), { opacity: 1, y: 0, duration: 0.3 }, 1)
          .to(q(".liquid"), { attr: { y: 70, height: 250 }, duration: 0.8 }, 1.4)
          .to(q(".powder"), { opacity: 0, duration: 0.2 }, 1.8)
          .to(q(".step-1"), { opacity: 0.25, duration: 0.3 }, 2)
          .to(q(".swirl"), { rotate: 720, transformOrigin: "50% 50%", duration: 1 }, 2)
          .to(q(".milk"), { opacity: 1, duration: 0.6 }, 2.2)
          .to(q(".ice"), { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }, 2.2)
          .to(q(".step-2"), { opacity: 1, y: 0, duration: 0.3 }, 2)
          .to(q(".glow-done"), { opacity: 1, scale: 1, duration: 0.5 }, 2.6)
          .to(q(".bar"), { scaleX: 1, duration: 3 }, 0);
      }, el);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section id="del-sobre-a-la-taza" ref={root} className="relative bg-gradient-to-b from-white via-fxsky to-white">
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-16">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Del sobre a la taza</span>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Tres pasos. <span className="text-fxblue">Treinta segundos.</span>
            </h2>
            <div className="mt-3 h-1 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxlime to-fxblue" />
            </div>
            <ol className="mt-8 space-y-5">
              {STEPS.map((s, i) => (
                <li key={s.n} className={`step step-${i} flex translate-y-6 gap-4 opacity-25`}>
                  <span className="font-display text-3xl font-extrabold text-fxlime">{s.n}</span>
                  <div>
                    <p className="font-display text-xl font-bold">{s.t}</p>
                    <p className="text-[var(--muted)]">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative mx-auto w-full max-w-[380px]">
            <div className="glow-done absolute inset-0 scale-75 rounded-full bg-fxlime/30 opacity-0 blur-3xl" />
            <svg viewBox="0 0 300 380" className="relative w-full" role="img" aria-label="Animación de un vaso llenándose de matcha latte">
              <defs>
                <clipPath id="glass">
                  <path d="M60 40 L240 40 L222 340 Q220 360 200 360 L100 360 Q80 360 78 340 Z" />
                </clipPath>
                <linearGradient id="mt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#9fd35b" />
                  <stop offset="1" stopColor="#4f8f22" />
                </linearGradient>
                <linearGradient id="milk" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {Array.from({ length: 14 }).map((_, i) => (
                <circle key={i} className="powder" cx={110 + ((i * 37) % 80)} cy={-20 - (i % 5) * 18} r={3 + (i % 3)} fill="#7cbc3a" opacity="0" />
              ))}
              <g clipPath="url(#glass)">
                <rect className="water" x="40" y="360" width="220" height="0" fill="#cfeefc" opacity="0.8" />
                <rect className="liquid" x="40" y="360" width="220" height="0" fill="url(#mt)" />
                <g className="swirl">
                  <path className="milk" d="M90 120 C140 160 170 90 220 140 C190 200 120 170 100 230 C150 250 180 210 210 260" stroke="url(#milk)" strokeWidth="14" fill="none" opacity="0" strokeLinecap="round" />
                </g>
                {[0, 1, 2].map((i) => (
                  <rect key={i} className="ice" x={95 + i * 45} y={90 + (i % 2) * 22} width="34" height="34" rx="7" fill="#ffffff" opacity="0" transform="translate(0,-30)" style={{ opacity: 0 }} />
                ))}
              </g>
              <path d="M60 40 L240 40 L222 340 Q220 360 200 360 L100 360 Q80 360 78 340 Z" fill="none" stroke="#9cc7de" strokeWidth="4" />
              <path d="M78 60 L90 330" stroke="#ffffff" strokeWidth="6" opacity="0.6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
