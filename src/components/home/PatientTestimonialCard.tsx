"use client";

import React from "react";
import { Quote, Star } from "lucide-react";

export interface PatientTestimonial {
  /** The review text (without surrounding quotes) */
  quote: string;
  /** Patient's full name */
  name: string;
  /** e.g. "Back Pain Therapy · Pune" */
  meta: string;
  /** Avatar image URL */
  avatarSrc: string;
  /** Alt text for avatar (defaults to name) */
  avatarAlt?: string;
  /** Star rating out of 5 (defaults to 5) */
  rating?: number;
}

interface PatientTestimonialCardProps {
  testimonial: PatientTestimonial;
  className?: string;
}

export default function PatientTestimonialCard({
  testimonial,
  className = "",
}: PatientTestimonialCardProps) {
  const { quote, name, meta, avatarSrc, avatarAlt, rating = 5 } = testimonial;

  return (
    <div
      className={`glass-card p-7 md:p-9 border border-slate-200 dark:border-neutral-800 shadow-lg flex flex-col justify-between gap-6 ${className}`}
    >
      {/* Top: label + blockquote */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">
            What Patients Say
          </span>
          <Quote className="h-7 w-7 text-brand-500/15" />
        </div>

        <blockquote className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800">
          <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
            &quot;{quote}&quot;
          </p>
        </blockquote>
      </div>

      {/* Bottom: avatar + star rating */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-neutral-800 pt-4">
        <div className="flex items-center gap-3">
          <img
            src={avatarSrc}
            alt={avatarAlt ?? name}
            className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-neutral-800 shadow"
          />
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{name}</p>
            <p className="text-[10px] text-slate-400 font-medium">{meta}</p>
          </div>
        </div>

        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-slate-200 text-slate-200 dark:fill-neutral-700 dark:text-neutral-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
