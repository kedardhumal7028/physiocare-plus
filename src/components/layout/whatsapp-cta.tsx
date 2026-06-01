// d:\Physo\physiocare-plus\src\components\layout\whatsapp-cta.tsx
"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export default function WhatsAppCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const encodedText = encodeURIComponent(message);
      window.open(`https://wa.me/18005550199?text=${encodedText}`, "_blank");
      setMessage("");
      setIsOpen(false);
    } else {
      const defaultText = encodeURIComponent("Hello PhysioCare Plus, I would like to inquire about scheduling a physical consultation!");
      window.open(`https://wa.me/18005550199?text=${defaultText}`, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Bubble Chat Card */}
      {isOpen && (
        <div className="glass-card mb-4 w-76 rounded-2xl p-4 shadow-2xl animate-fade-in border border-emerald-500/20">
          
          {/* Greeting Header */}
          <div className="flex items-center justify-between pb-3 border-b border-brand-500/10">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-bold text-foreground">Clinic Support (Online)</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-foreground/50 hover:text-foreground active:scale-90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="py-4">
            <p className="text-xs text-foreground/80 leading-relaxed bg-brand-50/20 dark:bg-neutral-900/30 p-2.5 rounded-xl border border-brand-500/5">
              Hi there! 👋 How can we help you today? Leave us a message to start a WhatsApp chat with our care desk coordinators immediately!
            </p>
          </div>

          {/* Quick Chat Inputs Form */}
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-lg border border-brand-500/10 bg-background/50 px-3 py-1.5 text-xs outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all duration-200 active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Primary Floating Circle Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-emerald-600 cursor-pointer"
        aria-label="Contact on WhatsApp"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

    </div>
  );
}
