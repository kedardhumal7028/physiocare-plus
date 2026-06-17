// c:\Users\Admin\kedar\physiocare-plus\src\app\portal\records\page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import Container from "@/components/layout/Container";
import Button from "@/components/common/Button";
import { useAuth } from "@/app/context/AuthContext";
import { FileText, FileDown, CheckSquare, Square, Stethoscope, ChevronRight, Activity, TrendingUp } from "lucide-react";

interface SOAPRecord {
  id: string;
  date: string;
  clinician: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

interface HEPStretch {
  id: string;
  name: string;
  reps: string;
  hold: string;
  completed: boolean;
}

export default function PortalRecordsPage() {
  const { user } = useAuth();

  const [soapRecords, setSoapRecords] = useState<SOAPRecord[]>([
    {
      id: "soap-1",
      date: "May 24, 2026",
      clinician: "Dr. Emma Stone",
      subjective: "Patient reports severe lower back stiffness and mild radiating pain down the right hamstring after golf.",
      objective: "tenderness on L4-L5 lumbar paraspinals. Lumbar extension restricted at 15 degrees. Positive straight leg raise at 70 degrees.",
      assessment: "Acute lumbar facet joint compression with secondary paraspinal muscle spasms.",
      plan: "High-velocity low-amplitude lumbar adjustments. Myofascial release of piriformis. Prescribed home stretching program (Hamstrings, pelvic tilts)."
    },
    {
      id: "soap-2",
      date: "May 12, 2026",
      clinician: "Dr. Marcus Vance",
      subjective: "Patient complains of neck tension, occipital headaches, and restricted cervical rotation during driving checks.",
      objective: "Severe trigger point knots in bilateral upper trapezius and levator scapulae. Cervical rotation restricted to 45 degrees left.",
      assessment: "Cervicogenic tension myofascial trigger points from static office workstation slouching.",
      plan: "Trigger point dry needling (2 pins bilateral traps). Upper back stretching targets and workstation posture retraining guide."
    }
  ]);

  const [hepStretches, setHepStretches] = useState<HEPStretch[]>([
    { id: "hep-1", name: "Supine Hamstring Stretch", reps: "3 reps per side", hold: "30 second hold", completed: false },
    { id: "hep-2", name: "Balasana Child's Pose Spinal Twist", reps: "5 reps", hold: "20 second hold", completed: false },
    { id: "hep-3", name: "Pelvic Tilts Core Activation", reps: "10 reps", hold: "5 second lock", completed: false },
    { id: "hep-4", name: "Levator Scapulae Posture Stretch", reps: "3 reps per side", hold: "15 second hold", completed: false }
  ]);

  const toggleStretchCompleted = (id: string) => {
    setHepStretches(
      hepStretches.map((stretch) =>
        stretch.id === id ? { ...stretch, completed: !stretch.completed } : stretch
      )
    );
  };

  const completedStretchesCount = hepStretches.filter(s => s.completed).length;
  const progressPercent = Math.round((completedStretchesCount / hepStretches.length) * 100);

  return (
    <>
      <Header />

      <main className="flex-grow py-12 md:py-16 bg-slate-50/50 dark:bg-neutral-950/20 text-foreground bg-grid-pattern">
        <Container>
          
          {/* Header */}
          <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
            <h1 className="text-2xl font-extrabold tracking-tight">Clinical EMR & Records</h1>
            <div className="flex items-center gap-1.5 text-xs text-foreground/45 justify-center md:justify-start font-bold">
              <Link href="/portal" className="hover:text-brand-500">My Portal</Link>
              <span>&gt;</span>
              <span className="text-brand-500">EMR & Records</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Column: SOAP Diagnoses & Reports list (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* SOAP Logs */}
              <div className="glass-card p-6 border border-brand-500/10 shadow bg-white dark:bg-neutral-900">
                <h3 className="text-sm font-extrabold text-foreground mb-6 uppercase tracking-wider pb-2 border-b border-brand-500/10 flex items-center gap-2">
                  <Stethoscope className="h-4.5 w-4.5 text-brand-500" />
                  <span>Clinical SOAP Diagnoses</span>
                </h3>

                <div className="flex flex-col gap-6">
                  {soapRecords.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-4 rounded-xl border border-brand-500/5 bg-brand-50/5 dark:bg-neutral-950/25 flex flex-col gap-3 animate-fade-in"
                    >
                      <div className="flex justify-between items-center pb-2 border-b border-brand-500/10 text-xs">
                        <span className="font-bold text-foreground">Visit Diagnostic Summary</span>
                        <span className="font-bold text-brand-500">{rec.date} • {rec.clinician}</span>
                      </div>

                      <div className="grid grid-cols-1 gap-3.5 text-4xs font-semibold">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-foreground/50 uppercase text-[9px] tracking-wide">Subjective (S)</span>
                          <p className="text-xs text-foreground/80 leading-relaxed font-mono">"{rec.subjective}"</p>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-foreground/50 uppercase text-[9px] tracking-wide">Objective (O)</span>
                          <p className="text-xs text-foreground/80 leading-relaxed font-mono">"{rec.objective}"</p>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-foreground/50 uppercase text-[9px] tracking-wide">Assessment (A)</span>
                          <p className="text-xs text-foreground/80 leading-relaxed font-mono">"{rec.assessment}"</p>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-foreground/50 uppercase text-[9px] tracking-wide">Treatment Plan (P)</span>
                          <p className="text-xs text-brand-500 leading-relaxed font-mono">"{rec.plan}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uploaded Documents List */}
              <div className="glass-card p-6 border border-brand-500/10 shadow bg-white dark:bg-neutral-900">
                <h3 className="text-sm font-extrabold text-foreground mb-4 uppercase tracking-wider pb-2 border-b border-brand-500/10 flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-brand-500" />
                  <span>Uploaded Imaging Scans</span>
                </h3>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {[
                    { name: "MRI_Lumbar_Spine.pdf", date: "May 22, 2026", size: "4.2 MB" },
                    { name: "XRay_Cervical_Spine.pdf", date: "May 10, 2026", size: "2.8 MB" }
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-brand-500/5 bg-brand-50/10 dark:bg-neutral-950/20 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-foreground truncate max-w-[160px]">{doc.name}</span>
                        <span className="text-4xs text-foreground/50 leading-normal">{doc.date} • {doc.size}</span>
                      </div>
                      <button
                        onClick={() => alert(`Downloading file: ${doc.name}...`)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-500/10 text-brand-500 bg-background hover:bg-brand-500/5 active:scale-95 transition-all cursor-pointer"
                      >
                        <FileDown className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Home Exercise Program HEP Tracker (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div className="glass-card p-6 border border-brand-500/15 shadow-xl bg-white dark:bg-neutral-900 flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-brand-500/10 pb-3">
                  <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="h-4.5 w-4.5 text-brand-500" />
                    <span>Home Workout (HEP) Targets</span>
                  </h3>
                  <span className="text-4xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Active Today</span>
                </div>

                {/* Progress bar */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-4xs font-extrabold text-foreground/60 uppercase tracking-wider">
                    <span>Stretch Progress</span>
                    <span className="text-brand-500 font-extrabold">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded bg-slate-100 dark:bg-neutral-950 overflow-hidden border border-brand-500/5">
                    <div
                      style={{ width: `${progressPercent}%` }}
                      className="h-full rounded bg-brand-500 transition-all duration-300"
                    ></div>
                  </div>
                  <span className="text-4xs text-foreground/45 leading-none font-semibold">{completedStretchesCount} of {hepStretches.length} exercises logged</span>
                </div>

                <hr className="border-brand-500/5" />

                {/* Exercise Checks checklist */}
                <div className="flex flex-col gap-3">
                  {hepStretches.map((stretch) => (
                    <button
                      key={stretch.id}
                      onClick={() => toggleStretchCompleted(stretch.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        stretch.completed
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : "border-brand-500/10 bg-brand-50/5 hover:border-brand-500/35"
                      }`}
                    >
                      {stretch.completed ? (
                        <CheckSquare className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="h-4.5 w-4.5 text-foreground/35 shrink-0 mt-0.5" />
                      )}
                      
                      <div className="flex-grow flex flex-col">
                        <span className={`text-xs font-bold ${stretch.completed ? 'text-foreground/50 line-through' : 'text-foreground'}`}>
                          {stretch.name}
                        </span>
                        <span className="text-4xs text-foreground/50 leading-normal mt-0.5">
                          {stretch.reps} • {stretch.hold}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {progressPercent === 100 && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-center font-bold text-4xs uppercase tracking-wider animate-fade-in flex items-center justify-center gap-1.5">
                    <TrendingUp className="h-4 w-4" />
                    <span>✓ Daily stretching targets unlocked!</span>
                  </div>
                )}

              </div>

            </div>

          </div>

        </Container>
      </main>

      <Footer />
    </>
  );
}
