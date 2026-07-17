"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { contact } from "@/lib/constants";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-64 rounded-md border border-line bg-paper shadow-xl overflow-hidden">
          <div className="bg-ink text-paper px-4 py-3 text-sm font-semibold">
            Chat with us on WhatsApp
          </div>
          <div className="flex flex-col divide-y divide-line">
            <a
              href={contact.whatsapp.us.link}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 text-sm hover:bg-paper-dim transition-colors"
            >
              <span className="block font-medium text-ink">US Line</span>
              <span className="text-ink/60">{contact.whatsapp.us.number}</span>
            </a>
            <a
              href={contact.whatsapp.ghana.link}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 text-sm hover:bg-paper-dim transition-colors"
            >
              <span className="block font-medium text-ink">Ghana Line</span>
              <span className="text-ink/60">{contact.whatsapp.ghana.number}</span>
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Close WhatsApp options" : "Chat on WhatsApp"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:brightness-95 transition"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}
