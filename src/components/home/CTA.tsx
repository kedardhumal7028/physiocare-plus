// d:\Physo\physiocare-plus\src\components\home\CTA.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Shield } from "lucide-react";
import Button from "../common/Button";
import Container from "../layout/Container";

export default function CTA() {
  return (
    <section className="py-4 md:py-6 relative overflow-hidden">
      
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl"></div>

      <Container>
        <div className="glass-card rounded-3xl p-6 md:p-10 border border-brand-500/15 shadow-2xl relative overflow-hidden bg-brand-900/5 dark:bg-neutral-950/20">
          
          <div className="max-w-2xl flex flex-col gap-6 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500 flex items-center gap-1.5">
              <Shield className="h-4.5 w-4.5 animate-pulse" />
              <span>Full Clinical HIPAA Security Standards Enabled</span>
            </span>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Ready to Live <span className="text-gradient">Pain-Free?</span>
            </h2>

            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed max-w-xl">
              Lock in your personalized physical evaluation, joint manipulation treatments, or request dynamic home visitation therapy today to begin your recovery pathway.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/portal/book">
                <Button variant="primary" size="lg" icon={<ArrowRight className="h-4.5 w-4.5" />}>
                  Book Consultation Slot
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" icon={<MapPin className="h-4.5 w-4.5 text-brand-500" />}>
                  Inquire Home Dispatch
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
