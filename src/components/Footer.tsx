import Link from "next/link";
import { getCategories, getArticlesIn, LEGAL_OWNER, LEGAL_LOCATION } from "@/lib/content";
import BuyLink from "./BuyLink";

export default function Footer() {
  const cats = getCategories();
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0b1820] text-white/80">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-fxblue/25 blur-3xl" />
      <div className="wrap relative grid gap-12 py-16 md:grid-cols-[1.3fr_2fr]">
        <div>
          <p className="font-display text-2xl font-extrabold text-white">
            Matcha <span className="text-fxlime">Pep-T</span> Perú
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            Guía independiente y especializada sobre Matcha Pep-T de FuXion: ingredientes, preparación, precio y ciencia, con datos tomados de la etiqueta oficial.
          </p>
          <div className="mt-6">
            <BuyLink source="footer" className="btn btn-lime shine">
              Comprar en la tienda oficial
            </BuyLink>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-white/55">
            Distribuidor autorizado: <strong className="text-white/80">{LEGAL_OWNER}</strong>, domiciliado en {LEGAL_LOCATION}. Este sitio no es la web
            corporativa de FuXion Biotech S.A.C.; las compras se realizan en la tienda oficial FuXion del distribuidor.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {cats.map((c) => (
            <div key={c.slug}>
              <Link href={`/${c.slug}/`} className="font-display font-bold text-white hover:text-fxlime">
                {c.name}
              </Link>
              <ul className="mt-3 space-y-1.5 text-sm">
                {getArticlesIn(c.slug)
                  .slice(0, 4)
                  .map((a) => (
                    <li key={a.path}>
                      <Link href={a.path} className="hover:text-white">
                        {a.title.length > 48 ? a.title.slice(0, 46) + "…" : a.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 matchapep-t.com · Contenido informativo, no reemplaza el consejo médico. Matcha Pep-T no es un medicamento.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            <Link href="/sobre-el-distribuidor/" className="hover:text-white">Sobre el distribuidor</Link>
            <Link href="/contacto/" className="hover:text-white">Contacto</Link>
            <Link href="/aviso-legal/" className="hover:text-white">Aviso legal</Link>
            <Link href="/politica-de-privacidad/" className="hover:text-white">Privacidad</Link>
            <Link href="/politica-de-cookies/" className="hover:text-white">Cookies</Link>
            <Link href="/envios-y-devoluciones/" className="hover:text-white">Envíos y devoluciones</Link>
            <Link href="/politica-editorial/" className="hover:text-white">Política editorial</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
