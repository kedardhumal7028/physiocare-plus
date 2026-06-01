// d:\Physo\physiocare-plus\src\components\layout\Footer.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import { Activity, Phone, Mail, MapPin, Send, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="mt-20 border-t border-brand-500/10 bg-slate-50/50 py-16 dark:bg-neutral-950/20">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Logo & Contact details */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                PhysioCare<span className="text-brand-500">Plus</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/75">
              Empowering patient lives through dynamic physical alignments, clinical rehabilitation, and premium home-visitation care.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <a href="tel:+18005550199" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-brand-500">
                <Phone className="h-4 w-4 text-brand-500" />
                <span>+1 (800) 555-0199</span>
              </a>
              <a href="mailto:care@physiocareplus.com" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-brand-500">
                <Mail className="h-4 w-4 text-brand-500" />
                <span>care@physiocareplus.com</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <MapPin className="h-4 w-4 text-brand-500 shrink-0" />
                <span>123 Therapy Lane, Wellness Block, Metro City</span>
              </div>
            </div>
          </div>

          {/* Quick Links Directory */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-foreground">Specialties</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-foreground/85">
              <li><Link href="/services" className="hover:text-brand-500">Sports Physical Therapy</Link></li>
              <li><Link href="/services" className="hover:text-brand-500">Joint Mobilization</Link></li>
              <li><Link href="/services" className="hover:text-brand-500">Trigger Point Dry Needling</Link></li>
              <li><Link href="/services" className="hover:text-brand-500">Geriatric Safety Rehab</Link></li>
              <li><Link href="/services" className="hover:text-brand-500">Post-Op Muscle Recovery</Link></li>
            </ul>
          </div>

          {/* Operation Schedule */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-foreground">Clinic Schedule</h3>
            <ul className="flex flex-col gap-2 text-sm text-foreground/85">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-semibold text-brand-500">08:00 AM - 08:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="font-semibold text-brand-500">09:00 AM - 04:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-foreground/50">Emergency Calls Only</span>
              </li>
              <hr className="border-brand-500/10 my-1" />
              <li className="text-xs text-foreground/60 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active 24/7 Home Dispatch Service</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Lead Sign-Up */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-foreground">Wellness Newsletters</h3>
            <p className="text-sm text-foreground/75">
              Subscribe to receive therapeutic exercise plans, stretches, and clinic updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-xl border border-brand-500/20 bg-background/50 px-3.5 py-2 text-sm outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/20 hover:bg-brand-600 transition-all duration-200 cursor-pointer"
              >
                {subscribed ? <Check className="h-4.5 w-4.5" /> : <Send className="h-4.5 w-4.5" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-500 font-semibold animate-fade-in">
                ✓ Check your inbox for our wellness starter pack!
              </p>
            )}
          </div>

        </div>

        <hr className="border-brand-500/10 my-12" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-foreground/60">
          <p>© {new Date().getFullYear()} PhysioCare Plus. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-brand-500">Privacy Policy</Link>
            <Link href="/" className="hover:text-brand-500">Terms of Use</Link>
            <Link href="/" className="hover:text-brand-500">HIPAA Compliance Disclaimer</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
