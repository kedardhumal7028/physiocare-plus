// d:\Physo\physiocare-plus\src\app\services\page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import WhatsAppCTA from "@/components/layout/whatsapp-cta";
import { MOCK_SERVICES } from "@/features/appointments/booking-store";
import { Activity, Clock, DollarSign, MapPin, CheckCircle, Shield } from "lucide-react";

export default function ServicesPage() {
  const [filter, setFilter] = useState<'all' | 'clinic' | 'home'>('all');

  const filteredServices = MOCK_SERVICES.filter(service => {
    if (filter === 'all') return true;
    if (filter === 'clinic') return !service.is_home_service || service.id !== 'serv-6'; // serv-6 is exclusive home visit
    if (filter === 'home') return service.is_home_service;
    return true;
  });

  return (
    <>
      <Header />

      <main className="flex-grow py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Description */}
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col gap-4 animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Therapeutic Modalites</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Our Medical <span className="text-gradient">Treatments</span>
            </h1>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
              We deliver state-of-the-art physical alignment, deep muscular trigger-point needling, and surgical recovery regimens. Select a modality to read details and lock in your session slot.
            </p>
          </div>

          {/* Dynamic Filter Navigation Bar */}
          <div className="flex justify-center mb-10 animate-fade-in">
            <div className="glass-card flex p-1.5 rounded-xl border border-brand-500/10">
              <button
                onClick={() => setFilter('all')}
                className={`text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  filter === 'all' 
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/10" 
                    : "text-foreground/70 hover:text-foreground hover:bg-brand-500/5"
                }`}
              >
                All Modalities
              </button>
              <button
                onClick={() => setFilter('clinic')}
                className={`text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  filter === 'clinic' 
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/10" 
                    : "text-foreground/70 hover:text-foreground hover:bg-brand-500/5"
                }`}
              >
                In-Clinic Treatments
              </button>
              <button
                onClick={() => setFilter('home')}
                className={`text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  filter === 'home' 
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/10" 
                    : "text-foreground/70 hover:text-foreground hover:bg-brand-500/5"
                }`}
              >
                Home Visit Eligible
              </button>
            </div>
          </div>

          {/* Services Dynamic Directory Cards Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="glass-card flex flex-col justify-between rounded-2xl p-6 border border-brand-500/10 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col gap-4">
                  {/* Icon Block */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white">
                    <Activity className="h-6 w-6" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-brand-500 transition-colors">
                      {service.name}
                    </h3>
                    
                    {/* Eligibility Badge tags */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {service.is_home_service ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-3xs font-semibold text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-500/10">
                          <MapPin className="h-2.5 w-2.5" />
                          <span>Home Eligible</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-brand-500/10 px-2 py-0.5 text-3xs font-semibold text-brand-600 dark:bg-brand-950/20 dark:text-brand-400 border border-brand-500/10">
                          <CheckCircle className="h-2.5 w-2.5" />
                          <span>Clinic Exclusive</span>
                        </span>
                      )}
                      
                      <span className="inline-flex items-center gap-1 rounded-md bg-accent-500/10 px-2 py-0.5 text-3xs font-semibold text-accent-600 dark:bg-accent-950/20 dark:text-accent-400 border border-accent-500/10">
                        <Clock className="h-2.5 w-2.5" />
                        <span>{service.duration_minutes} min session</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/80 leading-relaxed mt-1">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 border-t border-brand-500/10 mt-6 pt-4">
                  
                  {/* Price Tag Row */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/60 font-semibold">Diagnostic Consultation</span>
                    <span className="font-extrabold text-foreground text-base">
                      ${service.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Actions Link */}
                  <Link
                    href={`/portal/book?service=${service.slug}`}
                    className="w-full rounded-xl bg-brand-500 py-3 text-center text-xs font-semibold text-white shadow-md shadow-brand-500/20 transition-all duration-300 hover:bg-brand-600 hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    Select & Book Appointment
                  </Link>

                </div>
              </div>
            ))}
          </div>

          {/* Lower trust indicator banner */}
          <div className="glass-card mt-16 rounded-2xl p-6 border border-brand-500/10 flex flex-col items-center justify-between gap-6 md:flex-row shadow-lg animate-fade-in bg-brand-50/10">
            <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Clinical Diagnostic Safety Guarantee</h4>
                <p className="text-xs text-foreground/70">All therapy treatments are fully monitored, insured, and documented for dynamic EMR processing.</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="rounded-xl border border-brand-500/20 bg-background/50 px-5 py-2.5 text-xs font-semibold text-foreground/85 transition-all duration-200 hover:bg-brand-500/5 active:scale-95 shrink-0"
            >
              Inquire Treatment Specifics
            </Link>
          </div>

        </div>
      </main>

      <Footer />
      <WhatsAppCTA />
    </>
  );
}
