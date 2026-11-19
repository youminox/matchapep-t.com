import fs from "node:fs";
import path from "node:path";
import product from "@/data/product.json";
import categories from "@/data/categories.json";
import keywordMap from "@/data/keyword_map.json";

export const SITE_URL = "https://matchapep-t.com";
export const SITE_NAME = "Matcha Pep-T Perú";
export const SHOP_URL = product.shopUrl;
export const LEGAL_OWNER = "CARLOS EDEN LINGAN BORJA";
export const LEGAL_LOCATION = "Lima, Perú";
export const PUBLISHED = "2026-11-19";
export const CHAT_ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/matchapep-chat";

export { product };

export type Block =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "callout"; variant: "etiqueta" | "fabricante" | "aviso" | "tip"; title?: string; text: string }
  | { type: "steps"; items: { name: string; text: string }[] }
  | { type: "cta"; text: string };

export type Article = {
  slug: string;
  pillar: string;
  path: string;
  isPillar: boolean;
  primaryKeyword: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  quickAnswer: string;
  readingMinutes: number;
  image: { prompt: string; alt: string };
  blocks: Block[];
  faqs: { q: string; a: string }[];
  sources?: { label: string; url: string }[];
  related: string[];
  datePublished: string;
  dateModified: string;
  imageUrl: string | null;
};

export type Category = (typeof categories)[number];

const DIR = path.join(process.cwd(), "src/content/articles");
let cache: Article[] | null = null;

export function getAllContent(): Article[] {
  if (cache) return cache;
  const order = keywordMap.map((k) => k.path);
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")) : [];
  const list: Article[] = [];
  for (const f of files) {
    try {
      const a = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      if (!a.path || !order.includes(a.path)) continue;
      const img = path.join(process.cwd(), "public/img/articulos", `${a.slug}.webp`);
      list.push({
        ...a,
        datePublished: a.datePublished || PUBLISHED,
        dateModified: a.dateModified || PUBLISHED,
        imageUrl: fs.existsSync(img) ? `/img/articulos/${a.slug}.webp` : null,
      });
    } catch {
      // archivo inválido: se ignora en build
    }
  }
  list.sort((x, y) => order.indexOf(x.path) - order.indexOf(y.path));
  cache = list;
  return list;
}

export const getCategories = (): Category[] => categories;
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getPillar = (slug: string) => getAllContent().find((a) => a.isPillar && a.pillar === slug);
export const getArticle = (pillar: string, slug: string) =>
  getAllContent().find((a) => !a.isPillar && a.pillar === pillar && a.slug === slug);
export const getArticlesIn = (pillar: string) => getAllContent().filter((a) => !a.isPillar && a.pillar === pillar);
export const getByPath = (p: string) => getAllContent().find((a) => a.path === p);

export function absolute(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function trimTitle(t: string) {
  return t.replace(/\s*\|\s*Matcha Pep-T( Perú)?\s*$/i, "");
}

export const organizationLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.svg`,
  founder: { "@id": `${SITE_URL}/#carlos` },
  areaServed: "PE",
};

export const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#carlos`,
  name: "Carlos Eden Lingan Borja",
  jobTitle: "Distribuidor autorizado independiente FuXion",
  address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
  url: `${SITE_URL}/sobre-el-distribuidor/`,
};

export function productLd() {
  return {
    "@type": "Product",
    "@id": `${SITE_URL}/comprar-matcha-pep-t/#product`,
    name: "Matcha Pep-T FuXion – Doypack 14 sobres x 15 g",
    sku: product.sku,
    brand: { "@type": "Brand", name: "FuXion" },
    image: [absolute(product.officialImage), absolute("/img/ambiente/home-hero-ambiente.webp")],
    description:
      "Mezcla en polvo para preparar bebida instantánea de té matcha con colágeno hidrolizado (péptidos Nextida® GC), crema de coco, fibra, chía y cromo. Sabor natural a matcha latte. 14 sobres de 15 g (210 g).",
    category: "Bebida funcional en polvo",
    weight: { "@type": "QuantitativeValue", value: 210, unitCode: "GRM" },
    nutrition: undefined,
    offers: {
      "@type": "Offer",
      url: SHOP_URL,
      price: product.price.toFixed(2),
      priceCurrency: "PEN",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2027-06-30",
      seller: { "@type": "Organization", name: "FuXion – Tienda oficial de Carlos Lingan" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "PE" },
      },
    },
  };
}
