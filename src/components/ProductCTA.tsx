import Image from "next/image";
import Link from "next/link";
import BuyLink from "./BuyLink";
import { product } from "@/lib/content";

export default function ProductCTA({ text, source, compact = false }: { text?: string; source: string; compact?: boolean }) {
  return (
    <div className="not-prose relative my-9 overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0a2a3f] via-[#0b1f2b] to-[#12331c] p-6 text-white sm:p-7">
      <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-fxlime/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-fxblue/40 blur-3xl" />
      <div className={`relative grid items-center gap-5 ${compact ? "sm:grid-cols-[120px_1fr]" : "sm:grid-cols-[170px_1fr]"}`}>
        <Image
          src="/img/producto/matcha-pep-t-composicion-transparente.webp"
          alt="Doypack y sobre de Matcha Pep-T de FuXion con una taza de matcha latte"
          width={compact ? 120 : 170}
          height={compact ? 99 : 140}
          className="mx-auto h-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-fxlime">Tienda oficial FuXion · Envío a todo el Perú</p>
          <p className="mt-1 font-display text-xl font-extrabold leading-tight sm:text-2xl">
            {text || "Matcha Pep-T original al precio oficial"}
          </p>
          <p className="mt-1.5 text-sm text-white/75">
            {product.presentation} · <strong className="text-white">{product.formattedPrice}</strong> ({product.formattedPricePerSachet} por sobre)
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <BuyLink source={source} className="btn btn-lime shine !py-3">
              Comprar ahora →
            </BuyLink>
            {!compact && (
              <Link href="/comprar-matcha-pep-t/" className="btn btn-glass !py-3">
                Ver ficha completa
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
