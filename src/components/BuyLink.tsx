"use client";

import { CHAT_ENDPOINT_PUBLIC, SHOP } from "@/lib/client-constants";

type Props = {
  source: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
};

function track(source: string) {
  try {
    const visitor = localStorage.getItem("mp_visitor") || "anon";
    const body = JSON.stringify({
      mode: "track_click",
      source,
      visitor_id: visitor,
      shop_url: SHOP,
      page_url: window.location.href,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(CHAT_ENDPOINT_PUBLIC, new Blob([body], { type: "text/plain" }));
    } else {
      fetch(CHAT_ENDPOINT_PUBLIC, { method: "POST", body, keepalive: true });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag?.("event", "click_tienda", { source });
  } catch {
    /* noop */
  }
}

export default function BuyLink({ source, className = "btn btn-buy shine", children, ariaLabel }: Props) {
  return (
    <a
      href={SHOP}
      target="_blank"
      rel="sponsored noopener"
      className={className}
      aria-label={ariaLabel}
      onClick={() => track(source)}
    >
      {children}
    </a>
  );
}
