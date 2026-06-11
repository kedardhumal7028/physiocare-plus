"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/app/providers";
import Container from "./Container";
import { Sun, Moon, Menu, X, Activity, Phone, CalendarCheck, LayoutDashboard } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",         id: "hero"         },
  { label: "About",        id: "about"        },
  { label: "Services",     id: "services"     },
  { label: "Testimonials", id: "testimonials" },
  { label: "Inquiry",      id: "contact"      },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top - 70,
    behavior: "smooth",
  });
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router   = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const ids = NAV_LINKS.map((n) => n.id);
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.intersectionRatio));
        let best = "hero", bestRatio = -1;
        ids.forEach((id) => {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) { bestRatio = r; best = id; }
        });
        setActiveId(best);
      },
      { rootMargin: "0px 0px -40% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setMenuOpen(false);
      if (pathname === "/") scrollToSection(id);
      else router.push(`/#${id}`);
    },
    [pathname, router]
  );

  const isHome   = pathname === "/";
  const isActive = (id: string) => isHome && activeId === id;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 bg-background/95 backdrop-blur-md border-b border-card-border ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-4">
          
          {/* LOGO */}
          <Link
            href="/"
            onClick={(e) => { if (isHome) { e.preventDefault(); scrollToSection("hero"); } }}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0b469a] text-white transition-transform duration-200 group-hover:scale-105">
              <Activity className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[16px] font-extrabold tracking-tight text-foreground">
                PhysioCare<span className="text-[#0b469a] dark:text-blue-400">Plus</span>
              </span>
              <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-widest mt-0.5">
                Move Better. Live Better.
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center h-full gap-6 lg:gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, id }) => {
              const active = isActive(id);
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`relative flex items-center h-full text-[14px] font-medium transition-colors duration-200
                    ${active ? "text-brand-600 dark:text-brand-400" : "text-foreground/70 hover:text-brand-600 dark:hover:text-brand-400"}`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0b469a] dark:bg-blue-400 rounded-t-sm" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT CONTROLS */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            
            {/* Admin Panel */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-[14px] font-medium text-foreground/70 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>

            {/* Divider */}
            <span className="h-5 w-px bg-slate-300 dark:bg-neutral-700" />

            {/* Phone */}
            <a
              href="tel:+911234567890"
              className="flex items-center gap-1.5 text-[14px] font-medium text-foreground/70 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">+91 12345 67890</span>
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border bg-card text-foreground/80 hover:bg-foreground/5 transition-colors"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* Book CTA */}
            <Link
              href="/portal/book"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0b469a] text-white text-[14px] font-bold hover:bg-[#083580] transition-colors shadow-sm"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Appointment
            </Link>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border text-foreground/80 transition-colors"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border text-foreground/80 transition-colors"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </Container>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden border-t border-card-border bg-background overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(({ label, id }) => {
            const active = isActive(id);
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`flex items-center px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                  active
                    ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold"
                    : "text-foreground/80 hover:bg-foreground/5"
                }`}
              >
                {label}
              </a>
            );
          })}

          <div className="my-2 border-t border-slate-200 dark:border-neutral-800" />

          <Link
            href="/admin"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium text-foreground/80 hover:bg-foreground/5 transition-colors"
          >
            <LayoutDashboard className="h-5 w-5 text-slate-400" />
            Admin Panel
          </Link>

          <a
            href="tel:+911234567890"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium text-foreground/80 hover:bg-foreground/5 transition-colors"
          >
            <Phone className="h-5 w-5 text-slate-400" />
            +91 12345 67890
          </a>

          <Link
            href="/portal/book"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-[#0b469a] text-white text-[15px] font-bold hover:bg-[#083580] transition-colors"
          >
            <CalendarCheck className="h-5 w-5" />
            Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
