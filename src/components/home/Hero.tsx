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
      className="relative flex items-center overflow-hidden h-[calc(100vh-72px)] bg-background transition-colors duration-300"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "65% 25%" }}
        />

        {/* Gradient overlay adapting to theme: Light vs Dark */}
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: "linear-gradient(to right, var(--background) 0%, var(--background) 30%, color-mix(in srgb, var(--background) 50%, transparent) 45%, transparent 65%)",
          }}
        />

        {/* Fallback solid overlay on mobile for legibility */}
        <div className="absolute inset-0 bg-background/80 md:bg-transparent transition-colors duration-300" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full">
        <Container>
          {/* Tighter gaps: gap-4 instead of gap-8 */}
          <div className="max-w-[540px] flex flex-col gap-4">

            {/* Live badge */}
            <div className="flex w-fit items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/40 px-3 py-1.5 text-[10px] font-bold text-brand-500 uppercase tracking-wider shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
              Pune&apos;s #1 Physiotherapy Clinic · Now Accepting Patients
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-3">
              <h1 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] font-extrabold tracking-tight text-foreground leading-[1.05]">
                <span className="whitespace-nowrap">
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
                <br />
                Care in Pune
              </h1>

              <p className="text-sm sm:text-[15px] text-foreground/70 leading-relaxed max-w-[460px] font-medium">
                Personalized treatment plans, advanced techniques, and expert one-on-one care — helping you recover faster and live pain-free.
              </p>
            </div>

            {/* Trust chips - compact */}
            <div className="flex flex-wrap gap-1.5 mt-1">
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
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=60",
                  "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?auto=format&fit=crop&q=80&w=60",
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=60",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Happy patient"
                    className="h-7 w-7 rounded-full border-2 border-background object-cover shadow"
                  />
                ))}
              </div>
              <p className="text-xs text-foreground/70 font-medium">
                <span className="font-extrabold text-foreground">1,200+</span> happy patients
              </p>
            </div>

            {/* CTA row - tighter sizing */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Link
                href="/portal/book"
                className="group inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-5 py-3 text-[13px] font-bold text-white
                  shadow-lg shadow-brand-500/25
                  hover:bg-brand-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/35
                  active:scale-[0.98] transition-all duration-200"
              >
                <Calendar className="h-3.5 w-3.5" />
                Book Appointment
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <a
                href="https://wa.me/919876543210?text=Hello%20PhysioCare%20Plus%2C%20I%20would%20like%20to%20inquire%20about%20a%20physiotherapy%20session!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 text-[13px] font-bold text-foreground/80
                  hover:border-[#25D366]/70 hover:bg-[#25D366]/20 hover:-translate-y-0.5
                  active:scale-[0.98] transition-all duration-200"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp Chat
              </a>

              <a
                href="tel:+911234567890"
                className="inline-flex items-center gap-1.5 rounded-xl border border-card-border bg-card/80 backdrop-blur-sm px-4 py-3 text-[13px] font-bold text-foreground/80
                  hover:border-brand-500/40 hover:text-brand-500 hover:-translate-y-0.5
                  active:scale-[0.98] transition-all duration-200"
              >
                <PhoneCall className="h-3.5 w-3.5 text-brand-500" />
                Call Us
              </a>
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
}
