// src/components/layout/whatsapp-cta.tsx
"use client";

import React, { useState } from "react";
import { X, Send } from "lucide-react";

// Official WhatsApp brand SVG icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim()
      ? message
      : "Hello PhysioCare Plus, I would like to inquire about scheduling a physiotherapy session!";
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* Expanded Bubble Chat Card */}
      {isOpen && (
        <div className="glass-card mb-4 w-76 rounded-2xl p-4 shadow-2xl animate-fade-in border border-[#25D366]/20">

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-brand-500/10">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366]">
                <WhatsAppIcon className="h-4.5 w-4.5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground leading-none">PhysioCare Plus</span>
                <span className="flex items-center gap-1 text-3xs text-emerald-500 font-semibold mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online — typically replies instantly
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-foreground/40 hover:text-foreground active:scale-90 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Message bubble */}
          <div className="py-4">
            <p className="text-xs text-foreground/75 leading-relaxed bg-brand-50/30 dark:bg-neutral-900/40 p-3 rounded-xl border border-brand-500/5">
              👋 Hi there! How can we help you today? Type a message below to start a WhatsApp conversation with our care team.
            </p>
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-xl border border-brand-500/10 bg-background/60 px-3 py-2 text-xs outline-none focus:border-[#25D366]/50 focus:ring-2 focus:ring-[#25D366]/10 transition-all duration-200"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md shadow-emerald-500/25 hover:bg-[#1ebe5d] transition-all duration-200 active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Trigger Button with official WhatsApp icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5d] active:scale-95 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        {/* Ping ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        <WhatsAppIcon className="h-7 w-7 relative z-10" />
      </button>

    </div>
  );
}
