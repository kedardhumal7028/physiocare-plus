// d:\Physo\physiocare-plus\src\app\admin\layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/providers";
import {
  Activity,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  Home,
  Menu,
  X,
  Moon,
  Sun
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const adminLinks = [
    { name: "Overview Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Appointments Master", href: "/admin/appointments", icon: Calendar },
    { name: "Patients Directory", href: "/admin/patients", icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-brand-50/5 text-foreground bg-grid-pattern">

      {/* ================= MOBILE NAVIGATION BAR ================= */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 bg-background border-b border-brand-500/10 sticky top-0 z-40 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">
            PhysioCare<span className="text-brand-500">Plus</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-500/10 text-foreground/80 bg-brand-50/5"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/80 active:scale-95"
            aria-label="Toggle sidebar menu"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ================= SIDEBAR COMPONENT ================= */}
      <aside className={`fixed inset-y-0 left-0 z-50 md:sticky md:z-10 w-64 border-r border-brand-500/10 bg-background md:bg-background/80 md:backdrop-blur-md px-4 py-6 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>

        <div className="flex flex-col gap-8">
          {/* Logo Branding */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white group-hover:scale-105 transition-transform duration-200">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                PhysioCare<span className="text-brand-500">Plus</span>
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-foreground/50 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Doctor Profile Card */}
          <div className="p-3.5 rounded-xl bg-brand-50/50 dark:bg-neutral-900/50 border border-brand-500/5 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100"
              alt="Physiotherapist avatar profile"
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground">Dr. Emma Stone</span>
              <span className="text-3xs text-brand-500 font-bold uppercase tracking-wider">Administrator</span>
            </div>
          </div>

          {/* Core Panel Navigation Links */}
          <nav className="flex flex-col gap-1">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/10"
                    : "text-foreground/80 hover:bg-brand-500/5"
                    }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="flex flex-col gap-3">
          {/* Quick theme switcher for desktop */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center gap-3 px-3 py-2 text-xs font-bold text-foreground/80 rounded-xl hover:bg-brand-500/5 cursor-pointer"
          >
            {theme === "light" ? (
              <>
                <Moon className="h-4.5 w-4.5 text-brand-500" />
                <span>Switch Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="h-4.5 w-4.5 text-brand-500" />
                <span>Switch Light Mode</span>
              </>
            )}
          </button>

          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-foreground/80 rounded-xl hover:bg-brand-500/5 cursor-pointer"
          >
            <Home className="h-4.5 w-4.5 text-brand-500" />
            <span>Go to Public Website</span>
          </Link>
        </div>

      </aside>

      {/* Main dashboard content panel wrapper */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>

      {/* Click backdrop helper for mobile open sidebars */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden animate-fade-in"
        ></div>
      )}

    </div>
  );
}
