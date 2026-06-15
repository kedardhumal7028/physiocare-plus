// c:\Users\Admin\kedar\physiocare-plus\src\app\testimonials\page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import WhatsAppCTA from "@/components/layout/whatsapp-cta";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import { Star, MessageSquare, Plus, CheckCircle, Filter, Sparkles } from "lucide-react";

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  comment: string;
  rating: number;
  is_approved: boolean;
  modality: 'clinic' | 'home' | 'all';
  treatment: string;
  created_at: string;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Sarah Jenkins",
    role: "Athlete",
    comment: "After suffering a severe hamstring tear during football, the sports injury rehabilitation program got me back on the field two weeks ahead of schedule. Truly elite care!",
    rating: 5,
    is_approved: true,
    modality: "clinic",
    treatment: "Sports Injury Rehab",
    created_at: "2026-05-20T10:00:00Z"
  },
  {
    id: "rev-2",
    author: "David Grey",
    role: "Patient's Son",
    comment: "The home visit physiotherapy care is spectacular. When my father was recovering from surgery, the therapist came straight to our house with portable analysis gear. Highly professional.",
    rating: 5,
    is_approved: true,
    modality: "home",
    treatment: "Home Visit Physiotherapy",
    created_at: "2026-05-18T14:30:00Z"
  },
  {
    id: "rev-3",
    author: "Jessica M.",
    role: "Software Architect",
    comment: "Persistent neck stiffness from office desktop work was completely cured in just 3 sessions of manual alignment. Outstanding range of motion recovery!",
    rating: 5,
    is_approved: true,
    modality: "clinic",
    treatment: "Neck Pain Treatment",
    created_at: "2026-05-15T09:15:00Z"
  },
  {
    id: "rev-4",
    author: "Ramesh Patil",
    role: "Retired Executive",
    comment: "Excellent treatment and highly personalized care. The manual joint alignments completely resolved my severe lumbar back stiffness. I highly recommend this platform!",
    rating: 5,
    is_approved: true,
    modality: "clinic",
    treatment: "Back Pain Treatment",
    created_at: "2026-05-12T11:00:00Z"
  },
  {
    id: "rev-5",
    author: "Sneha Kulkarni",
    role: "Yoga Instructor",
    comment: "Professional dry needling released immediate trigger-point knots in my shoulder blades. Very clean clinic and knowledgeable staff.",
    rating: 4,
    is_approved: true,
    modality: "clinic",
    treatment: "Dry Needling Therapy",
    created_at: "2026-05-10T16:00:00Z"
  },
  {
    id: "rev-6",
    author: "Ajay Singh",
    role: "Marathon Runner",
    comment: "Excellent post-op recovery tracking. They designed a dynamic stretching regimen that rebuilt my patellar tendon strength and flexion ranges.",
    rating: 5,
    is_approved: true,
    modality: "home",
    treatment: "Post-Operative Recovery Plan",
    created_at: "2026-05-08T13:45:00Z"
  }
];

export const REVIEWS_STORAGE_KEY = "physiocare_reviews";

export function getStoredReviews(): ReviewItem[] {
  if (typeof window === "undefined") return DEFAULT_REVIEWS;
  const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(DEFAULT_REVIEWS));
    return DEFAULT_REVIEWS;
  }
  return JSON.parse(stored);
}

export function saveReview(review: Omit<ReviewItem, 'id' | 'created_at'>): ReviewItem {
  const list = getStoredReviews();
  const newReview: ReviewItem = {
    ...review,
    id: `rev-${Date.now()}`,
    created_at: new Date().toISOString()
  };
  list.push(newReview);
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(list));
  return newReview;
}

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'clinic' | 'home'>('all');

  // Form states
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [treatment, setTreatment] = useState("Back Pain Treatment");
  const [modality, setModality] = useState<'clinic' | 'home'>('clinic');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setReviews(getStoredReviews());
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveReview({
        author,
        role,
        comment,
        rating,
        is_approved: false, // requires admin moderation approval
        modality,
        treatment
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setAuthor("");
      setRole("");
      setComment("");
      setRating(5);
      
      // Update reviews list to display changes locally
      setReviews(getStoredReviews());

      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 1200);
  };

  const filteredReviews = reviews.filter((rev) => {
    if (!rev.is_approved) return false;
    if (filter === 'all') return true;
    return rev.modality === filter;
  });

  // Score stats calculations
  const approvedReviews = reviews.filter(r => r.is_approved);
  const totalCount = approvedReviews.length;
  const avgRating = totalCount > 0 
    ? (approvedReviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1) 
    : "5.0";

  return (
    <>
      <Header />

      <main className="flex-grow py-12 md:py-20 bg-background text-foreground bg-grid-pattern">
        <Container>
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4 animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Patient Testimonies</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Verified Client <span className="text-gradient">Recoveries</span>
            </h1>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
              Read true healing summaries of patients who regained core stability, joint decompressions, and returned safely to active sports.
            </p>
          </div>

          {/* Stars Scorecard Metrics Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-16 items-center">
            
            <div className="glass-card p-6 border border-brand-500/10 shadow-lg text-center flex flex-col items-center gap-1.5 bg-white dark:bg-neutral-900">
              <span className="text-3xl font-extrabold text-foreground">{avgRating}</span>
              <div className="flex gap-0.5 text-amber-500 justify-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4.5 w-4.5 fill-amber-500 stroke-amber-500" />
                ))}
              </div>
              <span className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider">Overall Client Rating</span>
            </div>

            <div className="glass-card p-6 border border-brand-500/10 shadow-lg text-center flex flex-col items-center gap-1.5 bg-white dark:bg-neutral-900">
              <span className="text-3xl font-extrabold text-brand-500">{totalCount}</span>
              <span className="text-3xs font-bold text-foreground/75 leading-none">Verified Diagnostic Logs</span>
              <span className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider mt-1">100% HIPAA Authenticated</span>
            </div>

            <div className="glass-card p-6 border border-brand-500/10 shadow-lg text-center flex flex-col items-center gap-1.5 bg-white dark:bg-neutral-900">
              <span className="text-3xl font-extrabold text-emerald-500">98%</span>
              <span className="text-3xs font-bold text-foreground/75 leading-none">Faster Recovery Acceleration</span>
              <span className="text-[10px] text-foreground/50 font-bold uppercase tracking-wider mt-1">Faster restoration rates</span>
            </div>

          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Masonry list of Reviews (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Category Filters */}
              <div className="flex items-center justify-between border-b border-brand-500/10 pb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground/70">
                  <Filter className="h-4 w-4 text-brand-500" />
                  <span>Filter Stories:</span>
                </div>

                <div className="flex gap-2">
                  {[
                    { id: "all", name: "All Stories" },
                    { id: "clinic", name: "In-Clinic" },
                    { id: "home", name: "Home Visits" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setFilter(tab.id as any)}
                      className={`px-3 py-1.5 rounded-full text-4xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        filter === tab.id
                          ? "bg-brand-500 text-white shadow-sm"
                          : "border border-brand-500/10 text-foreground/70 hover:bg-brand-500/5"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reviews grid (Masonry simulation) */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {filteredReviews.length === 0 ? (
                  <div className="col-span-2 text-xs text-foreground/45 text-center py-16">
                    No approved testimonies found for this category.
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="glass-card p-5 border border-brand-500/10 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-4 bg-white dark:bg-neutral-900 group"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-0.5 text-amber-500">
                            {Array.from({ length: rev.rating }).map((_, idx) => (
                              <Star key={idx} className="h-3.5 w-3.5 fill-amber-500 stroke-amber-500" />
                            ))}
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${
                            rev.modality === 'home' 
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                              : 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                          }`}>
                            {rev.modality === 'home' ? 'Home Visit' : 'Clinic'}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/80 leading-relaxed italic">
                          "{rev.comment}"
                        </p>
                      </div>

                      <div className="pt-3 border-t border-brand-500/5 flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-foreground">{rev.author}</span>
                        <span className="text-[10px] text-foreground/50 font-semibold leading-tight">
                          {rev.role} • <span className="text-brand-500 font-bold">{rev.treatment}</span>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Right Column: Share Your Story Form (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="glass-card p-6 border border-brand-500/15 shadow-xl bg-white dark:bg-neutral-900 relative overflow-hidden">
                
                {/* Visual badge top corner */}
                <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-brand-500/5 flex items-end justify-start p-4">
                  <Sparkles className="h-5 w-5 text-brand-500/30" />
                </div>

                <h3 className="text-xs font-extrabold text-foreground mb-4 uppercase tracking-wider pb-2 border-b border-brand-500/10">
                  Share Your Story
                </h3>

                {submitSuccess ? (
                  <div className="p-5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-center flex flex-col items-center gap-3 animate-fade-in">
                    <CheckCircle className="h-10 w-10 text-emerald-500" />
                    <span className="text-xs font-bold">Review Submitted!</span>
                    <span className="text-[10px] text-foreground/60 leading-relaxed font-semibold">
                      Your recovery story is sent to the review panel moderation queue. It will load publicly once approved by Dr. Stone.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 text-xs text-foreground">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah J."
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full rounded-lg border border-brand-500/20 bg-background/50 px-3 py-2 text-xs outline-none focus:border-brand-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Occupation / Role</label>
                      <input
                        type="text"
                        placeholder="e.g. Marathon Runner"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full rounded-lg border border-brand-500/20 bg-background/50 px-3 py-2 text-xs outline-none focus:border-brand-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-3xs font-bold text-foreground/80">Treatment Category</label>
                        <select
                          value={treatment}
                          onChange={(e) => setTreatment(e.target.value)}
                          className="rounded-lg border border-brand-500/20 bg-background p-2 text-xs outline-none focus:border-brand-500"
                        >
                          <option>Back Pain Treatment</option>
                          <option>Neck Pain Treatment</option>
                          <option>Sports Injury Rehab</option>
                          <option>Knee Pain Treatment</option>
                          <option>Dry Needling Therapy</option>
                          <option>Post-Operative Recovery Plan</option>
                        </select>
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-3xs font-bold text-foreground/80">Modality context</label>
                        <select
                          value={modality}
                          onChange={(e) => setModality(e.target.value as any)}
                          className="rounded-lg border border-brand-500/20 bg-background p-2 text-xs outline-none focus:border-brand-500"
                        >
                          <option value="clinic">In-Clinic Session</option>
                          <option value="home">Home Dispatch</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Star Rating ({rating} Stars)</label>
                      <div className="flex gap-2.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star className={`h-6.5 w-6.5 ${rating >= star ? 'fill-amber-500' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Recovery Story *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Write details of how we helped you restore motion and return to active wellness..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full rounded-lg border border-brand-500/20 bg-background/50 px-3 py-2 text-xs outline-none focus:border-brand-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-brand-500 py-2.5 text-center font-bold uppercase tracking-wider text-white shadow-md hover:bg-brand-600 transition-all duration-200 cursor-pointer disabled:bg-foreground/10 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? "Uploading Story..." : "Submit Review"}
                    </button>
                  </form>
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
