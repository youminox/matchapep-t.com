"use client";

import { useEffect, useState } from "react";
import BuyLink from "./BuyLink";
import { PRICE } from "@/lib/client-constants";

/** Activa animaciones [data-reveal], spotlight de tarjetas y barra de compra fija en móvil. */
export default function ClientEffects({ stickyBar = true }: { stickyBar?: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -10% 0px" }
    );
    const scan = () => document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    const onMove = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(".spot") as HTMLElement | null;
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  if (!stickyBar) return null;
  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-500 md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-[#0b1820]/90 p-2.5 pl-4 text-white shadow-2xl backdrop-blur-xl">
        <div className="leading-tight">
          <p className="text-[0.7rem] uppercase tracking-wider text-white/60">Matcha Pep-T · 14 sobres</p>
          <p className="font-display text-lg font-extrabold">{PRICE}</p>
        </div>
        <BuyLink source="sticky-mobile" className="btn btn-lime shine !px-5 !py-3 text-sm">
          Comprar
        </BuyLink>
      </div>
    </div>
  );
}
