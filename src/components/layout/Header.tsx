// d:\Physo\physiocare-plus\src\components\layout\Header.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/providers";
import Container from "./Container";
import Button from "../common/Button";
import { Sun, Moon, Menu, X, Activity, Phone } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Admin Panel", href: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-brand-500/10 shadow-sm transition-all duration-300">
      <Container>
        <div className="flex h-18 items-center justify-between px-2">

          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white shadow shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Activity className="h-5.5 w-5.5" />
            </div>
            <div className="flex flex-col -gap-0.5">
              <span className="text-base font-extrabold tracking-tight text-foreground">
                PhysioCare<span className="text-brand-500">Plus</span>
              </span>
              <span className="text-4xs text-foreground/45 font-bold uppercase tracking-wider leading-none">Move Better. Live Better.</span>
            </div>
          </Link>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:text-brand-500 ${isActive
                    ? "text-brand-500 border-b-2 border-brand-500 py-1"
                    : "text-foreground/75"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Phone & Button (Right Side) */}
          <div className="hidden md:flex items-center gap-5 shrink-0">

            {/* Phone Number Anchor */}
            <a
              href="tel:+18005550199"
              className="flex items-center gap-2 text-xs font-bold text-foreground/80 hover:text-brand-500 transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50/50 dark:bg-neutral-900/50 text-brand-500 border border-brand-500/10">
                <Phone className="h-4 w-4" />
              </div>
              <span className="hidden lg:inline">+1 (800) 555-0199</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-500/10 text-foreground/80 bg-brand-50/10 hover:bg-brand-500/10 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
            </button>

            {/* Primary "Book Appointment" CTA */}
            <Link href="/portal/book">
              <Button variant="primary" size="sm" className="font-bold uppercase tracking-wider">
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Switch (Mobile) */}
            <button
              onClick={toggleTheme}
              className="flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-brand-500/10 text-foreground/80"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-8.5 w-8.5 items-center justify-center rounded-lg text-foreground/80 transition-all duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>

        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <Container className="mt-1 md:hidden animate-fade-in absolute left-0 right-0 bg-white dark:bg-neutral-950 shadow-lg border-b border-brand-500/10 pb-6 rounded-b-2xl">
          <div className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-bold uppercase tracking-wider py-1.5 transition-all duration-200 ${isActive ? "text-brand-500 pl-2 border-l-2 border-brand-500" : "text-foreground/75"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <hr className="border-brand-500/10" />

            <a href="tel:+18005550199" className="flex items-center gap-3 font-bold text-sm text-foreground/85">
              <Phone className="h-4.5 w-4.5 text-brand-500" />
              <span>+1 (800) 555-0199</span>
            </a>

            <Link href="/portal/book" onClick={() => setIsOpen(false)}>
              <Button variant="primary" size="md" fullWidth className="font-bold uppercase tracking-wider">
                Book Appointment
              </Button>
            </Link>
          </div>
        </Container>
      )}
    </header>
  );
}
