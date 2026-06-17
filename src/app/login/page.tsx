"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import Container from "@/components/layout/Container";
import Button from "@/components/common/Button";
import { Activity, Mail, Lock, Phone, User, ArrowRight, Loader2, KeyRound, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-xs text-foreground/50 bg-brand-50/10">
        Loading authentication layout...
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  );
}

type TabType = "patient-signin" | "patient-signup" | "admin-signin";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "";

  const { login, register, role } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("patient-signin");

  // Auto-redirect already-authenticated users
  useEffect(() => {
    if (role === "admin") {
      router.push(redirectPath || "/admin");
    } else if (role === "user") {
      router.push(redirectPath || "/portal");
    }
  }, [role, redirectPath, router]);

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (activeTab === "patient-signin" || activeTab === "admin-signin") {
        if (!email || !password) {
          setError("All fields are required.");
          setIsSubmitting(false);
          return;
        }

        const res = await login(email, password);
        if (res.success) {
          // Route based on actual role assigned during login
          // role state updates asynchronously, so check activeTab as hint but
          // also check the API path: admin API sets role="admin"
          if (activeTab === "admin-signin") {
            router.push(redirectPath || "/admin");
          } else {
            router.push(redirectPath || "/portal");
          }
        } else {
          setError(res.error || "Invalid credentials.");
        }
      } else {
        // Sign Up
        if (!name || !phone || !email || !password || !confirmPassword) {
          setError("All fields are required.");
          setIsSubmitting(false);
          return;
        }

        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setIsSubmitting(false);
          return;
        }

        if (password.length < 6) {
          setError("Password must be at least 6 characters long.");
          setIsSubmitting(false);
          return;
        }

        const res = await register(name, phone, email, password);
        if (res.success) {
          router.push(redirectPath || "/portal");
        } else {
          setError(res.error || "Registration failed.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectTab = (tab: TabType) => {
    setActiveTab(tab);
    setError("");
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setConfirmPassword("");
  };

  return (
    <>
      <Header />

      <main className="flex-grow py-16 md:py-24 bg-slate-50/50 dark:bg-neutral-950/20 flex items-center">
        <Container className="max-w-md w-full mx-auto">
          <div className="glass-card border border-brand-500/10 shadow-2xl p-6 md:p-8 flex flex-col gap-6 w-full relative overflow-hidden">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-brand-500/5 -mr-8 -mt-8 blur-xl"></div>
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-accent-500/5 -ml-8 -mb-8 blur-xl"></div>

            {/* Header Branding */}
            <div className="flex flex-col items-center gap-2 text-center relative z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/10">
                <Activity className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-extrabold tracking-tight mt-2 text-foreground">
                PhysioCare<span className="text-brand-500">Plus</span> Portal
              </h2>
              <p className="text-4xs text-foreground/50 font-bold uppercase tracking-wider">
                Manage your physical wellness program
              </p>
            </div>

            {/* Selection Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-brand-50/50 dark:bg-neutral-900/50 p-1.5 rounded-full border border-brand-500/5 relative z-10 text-3xs font-bold uppercase tracking-wider text-center">
              <button
                type="button"
                onClick={() => selectTab("patient-signin")}
                className={`py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === "patient-signin"
                    ? "bg-white dark:bg-neutral-950 text-brand-500 shadow-sm border border-brand-500/5"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => selectTab("patient-signup")}
                className={`py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === "patient-signup"
                    ? "bg-white dark:bg-neutral-950 text-brand-500 shadow-sm border border-brand-500/5"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => selectTab("admin-signin")}
                className={`py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === "admin-signin"
                    ? "bg-white dark:bg-neutral-950 text-brand-500 shadow-sm border border-brand-500/5"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="flex gap-2.5 items-center p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-500 text-xs font-semibold animate-fade-in relative z-10">
                <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
              
              {/* Patient Register - Full Name */}
              {activeTab === "patient-signup" && (
                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-3xs font-bold text-foreground/80 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-full border border-brand-500/20 bg-background/50 pl-10 pr-4 py-2.5 text-xs outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Patient Register - Phone Number */}
              {activeTab === "patient-signup" && (
                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-3xs font-bold text-foreground/80 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-full border border-brand-500/20 bg-background/50 pl-10 pr-4 py-2.5 text-xs outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Common - Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-3xs font-bold text-foreground/80 uppercase tracking-wider">
                  {activeTab === "admin-signin" ? "Admin Email Address" : "Email Address"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border border-brand-500/20 bg-background/50 pl-10 pr-4 py-2.5 text-xs outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>

              {/* Common - Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-3xs font-bold text-foreground/80 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-full border border-brand-500/20 bg-background/50 pl-10 pr-4 py-2.5 text-xs outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>

              {/* Patient Register - Confirm Password */}
              {activeTab === "patient-signup" && (
                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-3xs font-bold text-foreground/80 uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-full border border-brand-500/20 bg-background/50 pl-10 pr-4 py-2.5 text-xs outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-brand-500 py-3 text-center text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600 active:scale-[0.99] transition-all duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying session...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {activeTab === "patient-signin"
                        ? "Log In to Portal"
                        : activeTab === "patient-signup"
                        ? "Register Account"
                        : "Verify Admin Login"}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick helper credential hints to ease user validation */}
            {activeTab === "admin-signin" && (
              <div className="bg-brand-50/35 dark:bg-neutral-900/35 border border-brand-500/5 p-3.5 rounded-xl text-4xs text-foreground/60 leading-normal font-semibold relative z-10 flex flex-col gap-1">
                <span className="text-brand-500 uppercase tracking-wider font-extrabold text-[9px] mb-0.5">Admin Demo Access</span>
                <span>Email: <code className="text-foreground font-mono">admin@physiocare.com</code></span>
                <span>Pass: <code className="text-foreground font-mono">adminpassword123</code></span>
              </div>
            )}

            {activeTab === "patient-signin" && (
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-xl text-4xs text-foreground/60 leading-normal font-semibold relative z-10 flex flex-col gap-1">
                <span className="text-emerald-500 uppercase tracking-wider font-extrabold text-[9px] mb-0.5">Patient Demo Access</span>
                <span>Email: <code className="text-foreground font-mono">john@example.com</code></span>
                <span>Pass: <code className="text-foreground font-mono">john2026</code> (or <code className="text-foreground font-mono">john123</code>)</span>
              </div>
            )}

            <div className="text-center relative z-10">
              <Link href="/" className="text-4xs font-bold text-brand-500 hover:underline">
                Return to Public Website
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
