"use client";

import { useEffect, useState } from "react";
import { CHAT_ENDPOINT_PUBLIC } from "@/lib/client-constants";

type R = { id: string; name: string; city: string | null; rating: number | null; comment: string; verified_purchase: boolean; created_at: string };

/** Opiniones reales aprobadas en el panel. Si no hay, muestra un estado vacío honesto. */
export default function ApprovedReviews() {
  const [list, setList] = useState<R[] | null>(null);
  useEffect(() => {
    fetch(CHAT_ENDPOINT_PUBLIC, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ mode: "reviews" }) })
      .then((r) => r.json())
      .then((d) => setList(d.reviews || []))
      .catch(() => setList([]));
  }, []);
  return (
    <section className="mt-12" aria-labelledby="opiniones-verificadas">
      <h2 id="opiniones-verificadas" className="font-display text-3xl font-extrabold">
        Opiniones de clientes
      </h2>
      {list === null ? (
        <p className="mt-3 text-[var(--muted)]">Cargando opiniones…</p>
      ) : list.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-[var(--line)] p-6 text-[var(--muted)]">
          Todavía no hay opiniones publicadas. Preferimos mostrar cero a mostrar testimonios inventados: las primeras opiniones aparecerán aquí en cuanto
          verifiquemos las compras. <a href="#deja-tu-opinion" className="font-semibold text-fxblue underline">Sé de los primeros en opinar</a>.
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {list.map((r) => (
            <figure key={r.id} className="card p-5">
              {r.rating ? <p className="text-amber-400" aria-label={`${r.rating} de 5`}>{"★".repeat(r.rating)}<span className="text-slate-300">{"★".repeat(5 - r.rating)}</span></p> : null}
              <blockquote className="mt-2 text-[0.98rem] leading-relaxed text-fxink">“{r.comment}”</blockquote>
              <figcaption className="mt-3 text-sm text-[var(--muted)]">
                <strong className="text-fxink">{r.name}</strong>
                {r.city ? ` · ${r.city}` : ""} · {new Date(r.created_at).toLocaleDateString("es-PE", { month: "long", year: "numeric" })}
                {r.verified_purchase && <span className="ml-2 rounded-full bg-fxlime/20 px-2 py-0.5 text-xs font-bold text-[#3b630c]">Compra verificada</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
