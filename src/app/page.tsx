"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import WhatsAppCTA from "@/components/layout/whatsapp-cta";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Inquiry from "@/components/home/Inquiry";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import {
  Check, Quote, Star, ArrowRight,
  ShieldCheck, Mail, MessageSquare, Monitor, LayoutGrid, Award
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────── */

const PLATFORM_FEATURES = [
  { title: "Multi-Clinic Ready",     desc: "Manage multiple clinics and therapists seamlessly from one centralized platform.", icon: LayoutGrid },
  { title: "Custom Branding",        desc: "Each clinic location retains its own visual identity, custom styling, and domains.", icon: Award },
  { title: "SEO Optimized",          desc: "Built with bleeding-edge indexing frameworks and dynamic metadata capabilities.", icon: Monitor },
  { title: "WhatsApp Integration",   desc: "One-click secure chat routing to patients and immediate dispatch coordinators.", icon: MessageSquare },
  { title: "Email Notifications",    desc: "Automated, transactional email summaries for clinic bookings, EMR updates, and invoices.", icon: Mail },
  { title: "Secure & Fast",          desc: "HIPAA-compliant data encryptions, secure sessions, and blazing-fast edge loads.", icon: ShieldCheck },
];

/* ─────────────────────────────────────────────────────────────────── */

export default function Home() {

  // Scroll to hash on first load (e.g. arriving from another page via /#contact)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/*
        ══════════════════════════════════════════════════════
          NAVBAR  (sticky, scroll-to-section)
        ══════════════════════════════════════════════════════
      */}
      <Header />

      <main>

        {/*
          ══════════════════════════════════════════════
          1. HERO  ← id="hero"  (defined inside Hero.tsx)
          ══════════════════════════════════════════════
        */}
        <Hero />

        {/*
          ══════════════════════════════════════════════
          2. STATS STRIP
          ══════════════════════════════════════════════
        */}
        <Stats />

        {/*
          ══════════════════════════════════════════════
          3. ABOUT  ← id="about"
          ══════════════════════════════════════════════
        */}
        <section
          id="about"
          className="py-4 md:py-6 bg-white dark:bg-neutral-950 border-t border-slate-100 dark:border-neutral-800/50"
        >
          <Container>

            {/* Section label */}
            <div className="mb-6 flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">
                Our Expert
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Meet Our Lead Specialist
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

              {/* Left: Doctor card */}
              <div className="glass-card p-7 md:p-9 border border-slate-200 dark:border-neutral-800 shadow-lg flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">Lead Specialist</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dr. Emma Stone</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">MPT (Orthopaedics) · 10+ Years Clinical Experience</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-start">
                  <div className="sm:col-span-2 relative h-56 rounded-2xl overflow-hidden shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
                      alt="Dr. Emma Stone"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="sm:col-span-3 flex flex-col gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Dr. Emma Stone is a highly experienced orthopedic specialist who has successfully led teams in sports injury restorations and manual joint decompression methods.
                    </p>
                    <ul className="flex flex-col gap-2">
                      {["Advanced Manual Therapy", "Sports Injury Specialist", "Post-Surgical Rehabilitation", "Pain Management Expert"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <Check className="h-4 w-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/portal/book" className="mt-1">
                      <Button variant="primary" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
                        Book with Dr. Stone
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: Patient testimonial */}
              <div className="glass-card p-7 md:p-9 border border-slate-200 dark:border-neutral-800 shadow-lg flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">What Patients Say</span>
                    <Quote className="h-7 w-7 text-brand-500/15" />
                  </div>
                  <blockquote className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800">
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                      "Excellent treatment and highly personalized care. The manual joint alignments completely resolved my severe lumbar back stiffness in just 3 sessions. I highly recommend this clinic!"
                    </p>
                  </blockquote>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-neutral-800 pt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                      alt="Ramesh Patil"
                      className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-neutral-800 shadow"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Ramesh Patil</p>
                      <p className="text-[10px] text-slate-400 font-medium">Back Pain Therapy · Pune</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/*
          ══════════════════════════════════════════════
          4. SERVICES  ← id="services"  (set in Services.tsx)
          ══════════════════════════════════════════════
        */}
        <Services />

        {/*
          ══════════════════════════════════════════════
          5. TESTIMONIALS  ← id="testimonials"  (set in Testimonials.tsx)
          ══════════════════════════════════════════════
        */}
        <Testimonials />

        {/*
          ══════════════════════════════════════════════
          6. CTA BANNER
          ══════════════════════════════════════════════
        */}
        <CTA />

        {/*
          ══════════════════════════════════════════════
          7. PLATFORM FEATURES GRID
          ══════════════════════════════════════════════
        */}
        <section className="py-4 md:py-6 bg-slate-50 dark:bg-neutral-950/50 border-t border-slate-100 dark:border-neutral-800/50">
          <Container>
            <SectionTitle
              badge="Clinic Core Tech"
              title="Built for Premium Healthcare Operations"
              description="A centralized medical suite designed to elevate therapist workflows and patient healing paths."
              className="mb-6"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PLATFORM_FEATURES.map(({ title, desc, icon: Icon }) => (
                <div
                  key={title}
                  className="glass-card p-5 border border-slate-200 dark:border-neutral-800 hover:border-brand-500/40 hover:shadow-lg transition-all duration-300 flex gap-4 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/*
          ══════════════════════════════════════════════
          8. INQUIRY / CONTACT  ← id="contact"  (set in Inquiry.tsx)
             ★ LAST section before footer ★
          ══════════════════════════════════════════════
        */}
        <Inquiry />

      </main>

      <Footer />
      <WhatsAppCTA />
    </>
  );
}