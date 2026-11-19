"use client";

export default function OpenChatButton({ label = "Abrir el asesor virtual" }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("mp:open-chat"))} className="btn btn-buy">
      💬 {label}
    </button>
  );
}
