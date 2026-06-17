"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, PhoneCall, CheckCircle2, Calendar } from "lucide-react";
import Container from "../layout/Container";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const TRUST_CHIPS = [
  "Certified Physiotherapists",
  "Home Visits Available",
  "Advanced Equipment",
  "95% Recovery Rate",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-end md:items-center min-h-[calc(100vh-72px)] overflow-hidden bg-background transition-colors duration-300"
    >
      {/* ── Background Image (Full screen on both desktop and mobile) ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "65% 25%" }}
        />

        {/* Desktop Gradient overlay */}
        <div
          className="hidden md:block absolute inset-0 transition-colors duration-300"
          style={{
            background: "linear-gradient(to right, var(--background) 0%, var(--background) 30%, color-mix(in srgb, var(--background) 50%, transparent) 45%, transparent 65%)",
          }}
        />

        {/* Mobile Gradient overlay (Top fade for header visibility) */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-b from-background/40 to-transparent" />
      </div>

      {/* ── Content Wrapper ── */}
      <div className="relative z-10 w-full mt-auto md:mt-0">
        {/* Mobile Card Wrapper */}
        <div className="w-full bg-background/95 backdrop-blur-2xl md:bg-transparent md:backdrop-blur-none rounded-t-[2.25rem] md:rounded-none pt-8 pb-10 md:py-0 shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.2)] md:shadow-none border-t border-border/50 md:border-none transition-all duration-300">
          <Container>
            <div className="max-w-[540px] flex flex-col gap-5 md:gap-4 mx-auto md:mx-0 text-center md:text-left">

            {/* Live badge */}
            <div className="flex w-fit mx-auto md:mx-0 items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/40 px-3 py-1.5 text-[10.5px] font-bold text-brand-500 uppercase tracking-wider shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
               #1 Physiotherapy Care
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-2.5 md:gap-4 mt-1 md:mt-0">
              <h1 className="text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] font-extrabold tracking-tight text-foreground leading-[1.1] md:leading-[1.05]">
                <span className="sm:whitespace-nowrap">
                  Advanced{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #0b469a 0%, #0284c7 50%, #06b6d4 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Physiotherapy
                  </span>
                </span>
                <br className="hidden md:block" />
                {" "}Care
              </h1>

              <p className="text-[14.5px] sm:text-[15px] text-foreground/70 leading-relaxed max-w-[460px] mx-auto md:mx-0 font-medium">
                Don&apos;t have time to visit a clinic or want to know about your condition before consulting? Just one click—book an appointment and get directly connected to your personal physiotherapist.
              </p>
            </div>

            {/* Trust chips - compact & centered on mobile */}
            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mt-1">
              {TRUST_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="flex items-center gap-1.5 rounded-lg bg-card border border-card-border px-2.5 py-1 text-[10.5px] font-semibold text-foreground/80 shadow-sm"
                >
                  <CheckCircle2 className="h-3 w-3 text-brand-500 shrink-0" />
                  {chip}
                </span>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=60",
                  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=60",
                  "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=60",
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=60",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Happy patient"
                    className="h-7 w-7 md:h-8 md:w-8 rounded-full border-2 border-background object-cover shadow"
                  />
                ))}
              </div>
              <p className="text-xs md:text-sm text-foreground/70 font-medium">
                <span className="font-extrabold text-foreground">1,200+</span> happy patients
              </p>
            </div>

            {/* CTA row - responsive full-width on mobile */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center md:justify-start gap-3 pt-4 md:pt-2 w-full">
              <Link
                href="/portal/book"
                className="group w-full sm:w-auto justify-center inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 md:py-3 text-[14px] md:text-[13px] font-bold text-white
                  shadow-lg shadow-brand-500/25
                  hover:bg-brand-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/35
                  active:scale-[0.98] transition-all duration-200"
              >
                <Calendar className="h-4 w-4 md:h-3.5 md:w-3.5" />
                Book Appointment
                <ArrowRight className="h-4 w-4 md:h-3.5 md:w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <div className="flex w-full sm:w-auto gap-3">
                <a
                  href="https://wa.me/919876543210?text=Hello%20PhysioCare%20Plus%2C%20I%20would%20like%20to%20inquire%20about%20a%20physiotherapy%20session!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3.5 md:py-3 text-[14px] md:text-[13px] font-bold text-foreground/80
                    hover:border-[#25D366]/70 hover:bg-[#25D366]/20 hover:-translate-y-0.5
                    active:scale-[0.98] transition-all duration-200"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  WhatsApp
                </a>

                <a
                  href="tel:+911234567890"
                  className="flex-1 sm:flex-none justify-center inline-flex items-center gap-1.5 rounded-xl border border-card-border bg-card/80 backdrop-blur-sm px-4 py-3.5 md:py-3 text-[14px] md:text-[13px] font-bold text-foreground/80
                    hover:border-brand-500/40 hover:text-brand-500 hover:-translate-y-0.5
                    active:scale-[0.98] transition-all duration-200"
                >
                  <PhoneCall className="h-4 w-4 md:h-3.5 md:w-3.5 text-brand-500" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
    </section>
  );
}
