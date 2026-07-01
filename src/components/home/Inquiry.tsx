// src/components/home/Inquiry.tsx
"use client";

import React, { useState } from "react";
import { Send, User, Mail, Phone, MessageSquare, FileText, CheckCircle, AlertCircle, Zap, Lock, MapPin, Home } from "lucide-react";

import Container from "@/components/layout/Container";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function Inquiry() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.message.trim()) newErrors.message = "Please write your message";
    if (form.phone && !/^[+\d\s\-()]{7,15}$/.test(form.phone))
      newErrors.phone = "Enter a valid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send inquiry");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: keyof FormState) =>
    `w-full rounded-lg border bg-card px-3 py-2 text-xs font-medium text-foreground placeholder:text-foreground/35 outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${
      errors[field]
        ? "border-red-400 focus:ring-red-400/30 focus:border-red-400"
        : "border-brand-500/10 hover:border-brand-500/30"
    }`;

  const subjects = [
    "General Inquiry",
    "Book Appointment",
    "Home Visit Request",
    "Treatment Information",
    "Pricing & Packages",
    "Insurance & Billing",
    "Other",
  ];

  return (
    <section
      id="contact"
      className="relative py-4 md:py-6 bg-background overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent-500/5 blur-3xl" />

      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-center">

          {/* Left: Info Panel */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="w-fit flex items-center gap-2 rounded-lg bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-500 dark:bg-brand-900/10 border border-brand-500/10 animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              <span>Contact Us</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Contact{" "}
                <span className="text-gradient">Our Team</span>
              </h2>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed max-w-md">
                Whether you have questions about treatments, pricing, or simply want to understand how physiotherapy can help you — our team responds within 24 hours.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Zap, title: "Fast Response", desc: "We reply within 24 hours", color: "text-amber-500", bg: "bg-amber-500/10" },
                { icon: Lock, title: "Private & Secure", desc: "Your data stays confidential", color: "text-emerald-600", bg: "bg-emerald-500/10" },
                { icon: MapPin, title: "Clinic Visits", desc: "Walk-ins welcome Mon–Sat", color: "text-brand-500", bg: "bg-brand-500/10" },
                { icon: Home, title: "Home Visits", desc: "Available for eligible patients", color: "text-violet-500", bg: "bg-violet-500/10" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-card flex items-start gap-2 p-3 rounded-xl border border-brand-500/8 hover:border-brand-500/20 transition-all duration-300 hover:shadow-md"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{item.title}</p>
                    <p className="text-4xs text-foreground/55 font-semibold mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info chips */}
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 text-xs font-semibold text-foreground/70 hover:text-brand-500 transition-colors duration-200"
              >
                <Phone className="h-4 w-4 text-brand-500" />
                +91 12345 67890
              </a>
              <span className="text-foreground/20">•</span>
              <a
                href="mailto:info@physiocareplus.in"
                className="flex items-center gap-2 text-xs font-semibold text-foreground/70 hover:text-brand-500 transition-colors duration-200"
              >
                <Mail className="h-4 w-4 text-brand-500" />
                info@physiocareplus.in
              </a>
            </div>
          </div>

          {/* Right: Form Card */}
          <div className="glass-card rounded-2xl border border-brand-500/10 shadow-2xl shadow-brand-500/5 p-4 md:p-5 bg-card">

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-5 py-10 text-center animate-fade-in">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">Message Sent!</h3>
                  <p className="mt-2 text-sm text-foreground/60 leading-relaxed max-w-xs">
                    Thank you for contacting us. Our team will get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="rounded-xl border border-brand-500/20 px-5 py-2 text-xs font-bold text-brand-500 hover:bg-brand-500/5 transition-all duration-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                <div className="flex flex-col gap-1 mb-2">
                  <h3 className="text-base font-extrabold text-foreground">Send Us a Message</h3>
                  <p className="text-xs text-foreground/50">Fill in the form and we&apos;ll respond within 24 hours.</p>
                </div>

                {/* Name + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-foreground/70 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-brand-500" />
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rahul Mehta"
                      className={inputClass("name")}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <span className="text-3xs text-red-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />{errors.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-foreground/70 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-brand-500" />
                      Phone Number
                    </label>
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={inputClass("phone")}
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <span className="text-3xs text-red-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />{errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email + Subject row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-foreground/70 flex items-center gap-1.5">
                      <Mail className="h-3 w-3 text-brand-500" />
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass("email")}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span className="text-3xs text-red-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />{errors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-foreground/70 flex items-center gap-1.5">
                      <FileText className="h-3 w-3 text-brand-500" />
                      Subject
                    </label>
                    <select
                      id="inquiry-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${inputClass("subject")} cursor-pointer`}
                    >
                      <option value="">Select a topic...</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-foreground/70 flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-brand-500" />
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Describe your condition, symptoms, or any questions you have..."
                    className={`${inputClass("message")} resize-none leading-relaxed`}
                  />
                  {errors.message && (
                    <span className="text-3xs text-red-400 font-semibold flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />{errors.message}
                    </span>
                  )}
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 px-4 py-3">
                    <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                    <p className="text-xs text-red-600 dark:text-red-400 font-semibold">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                <button
                  id="inquiry-submit-btn"
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-3xs text-foreground/40 font-semibold">
                  By submitting, you agree to our privacy policy. We never share your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
