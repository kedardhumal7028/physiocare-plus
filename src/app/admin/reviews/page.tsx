// c:\Users\Admin\kedar\physiocare-plus\src\app\admin\reviews\page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredReviews, saveReview, ReviewItem, REVIEWS_STORAGE_KEY } from "@/app/testimonials/page";
import { Check, X, Star, Calendar, MessageSquare, ShieldAlert, CheckCircle, Trash2 } from "lucide-react";

export default function AdminReviewsModeration() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    setReviews(getStoredReviews());
  }, []);

  const handleApprove = (id: string) => {
    const list = getStoredReviews();
    const updated = list.map((r) => r.id === id ? { ...r, is_approved: true } : r);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    setReviews(updated);
  };

  const handleReject = (id: string) => {
    const list = getStoredReviews();
    const updated = list.map((r) => r.id === id ? { ...r, is_approved: false } : r);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    setReviews(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this review permanently?")) {
      const list = getStoredReviews();
      const updated = list.filter((r) => r.id !== id);
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
      setReviews(updated);
    }
  };

  const pendingReviews = reviews.filter((r) => !r.is_approved);
  const approvedReviews = reviews.filter((r) => r.is_approved);

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-foreground">
      
      {/* Header */}
      <div className="border-b border-brand-500/5 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Reviews Moderation</h1>
        <p className="text-xs text-foreground/50">Audit patient testimonies, approve stories for public view, or remove inappropriate records.</p>
      </div>

      {/* Grid splits */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        
        {/* Left main: Pending Queue (7 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="glass-card p-5 border border-brand-500/10 shadow bg-white dark:bg-neutral-900">
            <h3 className="text-sm font-extrabold text-foreground mb-4 uppercase tracking-wider pb-2 border-b border-brand-500/10 flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-amber-500" />
              <span>Pending Moderation Queue ({pendingReviews.length})</span>
            </h3>

            {pendingReviews.length === 0 ? (
              <div className="py-12 border border-dashed border-brand-500/10 rounded-2xl bg-brand-50/5 text-center flex flex-col items-center gap-3">
                <CheckCircle className="h-9 w-9 text-emerald-500" />
                <div className="flex flex-col text-xs font-semibold text-foreground/70">
                  <span>Reviews queue is empty</span>
                  <span className="text-4xs text-foreground/50 mt-0.5">All patient recovery stories are approved.</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {pendingReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-brand-500/5 bg-brand-50/5 dark:bg-neutral-950/25 flex flex-col gap-3.5 animate-fade-in hover:border-brand-500/15"
                  >
                    <div className="flex justify-between items-start text-xs font-semibold">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-foreground">{rev.author}</span>
                        <span className="text-4xs text-foreground/50 font-bold uppercase tracking-wider leading-none mt-1">
                          {rev.role} • {rev.treatment} ({rev.modality === 'home' ? 'Home' : 'Clinic'})
                        </span>
                      </div>
                      <div className="flex gap-0.5 text-amber-500 shrink-0">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="h-3.5 w-3.5 fill-amber-500 stroke-amber-500" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-foreground/85 italic leading-relaxed bg-white dark:bg-neutral-900 p-3 rounded-lg border border-brand-500/5 font-medium">
                      "{rev.comment}"
                    </p>

                    <div className="flex justify-end gap-2 text-3xs font-extrabold uppercase">
                      <button
                        onClick={() => handleReject(rev.id)}
                        className="px-3 py-1.5 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-500 hover:bg-rose-500/10 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Reject</span>
                      </button>
                      
                      <button
                        onClick={() => handleApprove(rev.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1 shadow"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Approve Testimonial</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side: Approved reviews list (5 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-card p-5 border border-brand-500/10 shadow bg-white dark:bg-neutral-900 flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider pb-2 border-b border-brand-500/10 flex items-center gap-2">
              <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
              <span>Public Testimonies ({approvedReviews.length})</span>
            </h3>

            <div className="flex flex-col gap-3.5 max-h-[500px] overflow-y-auto pr-1">
              {approvedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 rounded-xl border border-brand-500/5 bg-slate-50/20 dark:bg-neutral-950/20 flex flex-col gap-2.5 text-xs animate-fade-in group hover:border-brand-500/15 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{rev.author}</span>
                      <span className="text-4xs text-foreground/45 leading-none mt-0.5">{rev.treatment}</span>
                    </div>
                    
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => handleDelete(rev.id)}
                        className="text-foreground/30 hover:text-rose-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete testimony"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleReject(rev.id)}
                        className="text-4xs text-rose-500 font-bold hover:underline cursor-pointer"
                        title="Unapprove review"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-4xs text-foreground/75 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
