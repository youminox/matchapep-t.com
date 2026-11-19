"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BuyLink from "./BuyLink";

const NAV = [
  { href: "/que-es-matcha-pep-t/", label: "Qué es" },
  { href: "/ingredientes-matcha-pep-t/", label: "Ingredientes" },
  { href: "/como-preparar-matcha-pep-t/", label: "Preparación" },
  { href: "/precio-matcha-pep-t-peru/", label: "Precio" },
  { href: "/ciencia-matcha-pep-t/", label: "Ciencia" },
  { href: "/opiniones-matcha-pep-t/", label: "Opiniones" },
];

export default function Header({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const dark = variant === "dark" && !scrolled && !open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        dark ? "bg-transparent text-white" : "bg-white/85 text-fxink shadow-[0_8px_30px_-20px_rgba(0,60,100,0.4)] backdrop-blur-xl"
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight" aria-label="Matcha Pep-T Perú – inicio">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fxlime to-fxblue text-white shadow-lg">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M5 21c8 0 14-6 14-14V3h-4C7 3 3 9 3 15v6h2Z" />
              <path d="M3 21 13 11" />
            </svg>
          </span>
          <span>
            Matcha <span className={dark ? "text-fxlime" : "text-fxblue"}>Pep-T</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-3.5 py-2 text-[0.92rem] font-semibold transition ${dark ? "hover:bg-white/10" : "hover:bg-fxsky hover:text-fxblue"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <BuyLink source="header" className="btn btn-buy shine !px-5 !py-2.5 text-sm">
            Comprar
          </BuyLink>
          <button
            className="grid h-10 w-10 place-items-center rounded-full lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="wrap grid gap-1 pb-5 lg:hidden" aria-label="Móvil">
          {[{ href: "/comprar-matcha-pep-t/", label: "Comprar Matcha Pep-T" }, ...NAV].map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold hover:bg-fxsky">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
