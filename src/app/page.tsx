// d:\Physo\physiocare-plus\src\app\page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import WhatsAppCTA from "@/components/layout/whatsapp-cta";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import { Check, Quote, Star, CheckCircle, ArrowRight, ShieldCheck, Mail, MessageSquare, Monitor, LayoutGrid, Award } from "lucide-react";

export default function Home() {

  const features = [
    { title: "Multi-Clinic Ready", desc: "Manage multiple clinics and therapists seamlessly from one centralized platform.", icon: LayoutGrid },
    { title: "Custom Branding", desc: "Each clinic location retains its own visual identity, custom styling, and domains.", icon: Award },
    { title: "SEO Optimized", desc: "Built with bleeding-edge indexing frameworks and dynamic metadata capabilities.", icon: Monitor },
    { title: "WhatsApp Integration", desc: "One-click secure chat routing to patients and immediate dispatch coordinators.", icon: MessageSquare },
    { title: "Email Notifications", desc: "Automated, transactional email summaries for clinic bookings, EMR updates, and invoices.", icon: Mail },
    { title: "Secure & Fast", desc: "HIPAA-compliant data encryptions, secure sessions, and blazing-fast edge loads.", icon: ShieldCheck },
  ];

  return (
    <>
      {/* Dynamic Modular Navigation Header */}
      <Header />

      <main className="flex-grow">

        {/* Modular Hero Banner Section (including the 4 Highlights row) */}
        <Hero />

        {/* Modular Metric Indicators Section */}
        <Stats />

        {/* Modular Services Specialty Section */}
        <Services />

        {/* ================= ABOUT DOCTOR & CUSTOM TESTIMONIAL SPLIT SECTION ================= */}
        <section className="py-20 bg-white dark:bg-neutral-950 border-t border-brand-500/5">
          <Container>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

              {/* Left Column: About Dr. Emma Stone */}
              <div className="glass-card p-6 md:p-8 border border-brand-500/10 shadow-lg flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Lead Specialist</span>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">About Dr. Emma Stone</h2>
                  <p className="text-xs text-foreground/50">MPT (Orthopaedics) • 10+ Years of Clinical Experience</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center">
                  {/* Portrait photo */}
                  <div className="sm:col-span-2 relative h-60 rounded-2xl overflow-hidden shadow">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
                      alt="Dr. Emma Stone portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Doctor Bio list */}
                  <div className="sm:col-span-3 flex flex-col gap-4">
                    <p className="text-xs text-foreground/85 leading-relaxed">
                      Dr. Emma Stone is a highly experienced orthopedic specialist. She has successfully led teams in sports injury restorations and manual joint decompression methods.
                    </p>

                    <ul className="flex flex-col gap-2 text-xs">
                      {[
                        "Advanced Manual Therapy",
                        "Sports Injury Specialist",
                        "Post-Surgical Rehabilitation",
                        "Pain Management Expert"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-foreground/80">
                          <Check className="h-4 w-4 text-emerald-500 stroke-[3]" />
                          <span className="font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/portal/book" className="mt-2">
                      <Button variant="primary" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
                        Know More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Patient Testimonial Bubble */}
              <div className="glass-card p-6 md:p-8 border border-brand-500/10 shadow-lg flex flex-col justify-between gap-6 bg-brand-50/5">

                {/* Quotation Header block */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-500">What Our Patients Say</span>
                    <Quote className="h-8 w-8 text-brand-500/20" />
                  </div>

                  {/* Quote content block */}
                  <div className="relative p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-brand-500/5 shadow-sm">
                    <p className="text-sm text-foreground/80 italic leading-relaxed">
                      "Excellent treatment and highly personalized care. The manual joint alignments completely resolved my severe lumbar back stiffness in just 3 sessions. I highly recommend this platform!"
                    </p>
                  </div>
                </div>

                {/* Client Profile row */}
                <div className="flex items-center justify-between border-t border-brand-500/5 pt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                      alt="Ramesh Patil client avatar"
                      className="h-10 w-10 rounded-full object-cover border border-brand-500/20"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground">Ramesh Patil</span>
                      <span className="text-4xs text-foreground/60 font-semibold">Client (Back Pain Therapy) • Pune</span>
                    </div>
                  </div>

                  {/* Pagination Dots indicator */}
                  <div className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/20"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/20"></span>
                  </div>
                </div>

              </div>

            </div>
          </Container>
        </section>

        {/* Modular Patient Testimonials Section (3 dummy reviews Masonry) */}
        <Testimonials />

        {/* Modular Wellness Call-To-Action Banner */}
        <CTA />

        {/* ================= PLATFORM FEATURES GRID (Bottom of Homepage) ================= */}
        <section className="py-20 bg-slate-50/50 dark:bg-neutral-950/20 border-t border-brand-500/5">
          <Container>

            <SectionTitle
              badge="Clinic Core Tech"
              title="Built for Premium Healthcare Operations"
              description="A centralized medical suite designed to elevate therapist workflows and patient healing paths."
              className="mb-16"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="glass-card p-5 border border-brand-500/5 hover:border-brand-500/20 hover:shadow-lg transition-all duration-300 flex gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs font-bold text-foreground">{f.title}</h4>
                      <p className="text-4xs text-foreground/75 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </Container>
        </section>

      </main>

      {/* Dynamic Modular Layout Footer */}
      <Footer />

      {/* Dynamic Floating WhatsApp Overlay */}
      <WhatsAppCTA />
    </>
  );
}