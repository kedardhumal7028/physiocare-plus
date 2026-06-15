"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/providers";
import {
  Activity, LayoutDashboard, Calendar,
  Users, MessageSquare, Home, Menu, X,
  Moon, Sun, Bell, ChevronRight,
} from "lucide-react";

/* ─── Nav config ──────────────────────────────────────────────────── */
const ADMIN_NAV = [
  { label: "Dashboard",    href: "/admin",               icon: LayoutDashboard },
  { label: "Appointments", href: "/admin/appointments",  icon: Calendar        },
  { label: "Patients",     href: "/admin/patients",      icon: Users           },
  { label: "Inquiries",    href: "/admin/inquiries",     icon: MessageSquare   },
];

/* ═══════════════════════════════════════════════════════════════════
   LAYOUT
═══════════════════════════════════════════════════════════════════ */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const currentPage = ADMIN_NAV.find((n) => isActive(n.href))?.label ?? "Dashboard";

  /* ── Sidebar inner (shared between desktop + mobile) ── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo bar */}
      <div className="flex items-center justify-between h-[68px] px-5 shrink-0
        border-b border-slate-200 dark:border-white/[0.07]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl
            bg-[#0b469a] text-white
            shadow-[0_2px_8px_rgba(11,70,154,0.4)]
            group-hover:scale-105 transition-transform duration-200">
            <Activity className="h-[17px] w-[17px]" />
          </div>
          <div className="leading-none">
            <div className="text-[14px] font-extrabold tracking-tight text-slate-900 dark:text-white">
              PhysioCare<span className="text-[#0b469a] dark:text-blue-400">Plus</span>
            </div>
            <div className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-[0.12em] mt-0.5">
              Admin Panel
            </div>
          </div>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Doctor profile card */}
      <div className="mx-3 mt-4 p-3 rounded-xl flex items-center gap-3
        bg-gradient-to-br from-[#0b469a]/10 to-blue-50/80
        dark:from-blue-950/40 dark:to-[#0b469a]/5
        border border-blue-100 dark:border-blue-900/30">
        <img
          src="/images/dr-rajesh.png"
          alt="Dr. Rajesh Sharma"
          className="h-9 w-9 rounded-lg object-cover ring-2 ring-[#0b469a]/25 shrink-0 object-top"
        />
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-slate-900 dark:text-white truncate">Dr. Rajesh Sharma</p>
          <p className="text-[10px] font-semibold text-[#0b469a] dark:text-blue-400 uppercase tracking-wider mt-0.5">Administrator</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 px-3 mt-5 flex-1" aria-label="Admin navigation">
        <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 select-none">
          Main Menu
        </p>
        {ADMIN_NAV.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium
                transition-all duration-150 group
                ${active
                  ? "bg-[#0b469a] text-white shadow-md shadow-[#0b469a]/25 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              <Icon className={`h-4 w-4 shrink-0 transition-colors
                ${active
                  ? "text-white/90"
                  : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                }`}
              />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="h-3.5 w-3.5 text-white/50 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer controls */}
      <div className="px-3 pb-4 mt-4 border-t border-slate-200 dark:border-white/[0.07] pt-4 flex flex-col gap-0.5">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left
            text-[13px] font-medium text-slate-600 dark:text-slate-300
            hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white
            transition-colors duration-150 cursor-pointer group"
        >
          {theme === "light"
            ? <><Moon className="h-4 w-4 text-slate-400 group-hover:text-slate-600 shrink-0" /><span>Dark Mode</span></>
            : <><Sun  className="h-4 w-4 text-slate-400 group-hover:text-slate-300 shrink-0" /><span>Light Mode</span></>
          }
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl
            text-[13px] font-medium text-slate-600 dark:text-slate-300
            hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white
            transition-colors duration-150 group"
        >
          <Home className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 shrink-0" />
          Back to Website
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100">

      {/* ══ Sidebar — Desktop: always visible, Mobile: slide-in ══ */}

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 shrink-0
          bg-white dark:bg-[#0d1118]
          border-r border-slate-200 dark:border-white/[0.07]
          transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:h-screen md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent />
      </aside>

      {/* ══ Main area ══ */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* ── Top bar ── */}
        <header className="sticky top-0 z-20 h-[68px] shrink-0 flex items-center justify-between px-5 md:px-6
          bg-white dark:bg-[#0d1118]
          border-b border-slate-200 dark:border-white/[0.07]
          shadow-sm shadow-black/[0.04] dark:shadow-black/[0.3]">

          {/* Left: burger + breadcrumb */}
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg
                border border-slate-200 dark:border-white/10
                bg-slate-50 dark:bg-white/[0.04]
                text-slate-500 dark:text-slate-400
                hover:text-[#0b469a] dark:hover:text-blue-400
                active:scale-95 transition-all duration-150"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo on mobile top bar */}
            <Link href="/" className="flex items-center gap-2 md:hidden group">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0b469a] text-white">
                <Activity className="h-4 w-4" />
              </div>
              <span className="text-[14px] font-extrabold text-slate-900 dark:text-white">
                PhysioCare<span className="text-[#0b469a] dark:text-blue-400">Plus</span>
              </span>
            </Link>

            {/* Breadcrumb — desktop */}
            <div className="hidden md:flex items-center gap-1.5 text-[13px]">
              <span className="text-slate-400 dark:text-slate-500 font-medium">Admin</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-white/20" />
              <span className="font-semibold text-slate-900 dark:text-white">{currentPage}</span>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            {/* Bell */}
            <button className="relative flex h-[34px] w-[34px] items-center justify-center rounded-lg
              border border-slate-200 dark:border-white/10
              bg-slate-50 dark:bg-white/[0.04]
              text-slate-500 dark:text-slate-400
              hover:border-[#0b469a]/40 dark:hover:border-blue-400/40
              hover:text-[#0b469a] dark:hover:text-blue-400
              hover:bg-[#0b469a]/5 dark:hover:bg-blue-400/10
              active:scale-95 transition-all duration-150">
              <Bell className="h-[15px] w-[15px]" />
              <span className="absolute top-1.5 right-1.5 h-[7px] w-[7px] rounded-full
                bg-red-500 ring-[1.5px] ring-white dark:ring-[#0d1118]" />
            </button>

            {/* Dark mode */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-lg
                border border-slate-200 dark:border-white/10
                bg-slate-50 dark:bg-white/[0.04]
                text-slate-500 dark:text-slate-400
                hover:border-[#0b469a]/40 dark:hover:border-blue-400/40
                hover:text-[#0b469a] dark:hover:text-blue-400
                hover:bg-[#0b469a]/5 dark:hover:bg-blue-400/10
                active:scale-95 transition-all duration-150 cursor-pointer"
            >
              {theme === "light"
                ? <Moon className="h-[15px] w-[15px]" />
                : <Sun  className="h-[15px] w-[15px]" />}
            </button>

            {/* Divider + Avatar */}
            <div className="flex items-center gap-2.5 pl-3 ml-1
              border-l border-slate-200 dark:border-white/[0.07]">
              <img
                src="/images/dr-rajesh.png"
                alt="Dr. Rajesh Sharma"
                className="h-8 w-8 rounded-lg object-cover object-top
                  ring-2 ring-[#0b469a]/20 dark:ring-blue-400/20"
              />
              <div className="hidden sm:block leading-none">
                <p className="text-[13px] font-semibold text-slate-900 dark:text-white">Dr. Rajesh Sharma</p>
                <p className="text-[10px] text-[#0b469a] dark:text-blue-400 font-semibold mt-0.5">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1 overflow-y-auto p-5 md:p-7 lg:p-8
          bg-slate-50 dark:bg-[#080c14]">
          {children}
        </main>
      </div>
    </div>
  );
}
