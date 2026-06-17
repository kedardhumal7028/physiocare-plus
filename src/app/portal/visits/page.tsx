// c:\Users\Admin\kedar\physiocare-plus\src\app\portal\visits\page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import Container from "@/components/layout/Container";
import Button from "@/components/common/Button";
import { useAuth } from "@/app/context/AuthContext";
import { MapPin, Calendar, Clock, Plus, Compass, CheckCircle, Car, DollarSign } from "lucide-react";

export interface HomeVisitRequest {
  id: string;
  patient_id: string;
  patient_name: string;
  request_date: string;
  time_window: string;
  address: string;
  distance_km: number;
  transit_fee: number;
  symptoms: string;
  status: 'requested' | 'assigned' | 'en_route' | 'completed' | 'cancelled';
  created_at: string;
}

const DEFAULT_VISITS: HomeVisitRequest[] = [
  {
    id: "visit-1",
    patient_id: "pat-2",
    patient_name: "Alice Hill",
    request_date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0], // In 2 days
    time_window: "10:00 AM - 12:00 PM",
    address: "123 Therapy Lane, Metro City",
    distance_km: 12.0,
    transit_fee: 44.0,
    symptoms: "Post knee surgery flexion assistance, require weights and assessment board.",
    status: "requested",
    created_at: new Date().toISOString()
  }
];

export const VISITS_STORAGE_KEY = "physiocare_home_visits";

export function getStoredHomeVisits(): HomeVisitRequest[] {
  if (typeof window === "undefined") return DEFAULT_VISITS;
  const stored = localStorage.getItem(VISITS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(DEFAULT_VISITS));
    return DEFAULT_VISITS;
  }
  return JSON.parse(stored);
}

export function saveHomeVisit(visit: Omit<HomeVisitRequest, 'id' | 'created_at'>): HomeVisitRequest {
  const list = getStoredHomeVisits();
  const newVisit: HomeVisitRequest = {
    ...visit,
    id: `visit-${Date.now()}`,
    created_at: new Date().toISOString()
  };
  list.push(newVisit);
  localStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(list));
  return newVisit;
}

export default function PortalVisitsPage() {
  const { user } = useAuth();
  const [visits, setVisits] = useState<HomeVisitRequest[]>([]);
  
  // Form States
  const [requestDate, setRequestDate] = useState("");
  const [timeWindow, setTimeWindow] = useState("09:00 AM - 11:00 AM");
  const [address, setAddress] = useState("");
  const [distanceKm, setDistanceKm] = useState<number>(5);
  const [symptoms, setSymptoms] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    refreshVisits();
  }, [user]);

  const refreshVisits = () => {
    if (!user) return;
    const allVisits = getStoredHomeVisits();
    const filtered = allVisits.filter(
      (v) => v.patient_id === user.id || v.patient_name.toLowerCase().trim() === user.name.toLowerCase().trim()
    );
    setVisits(filtered);
  };

  const handleRequestVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !requestDate || !address || !symptoms) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Base fee = $20.00, rate = $2.00 per km
      const transitFee = 20.0 + distanceKm * 2.0;

      saveHomeVisit({
        patient_id: user.id || "pat-guest",
        patient_name: user.name,
        request_date: requestDate,
        time_window: timeWindow,
        address,
        distance_km: distanceKm,
        transit_fee: transitFee,
        symptoms,
        status: "requested"
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setRequestDate("");
      setAddress("");
      setDistanceKm(5);
      setSymptoms("");
      
      refreshVisits();
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  const calculatedFee = 20.0 + distanceKm * 2.0;

  return (
    <>
      <Header />

      <main className="flex-grow py-12 md:py-16 bg-slate-50/50 dark:bg-neutral-950/20 text-foreground bg-grid-pattern">
        <Container>
          
          {/* Header */}
          <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
            <h1 className="text-2xl font-extrabold tracking-tight">Home Visit Rehabilitation</h1>
            <div className="flex items-center gap-1.5 text-xs text-foreground/45 justify-center md:justify-start font-bold">
              <Link href="/portal" className="hover:text-brand-500">My Portal</Link>
              <span>&gt;</span>
              <span className="text-brand-500">Home Visits</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Column: Requests Log list (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="glass-card p-6 border border-brand-500/10 shadow bg-white dark:bg-neutral-900">
                <h3 className="text-sm font-extrabold text-foreground mb-4 uppercase tracking-wider pb-2 border-b border-brand-500/10">
                  Home Dispatch Log
                </h3>

                {visits.length === 0 ? (
                  <div className="py-12 border border-dashed border-brand-500/10 rounded-2xl bg-brand-50/5 text-center flex flex-col items-center gap-3">
                    <Car className="h-9 w-9 text-brand-500/30" />
                    <div className="flex flex-col text-xs font-semibold text-foreground/70">
                      <span>No active home visit dispatches</span>
                      <span className="text-4xs text-foreground/50 mt-0.5">Fill out the request form to schedule one.</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {visits.map((vis) => (
                      <div
                        key={vis.id}
                        className="p-4 rounded-xl border border-brand-500/5 bg-brand-50/10 dark:bg-neutral-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in hover:border-brand-500/15"
                      >
                        <div className="flex gap-3 items-start text-xs font-semibold">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 shrink-0 border border-brand-500/10 shadow-sm">
                            <Car className="h-4.5 w-4.5" />
                          </div>
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="font-bold text-foreground">In-Home Clinical Recovery</span>
                            <span className="text-4xs text-foreground/50 font-semibold truncate leading-none">
                              Address: {vis.address}
                            </span>
                            <div className="flex flex-wrap items-center gap-x-3 mt-1 text-4xs font-bold text-foreground/45">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-brand-500" />
                                <span>{vis.request_date}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-brand-500" />
                                <span>{vis.time_window}</span>
                              </span>
                              <span className="flex items-center gap-0.5">
                                <Compass className="h-3 w-3 text-brand-500" />
                                <span>{vis.distance_km} km</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-4xs font-bold uppercase tracking-wider border ${
                            vis.status === 'completed'
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          }`}>
                            {vis.status}
                          </span>
                          <span className="text-4xs font-extrabold text-brand-500">${vis.transit_fee.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Request Form (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="glass-card p-6 border border-brand-500/15 shadow-xl bg-white dark:bg-neutral-900">
                <h3 className="text-sm font-extrabold text-foreground mb-4 uppercase tracking-wider pb-2 border-b border-brand-500/10">
                  Request Home Visit
                </h3>

                {submitSuccess ? (
                  <div className="p-5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 text-center flex flex-col items-center gap-3 animate-fade-in">
                    <CheckCircle className="h-9 w-9 text-emerald-500" />
                    <span className="text-xs font-bold">Request Logged!</span>
                    <span className="text-4xs text-foreground/60 leading-relaxed max-w-xs font-semibold">
                      Your home physical therapy dispatch request has been saved. A desk supervisor will coordinate clinician assignments shortly.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleRequestVisit} className="flex flex-col gap-4 text-xs text-foreground">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Preferred Dispatch Date</label>
                      <input
                        type="date"
                        required
                        min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                        value={requestDate}
                        onChange={(e) => setRequestDate(e.target.value)}
                        className="w-full rounded-xl border border-brand-500/20 bg-background/50 px-3 py-2 text-xs outline-none focus:border-brand-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Time Window Slot</label>
                      <select
                        value={timeWindow}
                        onChange={(e) => setTimeWindow(e.target.value)}
                        className="rounded-xl border border-brand-500/20 bg-background px-3 py-2 text-xs outline-none focus:border-brand-500"
                      >
                        <option>09:00 AM - 11:00 AM</option>
                        <option>11:00 AM - 01:00 PM</option>
                        <option>02:00 PM - 04:00 PM</option>
                        <option>04:00 PM - 06:00 PM</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Estimated Distance from Clinic</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="25"
                          step="1"
                          value={distanceKm}
                          onChange={(e) => setDistanceKm(Number(e.target.value))}
                          className="h-1.5 rounded bg-slate-200 dark:bg-neutral-700 outline-none flex-1"
                        />
                        <span className="text-xs font-extrabold text-brand-500 shrink-0">{distanceKm} KM</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Home Address details</label>
                      <textarea
                        required
                        placeholder="Complete home street address..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={2}
                        className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 text-xs outline-none focus:border-brand-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Symptoms description</label>
                      <textarea
                        required
                        placeholder="Describe your pain / therapy goals..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        rows={2}
                        className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 text-xs outline-none focus:border-brand-500"
                      />
                    </div>

                    {/* Calculated Fee Breakdown */}
                    <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between text-3xs font-extrabold">
                      <span className="text-foreground/70 flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-emerald-500" />Transit Travel Cost:</span>
                      <span className="text-emerald-500 text-xs">${calculatedFee.toFixed(2)}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-brand-500 py-3 text-center font-bold uppercase tracking-wider text-white shadow-md hover:bg-brand-600 transition-all duration-200 cursor-pointer disabled:bg-foreground/10 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Logging Dispatch..." : "Schedule Home Consultation"}
                    </button>
                  </form>
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
