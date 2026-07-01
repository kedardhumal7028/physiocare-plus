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
  ShieldCheck, ClipboardCheck, ClipboardList, Dumbbell, GraduationCap,
  CalendarCheck, Video, Target, Activity
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────── */

const ONLINE_PHYSIO_STEPS = [
  {
    title: "Detailed Assessment & Consultation",
    icon: ClipboardCheck,
    items: [
      "Discussion of symptoms, pain history, and functional limitations",
      "Review of medical history, imaging reports, and previous treatments, if available",
      "Movement and posture assessment through video consultation",
      "Identification of contributing factors and treatment goals",
    ],
  },
  {
    title: "Personalized Treatment Plan",
    icon: ClipboardList,
    items: [
      "Individualized rehabilitation program based on your condition",
      "Evidence-based exercise prescription",
      "Pain management and self-care strategies",
      "Lifestyle and activity modification guidance",
    ],
  },
  {
    title: "Home Exercise Protocol",
    icon: Dumbbell,
    items: [
      "Step-by-step exercise instructions",
      "Exercise progression based on recovery",
      "Mobility, strengthening, balance, and flexibility training as required",
      "Digital exercise sheets or videos for reference",
    ],
  },
  {
    title: "Education & Prevention",
    icon: GraduationCap,
    items: [
      "Understanding the cause of your symptoms",
      "Ergonomic and posture advice",
      "Injury prevention strategies",
      "Long-term self-management guidance",
    ],
  },
  {
    title: "Follow-Up & Progress Monitoring",
    icon: CalendarCheck,
    items: [
      "Regular review of symptoms and functional improvement",
      "Program modifications based on progress",
      "Ongoing support and clarification of exercises",
      "Goal tracking to ensure optimal recovery",
    ],
  },
];

const ONLINE_CONDITIONS = [
  "Neck and back pain",
  "Joint pain including shoulder, knee, hip, and ankle",
  "Sports injuries",
  "Post-operative rehabilitation",
  "Posture-related problems",
  "Arthritis and chronic pain conditions",
  "Work-from-home and ergonomic issues",
];

const ONLINE_BENEFITS = [
  "Consult from the comfort of your home",
  "No travel or waiting time",
  "Convenient scheduling",
  "Personalized one-on-one care",
  "Access to expert guidance regardless of location",
];

/* ─────────────────────────────────────────────────────────────────── */

function OnlinePhysioSection() {
  return (
    <section className="py-8 md:py-10 bg-slate-50 dark:bg-neutral-950/50 border-t border-slate-100 dark:border-neutral-800/50">
      <Container>
        <SectionTitle
          badge="Online Physiotherapy"
          title="Platform Services for Guided Recovery at Home"
          description="Our online physiotherapy sessions combine expert assessment, personalized rehabilitation planning, guided home exercises, education, and ongoing progress monitoring to help you recover safely and effectively from the comfort of your home."
          className="mb-7"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card p-5 border border-slate-200 dark:border-neutral-800 flex min-h-[260px] flex-col justify-between gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">Remote Care Platform</span>
                <h4 className="mt-1 text-base font-bold leading-snug text-slate-900 dark:text-white">
                  Guided recovery from home
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Expert assessment, personalized rehabilitation planning, guided exercises, education, and progress monitoring in one structured online care experience.
              </p>
            </div>
          </div>

          {ONLINE_PHYSIO_STEPS.map(({ title, items, icon: Icon }) => (
            <div
              key={title}
              className="glass-card p-5 border border-slate-200 dark:border-neutral-800 hover:border-brand-500/40 hover:shadow-lg transition-all duration-300 flex min-h-[260px] flex-col gap-4 group"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold leading-snug text-slate-900 dark:text-white">{title}</h4>
              </div>

              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* <div className="glass-card p-5 border border-slate-200 dark:border-neutral-800 flex min-h-[260px] flex-col">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                <Activity className="h-5 w-5" />
              </div> */}
              {/* <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">Conditions Managed Online</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Common concerns we can assess and guide remotely</h4>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ONLINE_CONDITIONS.map((condition) => (
                <div key={condition} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Target className="h-4 w-4 shrink-0 text-brand-500" />
                  <span>{condition}</span>
                </div>
              ))}
            </div> */}
          {/* </div> */}

          {/* <div className="glass-card p-5 border border-slate-200 dark:border-neutral-800 flex min-h-[260px] flex-col">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">Benefits</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Care that fits your schedule</h4>
              </div>
            </div> */}
            {/* <ul className="flex flex-col gap-2">
              {ONLINE_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div> */}

          {/* <div className="glass-card p-5 border border-slate-200 dark:border-neutral-800 flex min-h-[260px] flex-col justify-between gap-5 bg-brand-50/40 dark:bg-brand-900/10">
            <div className="flex flex-col gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
                <ArrowRight className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">Start Online Care</span>
                <h4 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                  Get a recovery plan tailored to your goals
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Book a video consultation so your therapist can assess movement, clarify symptoms, and guide the next step in your home program.
              </p>
            </div>
            <Link
              href="/portal/book"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg active:scale-98"
            >
              <span>Book Online Session</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div> */}
        </div>
      </Container>
    </section>
  );
}

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
                Your Personal Physiotherapist
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

              {/* Left: Doctor card */}
              <div className="glass-card p-7 md:p-9 border border-slate-200 dark:border-neutral-800 shadow-lg flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">Physiotherapy Specialist</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dr. Vishwajeet Jambure</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">MPT (Orthopaedics) · 10+ Years Clinical Experience</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-start">
                  <div className="sm:col-span-2 relative h-56 rounded-2xl overflow-hidden shadow-md bg-slate-100 dark:bg-neutral-800">
                    <img
                      src="/images/dr-jambure.png"
                      alt="Dr. Vishwajeet Jambure"
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>

                  <div className="sm:col-span-3 flex flex-col gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Dr. Vishwajeet Jambure is a highly experienced orthopedic specialist who has successfully led teams in sports injury restorations and manual joint decompression methods.
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
                        Book with Dr. Jambure
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
                      &quot;Excellent treatment and highly personalized care. The manual joint alignments completely resolved my severe lumbar back stiffness in just 3 sessions. I highly recommend this clinic!&quot;
                    </p>
                  </blockquote>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-neutral-800 pt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
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

        <OnlinePhysioSection />

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
