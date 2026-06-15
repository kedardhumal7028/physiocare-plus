// c:\Users\Admin\kedar\physiocare-plus\src\app\home-visit\page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import WhatsAppCTA from "@/components/layout/whatsapp-cta";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import { MapPin, Calculator, ShieldCheck, Stethoscope, AlertTriangle, CheckCircle, Car } from "lucide-react";

export default function HomeVisitPage() {
  const [distance, setDistance] = useState<number | "">("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{
    eligible: boolean;
    distance: number;
    fee: number;
    travelTime: number;
  } | null>(null);

  const handleCalculateDistance = (e: React.FormEvent) => {
    e.preventDefault();
    if (distance === "" || distance < 0) return;

    setChecking(true);
    setResult(null);

    setTimeout(() => {
      const distNum = Number(distance);
      const isEligible = distNum <= 25;
      
      // Calculations:
      // Base fee = $20.00, rate = $2.00 per km
      const fee = 20.0 + distNum * 2.0;
      // Average travel speed = 30 km/h (2 mins per km)
      const travelTime = Math.round(distNum * 2);

      setResult({
        eligible: isEligible,
        distance: distNum,
        fee: isEligible ? fee : 0,
        travelTime: isEligible ? travelTime : 0
      });
      setChecking(false);
    }, 1000);
  };

  const dispatchProtocols = [
    { title: "Specialist Matching", desc: "Our coordinate desk automatically assigns the closest certified physical therapist qualified for your orthopedic symptoms." },
    { title: "Portable Diagnostic Gear", desc: "Therapists carry portable muscle stimulators, dry needles, alignment belts, and medical exercise weights." },
    { title: "Treatment Summaries", desc: "All exercise metrics and diagnostic body maps are logged into your secure EMR portal timeline immediately." }
  ];

  return (
    <>
      <Header />

      <main className="flex-grow py-12 md:py-20 bg-background text-foreground bg-grid-pattern">
        <Container>
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4 animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">In-Home Clinical Care</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Home Visit <span className="text-gradient">Physiotherapy</span>
            </h1>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
              Skip travel strains. Our specialists bring certified clinical rehabilitation, manual decompression joint adjusters, and needling therapy directly to your living room.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center mb-20">
            
            {/* Left: Info details & protocols (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Mobile Clinical Dispatch</span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground leading-tight">How In-Home Care Works</h2>
              <p className="text-xs text-foreground/75 leading-relaxed">
                We design personalized treatment plans utilizing portable diagnostic tools, helping you recover mobility comfortably from home.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                {dispatchProtocols.map((item, idx) => (
                  <div key={idx} className="glass-card p-4 border border-brand-500/5 bg-white dark:bg-neutral-900 flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/10">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-0.5 text-xs">
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-4xs text-foreground/75 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Geolocation Eligibility Tool (5 cols) */}
            <div className="lg:col-span-5">
              <div className="glass-card p-6 border border-brand-500/15 shadow-xl bg-white dark:bg-neutral-900 flex flex-col gap-5 relative">
                
                {/* Visual badge top corner */}
                <div className="flex items-center justify-between border-b border-brand-500/10 pb-3">
                  <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Calculator className="h-4.5 w-4.5 text-brand-500" />
                    <span>Distance Eligibility Checker</span>
                  </h3>
                  <span className="text-4xs font-bold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded">Clinic: Pune</span>
                </div>

                <p className="text-4xs text-foreground/60 leading-normal font-semibold">
                  Home dispatch is limited to 25km from our central clinic. Enter your estimated distance to calculate transit fees and verify eligibility.
                </p>

                <form onSubmit={handleCalculateDistance} className="flex flex-col gap-4 text-xs text-foreground">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-3xs font-bold text-foreground/80">Estimated Distance from Clinic (in km)</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        required
                        placeholder="e.g. 12.5"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full rounded-xl border border-brand-500/20 bg-background/50 pl-4 pr-12 py-3 text-xs outline-none focus:border-brand-500"
                      />
                      <span className="absolute right-4 top-3.5 text-3xs font-bold text-foreground/50">KM</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={checking}
                    className="w-full rounded-xl bg-brand-500 py-3 text-center font-bold uppercase tracking-wider text-white shadow-md hover:bg-brand-600 transition-all duration-200 cursor-pointer disabled:bg-foreground/10 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 text-xs"
                  >
                    {checking ? "Analyzing Grid..." : "Verify Dispatch Location"}
                  </button>
                </form>

                {/* Eligibility Output block */}
                {result && (
                  <div className="mt-2 animate-fade-in">
                    {result.eligible ? (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                          <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                          <span>Dispatch Location Eligible!</span>
                        </div>
                        <hr className="border-emerald-500/15" />
                        <ul className="flex flex-col gap-2 text-xs font-semibold text-foreground/80">
                          <li className="flex justify-between">
                            <span>Travel Distance:</span>
                            <span className="font-extrabold text-foreground">{result.distance} km</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Est. Travel Time:</span>
                            <span className="font-extrabold text-foreground">{result.travelTime} minutes</span>
                          </li>
                          <li className="flex justify-between border-t border-emerald-500/15 pt-2">
                            <span>Transit Travel Cost:</span>
                            <span className="font-extrabold text-brand-500">${result.fee.toFixed(2)}</span>
                          </li>
                        </ul>
                        <Link href={`/portal/book?service=home-visit-physio`} className="w-full">
                          <button className="w-full py-2.5 rounded-lg bg-emerald-500 text-white font-bold text-3xs uppercase tracking-wider hover:bg-emerald-600 active:scale-95 shadow transition-all cursor-pointer">
                            Request Home Consultation
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                          <AlertTriangle className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                          <span>Location Exceeds Dispatch Range</span>
                        </div>
                        <p className="text-4xs text-foreground/70 leading-relaxed font-semibold">
                          Your coordinates exceed our 25km threshold (Input: {result.distance}km). Please request tele-rehab or schedule an in-clinic slot instead.
                        </p>
                        <Link href="/portal/book" className="w-full">
                          <button className="w-full py-2.5 rounded-lg bg-brand-500 text-white font-bold text-3xs uppercase tracking-wider hover:bg-brand-600 active:scale-95 shadow transition-all cursor-pointer">
                            Book In-Clinic Appointment
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>

        </Container>
      </main>

      <Footer />
      <WhatsAppCTA />
    </>
  );
}
