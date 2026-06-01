// d:\Physo\physiocare-plus\src\components\home\Hero.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, ShieldCheck, UserCheck, Stethoscope, HeartPulse } from "lucide-react";
import Button from "../common/Button";
import Container from "../layout/Container";

export default function Hero() {

  const highlights = [
    { title: "Expert Therapists", desc: "Experienced & Certified", icon: UserCheck },
    { title: "Personalized Care", desc: "Tailored Treatment Plans", icon: HeartPulse },
    { title: "Advanced Techniques", desc: "Modern Equipment", icon: Stethoscope },
    { title: "Proven Results", desc: "Faster Recovery", icon: ShieldCheck },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 bg-white dark:bg-neutral-950">

      {/* Visual backdrop gradients */}
      <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-brand-500/5 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 -z-10 h-96 w-96 rounded-full bg-accent-500/5 blur-3xl"></div>

      <Container>

        {/* Main Hero Split */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 mb-16">

          {/* Left Text Column (7 cols) */}
          <div className="flex flex-col gap-6 text-center lg:text-left lg:col-span-7">

            {/* Soft text badge from reference */}
            <div className="mx-auto flex w-fit items-center gap-2 rounded-lg bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-500 dark:bg-brand-900/10 lg:mx-0 animate-fade-in border border-brand-500/10">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
              <span>Expert Care. Faster Recovery.</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground leading-[1.1]">
              Recover Faster. <br />
              <span className="text-gradient">Live Better.</span>
            </h1>

            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Advanced physiotherapy care for a pain-free life. Personalized treatment plans, advanced techniques and one-on-one care to help you recover, restore and improve your quality of life.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start mt-4">
              <Link href="/portal/book">
                <Button variant="primary" size="lg" icon={<ArrowRight className="h-4.5 w-4.5" />}>
                  Book Appointment
                </Button>
              </Link>

              <a
                href="https://wa.me/18005550199?text=Hello%20PhysioCare%20Plus%2C%20I%20would%20like%20to%20inquire%20about%20scheduling%20a%20physiotherapy%20session!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="border-emerald-500/25 hover:bg-emerald-500/5 text-foreground/80" icon={<MessageSquare className="h-4.5 w-4.5 text-emerald-500 fill-emerald-500" />}>
                  Chat on WhatsApp
                </Button>
              </a>
            </div>

          </div>

          {/* Right Action Image Column (5 cols) */}
          <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <div className="glass-card overflow-hidden rounded-3xl p-2 shadow-2xl border border-brand-500/10">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                alt="Physiotherapy alignment treatment session"
                className="w-full h-80 sm:h-96 rounded-2xl object-cover"
              />
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Value Highlights (Reference Layout) */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 pt-4 border-t border-brand-500/5">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="glass-card p-4 flex items-center gap-3 border border-brand-500/5 hover:border-brand-500/20 hover:shadow-lg transition-all duration-300 bg-brand-50/10"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-2xs font-extrabold text-foreground truncate leading-none">{h.title}</span>
                  <span className="text-4xs text-foreground/60 font-semibold truncate leading-none mt-0.5">{h.desc}</span>
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
