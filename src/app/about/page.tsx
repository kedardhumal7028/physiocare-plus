// c:\Users\Admin\kedar\physiocare-plus\src\app\about\page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import WhatsAppCTA from "@/components/layout/whatsapp-cta";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import { MOCK_CLINICIANS } from "@/features/appointments/booking-store";
import { Check, Star, Users, Shield, Award, Stethoscope, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const [activeBio, setActiveBio] = useState<string | null>(null);

  const certifications = [
    { title: "HIPAA Compliant Operations", body: "Patient records, clinical timelines, and SOAP intake sessions are encrypted under state-of-the-art secure layers.", icon: Shield },
    { title: "Board-Certified Specialists", body: "Every physiotherapist is board-certified with active license qualifications verified and recorded.", icon: Stethoscope },
    { title: "Award Winning Rehabilitation", body: "Recognized as a leading clinic in orthopedic and athletic joint alignments and sports injury recovery.", icon: Award },
  ];

  const clinicalGear = [
    { name: "Dynamic EMG Scanning", desc: "Real-time diagnostic mapping of electrical signals in muscle tissue during movement." },
    { name: "Myofascial Dry Needling Pins", desc: "Ultra-fine medical grade filaments to target trigger points and release deep muscle locks." },
    { name: "Cervical Decompression Board", desc: "Precision spinal traction alignment rigs for back stiffness and sciatica relief." },
    { name: "Therapeutic Ultrasound Devices", desc: "Deep tissue heating mechanics to speed up cell repair and blood circulation." }
  ];

  return (
    <>
      <Header />

      <main className="flex-grow py-12 md:py-20 bg-background text-foreground">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden mb-16 md:mb-24">
          <Container className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col gap-4 animate-fade-in">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500">About Our Practice</span>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Restoring Motion & <br />
                <span className="text-gradient">Empowering Lives</span>
              </h1>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                Since inception, PhysioCare Plus has been dedicated to providing advanced orthopedic alignments, sports injury recovery, and specialized in-home care dispatches.
              </p>
            </div>

            <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-xl border border-brand-500/10 relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
                alt="Modern clinical workspace environment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-xs font-bold">
                State-of-the-Art Rehabilitation Center
              </div>
            </div>
          </Container>
        </section>

        {/* Dynamic Therapist Roster */}
        <section className="py-12 bg-slate-50/50 dark:bg-neutral-950/20 border-y border-brand-500/5 mb-16 md:mb-24">
          <Container>
            <SectionTitle
              badge="Our Specialists"
              title="Meet Our Board-Certified Physiotherapists"
              description="Learn about the medical backgrounds, credentials, and specialties of our leading rehabilitation experts."
              className="mb-16 text-center"
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {MOCK_CLINICIANS.map((c) => {
                const isExpanded = activeBio === c.id;
                return (
                  <div
                    key={c.id}
                    className="glass-card flex flex-col justify-between rounded-2xl border border-brand-500/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-neutral-900 group"
                  >
                    <div className="p-6 flex flex-col gap-4">
                      {/* Avatar & Title */}
                      <div className="flex gap-4 items-center">
                        <img
                          src={c.avatar_url}
                          alt={`${c.first_name} ${c.last_name}`}
                          className="h-16 w-16 rounded-xl object-cover border border-brand-500/10 shadow-sm"
                        />
                        <div className="flex flex-col">
                          <h3 className="text-sm font-bold text-foreground group-hover:text-brand-500 transition-colors">
                            Dr. {c.first_name} {c.last_name}
                          </h3>
                          <span className="text-[10px] font-extrabold text-brand-500 uppercase tracking-wide">
                            PT, DPT • {c.reviews_count} Reviews
                          </span>
                          <div className="flex gap-0.5 text-amber-500 mt-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star key={idx} className={`h-3 w-3 ${idx < Math.floor(c.rating) ? 'fill-amber-500' : 'text-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Specialties list */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {c.specialties.map((s, idx) => (
                          <span
                            key={idx}
                            className="bg-brand-500/5 text-brand-600 dark:text-brand-400 border border-brand-500/10 text-[9px] font-bold px-2 py-0.5 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-foreground/75 leading-relaxed mt-2">
                        {c.bio}
                      </p>

                      {/* Expanded bio container */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-brand-500/10 flex flex-col gap-3 text-xs text-foreground/80 animate-fade-in font-medium">
                          <p>
                            Dr. {c.last_name} leads specialized recovery tracks using advanced motor assessment and evidence-based clinical protocols.
                          </p>
                          <ul className="flex flex-col gap-1.5">
                            <li className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3]" />
                              <span>Custom rehabilitation tracking</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3]" />
                              <span>Clinical diagnostic evaluation</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3]" />
                              <span>Manual adjustment techniques</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Expand Details Trigger */}
                    <div className="px-6 pb-5 pt-3 border-t border-brand-500/5 bg-brand-50/5 flex justify-between items-center rounded-b-2xl">
                      <button
                        onClick={() => setActiveBio(isExpanded ? null : c.id)}
                        className="text-3xs font-extrabold uppercase tracking-wider text-brand-500 hover:text-brand-600 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Background" : "Learn Credentials"}</span>
                        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>
                      <Link href={`/portal/book?service=${c.specialties[0].toLowerCase().replace(/\s+/g, "-")}`}>
                        <Button variant="secondary" size="sm">Book Dr. {c.first_name}</Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Clinical Integrity and Certifications */}
        <section className="mb-16 md:mb-24">
          <Container>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {certifications.map((cert, idx) => {
                const Icon = cert.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card p-5 border border-brand-500/10 shadow flex gap-4 bg-white dark:bg-neutral-900"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-xs font-bold text-foreground">{cert.title}</h4>
                      <p className="text-4xs text-foreground/75 leading-relaxed">{cert.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Advanced Clinical Gear */}
        <section className="py-12 bg-slate-50/50 dark:bg-neutral-950/20 border-t border-brand-500/5">
          <Container>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
              <div className="flex flex-col gap-5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Medical Technology</span>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Our Advanced Clinical Equipment</h2>
                <p className="text-xs text-foreground/75 leading-relaxed">
                  We match our therapist qualifications with clinical equipment, ensuring diagnostic evaluation accuracy and muscle rehabilitation results.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
                  {clinicalGear.map((gear, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-brand-500/5 bg-white dark:bg-neutral-900 flex flex-col gap-1 shadow-sm">
                      <span className="text-[11px] font-bold text-foreground">{gear.name}</span>
                      <span className="text-4xs text-foreground/60 leading-normal">{gear.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg border border-brand-500/10 flex items-center justify-center bg-slate-100 dark:bg-neutral-900/50">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
                  alt="Specialist adjusting clinical needling alignment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

      </main>

      <Footer />
      <WhatsAppCTA />
    </>
  );
}
