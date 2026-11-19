"use client";

import { useState } from "react";
import BuyLink from "../BuyLink";

const PRICE = 158;
const SACHETS = 14;

export default function CostCalculator() {
  const [perWeek, setPerWeek] = useState(5);
  const perMonth = (perWeek * 30) / 7;
  const packs = perMonth / SACHETS;
  const cost = (PRICE / SACHETS) * perMonth;
  return (
    <div className="card p-7 sm:p-9">
      <span className="eyebrow">Calculadora</span>
      <h3 className="mt-2 text-3xl font-extrabold">¿Cuánto te cuesta al mes?</h3>
      <label htmlFor="pw" className="mt-6 block text-sm font-semibold text-[var(--muted)]">
        Tazas por semana: <span className="font-display text-2xl font-extrabold text-fxblue">{perWeek}</span>
      </label>
      <input
        id="pw"
        type="range"
        min={1}
        max={7}
        value={perWeek}
        onChange={(e) => setPerWeek(Number(e.target.value))}
        className="mt-2 w-full accent-[#0093DD]"
      />
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-fxsky p-4">
          <p className="font-display text-2xl font-extrabold">{perMonth.toFixed(0)}</p>
          <p className="text-xs text-[var(--muted)]">sobres al mes</p>
        </div>
        <div className="rounded-2xl bg-fxsky p-4">
          <p className="font-display text-2xl font-extrabold">{packs.toFixed(1)}</p>
          <p className="text-xs text-[var(--muted)]">doypacks</p>
        </div>
        <div className="rounded-2xl bg-fxcream p-4">
          <p className="font-display text-2xl font-extrabold">S/ {cost.toFixed(0)}</p>
          <p className="text-xs text-[var(--muted)]">aprox. al mes</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-[var(--muted)]">Cálculo con el precio oficial de S/ 158.00 por doypack de 14 sobres (S/ 11.29 por sobre). La etiqueta indica 1 sobre por porción.</p>
      <BuyLink source="calculadora" className="btn btn-buy shine mt-6 w-full">
        Comprar Matcha Pep-T · S/ 158.00
      </BuyLink>
    </div>
  );
}
