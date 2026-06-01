// d:\Physo\physiocare-plus\src\components\layout\navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/providers";
import { Sun, Moon, Menu, X, Activity } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Admin Dashboard", href: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="glass-card mt-4 flex h-16 items-center justify-between rounded-2xl px-6 transition-all duration-300">
          
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/20 transition-all duration-300 group-hover:scale-110">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground transition-colors duration-200">
              PhysioCare<span className="text-brand-500">Plus</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-200 hover:text-brand-500 ${
                    isActive ? "text-brand-500 underline decoration-2 underline-offset-4" : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA & Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-50/10 text-foreground/80 transition-all duration-300 hover:scale-105 hover:bg-brand-500/10 active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Direct Booking CTA */}
            <Link
              href="/portal/book"
              className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg active:scale-98"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-500/20 bg-brand-50/10 text-foreground/80"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/80 transition-all duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="mx-auto max-w-7xl px-4 mt-2 md:hidden animate-fade-in">
          <div className="glass-card flex flex-col gap-4 rounded-2xl p-6 shadow-xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold py-2 transition-all duration-200 ${
                    isActive ? "text-brand-500 pl-2 border-l-2 border-brand-500" : "text-foreground/80 pl-0"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <hr className="border-brand-500/10" />
            <Link
              href="/portal/book"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-xl bg-brand-500 py-3 text-center text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition-all duration-200 hover:bg-brand-600"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
