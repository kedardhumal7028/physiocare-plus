// c:\Users\Admin\kedar\physiocare-plus\src\app\contact\page.tsx
"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import WhatsAppCTA from "@/components/layout/whatsapp-cta";
import Container from "@/components/layout/Container";
import { Phone, Mail, MapPin, Send, CheckCircle, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function ContactPage() {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Accordion active index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    { q: "What should I wear to my first physical therapy session?", a: "Please wear loose, comfortable clothing (like athletic wear) that allows our therapists to easily access the diagnostic site (e.g. knee, shoulder, or lumbar spine)." },
    { q: "Do you accept health insurance plans?", a: "Yes, we accept major health insurance provider claims. Please upload your insurance card details inside the patient records dashboard or call our help desk to verify eligibility." },
    { q: "How long does a standard treatment session take?", a: "Our treatment durations range from 30 to 75 minutes depending on the selected therapeutic modality (e.g. Dry Needling takes 30 mins, while Post-Op muscle rehabilitation takes 75 mins)." },
    { q: "Is home visit physiotherapy eligible for everyone?", a: "Home visit dispatches are available for patients requesting specialized mobility services or post-surgery recoveries located within 25km of our central clinic. Use the Distance Eligibility tool to check." }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: "Contact Page Inquiry",
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send inquiry");
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch {
      setIsSubmitting(false);
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <Header />

      <main className="flex-grow py-12 md:py-20 bg-background text-foreground bg-grid-pattern">
        <Container>
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4 animate-fade-in">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Contact Us</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Connect With <span className="text-gradient">Our Team</span>
            </h1>
            <p className="text-sm sm:text-base text-foreground/75 leading-relaxed">
              Have questions regarding scheduling, clinic hours, or EMR profiles? Fill in the details below, and our desk coordinator will respond shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Form & Info Details (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="glass-card p-6 md:p-8 border border-brand-500/10 shadow-lg bg-white dark:bg-neutral-900">
                <h3 className="text-sm font-extrabold text-foreground mb-6 uppercase tracking-wider pb-2 border-b border-brand-500/10">
                  Send a Message
                </h3>

                {submitSuccess ? (
                  <div className="p-6 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex flex-col items-center gap-3 text-center animate-fade-in">
                    <CheckCircle className="h-10 w-10 text-emerald-500" />
                    <span className="text-xs font-bold">Message Sent Successfully!</span>
                    <span className="text-4xs text-foreground/60 leading-normal max-w-xs font-medium">
                      Thank you for contacting us. A care coordinator will review your inquiry and reach back to you within 24 hours.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-5 text-xs text-foreground">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-3xs font-bold text-foreground/80">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 outline-none focus:border-brand-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-3xs font-bold text-foreground/80">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        placeholder="Your contact number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 outline-none focus:border-brand-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-3xs font-bold text-foreground/80">Message Description *</label>
                      <textarea
                        required
                        placeholder="Describe your question or physical alignment requirements..."
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 outline-none focus:border-brand-500"
                      />
                    </div>

                    {submitError && (
                      <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 dark:border-red-800/30 dark:bg-red-900/10 dark:text-red-400">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <p className="text-xs font-semibold">{submitError}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-brand-500 py-3 text-center font-bold uppercase tracking-wider text-white shadow-md shadow-brand-500/25 hover:bg-brand-600 transition-all duration-200 active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:bg-foreground/10 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4.5 w-4.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4.5 w-4.5" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Contact info cards & FAQ Accordions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Contact Details Board */}
              <div className="glass-card p-6 border border-brand-500/10 shadow-lg bg-white dark:bg-neutral-900 flex flex-col gap-5">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider pb-2 border-b border-brand-500/10">
                  Quick Communication
                </h3>
                
                <div className="flex flex-col gap-4 text-xs font-semibold">
                  <a href="tel:+18005550199" className="flex items-center gap-3 p-3 rounded-xl border border-brand-500/5 bg-brand-50/10 hover:bg-brand-50/25 text-foreground/80 hover:text-brand-500 transition-all">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white shadow-sm shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-foreground/50 font-bold uppercase leading-none">Phone Support</span>
                      <span className="mt-0.5 font-bold">+1 (800) 555-0199</span>
                    </div>
                  </a>

                  <a href="mailto:care@physiocareplus.com" className="flex items-center gap-3 p-3 rounded-xl border border-brand-500/5 bg-brand-50/10 hover:bg-brand-50/25 text-foreground/80 hover:text-brand-500 transition-all">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white shadow-sm shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-foreground/50 font-bold uppercase leading-none">Email Caredesk</span>
                      <span className="mt-0.5 font-bold">care@physiocareplus.com</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-xl border border-brand-500/5 bg-brand-50/10 text-foreground/85">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white shadow-sm shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-foreground/50 font-bold uppercase leading-none">Clinic Location</span>
                      <span className="mt-0.5 font-bold leading-tight">123 Therapy Lane, Wellness Block, Metro City</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Interactive Accordions */}
              <div className="glass-card p-6 border border-brand-500/10 shadow-lg bg-white dark:bg-neutral-900 flex flex-col gap-4">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider pb-2 border-b border-brand-500/10">
                  Frequently Asked Questions
                </h3>

                <div className="flex flex-col gap-3">
                  {faqs.map((faq, index) => {
                    const isOpen = activeFaq === index;
                    return (
                      <div
                        key={index}
                        className="rounded-xl border border-brand-500/5 overflow-hidden transition-all bg-brand-50/5 dark:bg-neutral-950/10"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full p-4 flex justify-between items-center text-left text-xs font-bold text-foreground hover:bg-brand-500/5 transition-colors cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          {isOpen ? <ChevronUp className="h-4 w-4 text-brand-500" /> : <ChevronDown className="h-4 w-4 text-foreground/55" />}
                        </button>
                        
                        {isOpen && (
                          <div className="p-4 border-t border-brand-500/5 text-[11px] text-foreground/75 leading-relaxed bg-white dark:bg-neutral-900 animate-fade-in font-medium">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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
