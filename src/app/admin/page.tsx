// d:\Physo\physiocare-plus\src\app\admin\page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getStoredAppointments,
  Appointment,
  MOCK_SERVICES,
  MOCK_CLINICIANS
} from "@/features/appointments/booking-store";
import {
  Users,
  DollarSign,
  Star,
  Calendar,
  ArrowUpRight,
  Activity,
  Clock,
  ChevronRight,
  TrendingUp
} from "lucide-react";

export default function AdminDashboardOverview() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(getStoredAppointments());
  }, []);

  // KPI Calculations
  const totalAppointmentsCount = appointments.length;
  const activePatients = Array.from(new Set(appointments.map(a => a.patient_name))).length;

  const kpis = [
    { name: "Today's Appointments", value: totalAppointmentsCount + 8, tag: "12", link: "/admin/appointments" },
    { name: "New Leads", value: "8", tag: "8", link: "/admin/appointments" },
    { name: "Total Patients", value: "1,245", tag: "1,245", link: "/admin/patients" },
    { name: "Total Reviews", value: "56", tag: "56", link: "/admin" }
  ];

  const popularServices = [
    { name: "Back Pain Treatment", pct: 35, color: "bg-brand-500" },
    { name: "Neck Pain Treatment", pct: 25, color: "bg-accent-500" },
    { name: "Sports Injury Rehab", pct: 20, color: "bg-emerald-500" },
    { name: "Post-Surgery Rehab", pct: 20, color: "bg-indigo-500" }
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in text-foreground">

      {/* Header Panel */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-brand-500/5 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-xs text-foreground/50">Welcome back, Dr. Rahul Mehta. Monitor active schedules and clinical performance metrics.</p>
        </div>
        <Link
          href="/admin/appointments"
          className="rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/10 hover:bg-brand-600 hover:-translate-y-0.5 transition-all duration-200"
        >
          View Appointments
        </Link>
      </div>

      {/* KPI Cards (Dashboard Top Row from Reference) */}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="glass-card p-5 border border-brand-500/5 hover:border-brand-500/15 shadow flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-3xs font-extrabold text-foreground/55 uppercase tracking-wider">{kpi.name}</span>
              <span className="text-2xl font-extrabold tracking-tight">{kpi.value}</span>
            </div>

            <Link
              href={kpi.link}
              className="text-4xs font-bold text-brand-500 hover:text-brand-600 transition-colors inline-flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        ))}
      </div>

      {/* Main Section Grid Split (Reference Layout) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

        {/* ================= LEFT MAIN COLUMN: GRAPHS & LEADS CHARTS (8 cols) ================= */}
        <div className="lg:col-span-8 flex flex-col gap-8">

          {/* Card 1: Appointments Overview Line Graph */}
          <div className="glass-card p-6 border border-brand-500/5 shadow flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-brand-500/5 pb-3">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-xs font-extrabold">Appointments Overview</h3>
                <span className="text-4xs text-foreground/60 leading-none">Weekly visitation analysis</span>
              </div>
              <span className="text-4xs font-bold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded">This Week</span>
            </div>

            {/* Custom SVG Line Graph representation matching reference exactly */}
            <div className="relative h-48 w-full flex flex-col justify-between">

              {/* SVG Canvas */}
              <div className="absolute inset-0 pt-2 pb-6 px-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="100" y2="20" className="stroke-brand-500/5" strokeWidth="0.5" strokeDasharray="3" />
                  <line x1="0" y1="50" x2="100" y2="50" className="stroke-brand-500/5" strokeWidth="0.5" strokeDasharray="3" />
                  <line x1="0" y1="80" x2="100" y2="80" className="stroke-brand-500/5" strokeWidth="0.5" strokeDasharray="3" />

                  {/* Gradient Area under curve */}
                  <path
                    d="M0 100 Q 15 70, 30 50 T 60 20 T 90 40 T 100 45 L 100 100 Z"
                    className="fill-brand-500/5 stroke-none"
                  />

                  {/* Main Line path */}
                  <path
                    d="M0 100 Q 15 70, 30 50 T 60 20 T 90 40 T 100 45"
                    className="fill-none stroke-brand-500"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Nodes */}
                  <circle cx="30" cy="50" r="3" className="fill-brand-500 stroke-white" strokeWidth="1" />
                  <circle cx="60" cy="20" r="3" className="fill-brand-500 stroke-white" strokeWidth="1" />
                  <circle cx="90" cy="40" r="3" className="fill-brand-500 stroke-white" strokeWidth="1" />
                </svg>
              </div>

              {/* X Axis indicators */}
              <div className="flex justify-between items-end h-full px-2 text-4xs text-foreground/50 font-bold">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

            </div>
          </div>

          {/* Card 2: Donut Chart - Leads Overview */}
          <div className="glass-card p-6 border border-brand-500/5 shadow flex flex-col gap-6">
            <div className="border-b border-brand-500/5 pb-3">
              <h3 className="text-xs font-extrabold">Leads Overview</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 items-center">

              {/* Custom CSS Donut segment */}
              <div className="flex justify-center">
                <div className="relative h-32 w-32 rounded-full border-12 border-brand-500 flex items-center justify-center border-t-emerald-500 border-r-indigo-500 border-b-amber-500 animate-spin-slow">
                  <div className="absolute inset-0 rounded-full bg-white dark:bg-neutral-900 m-2 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-base font-extrabold leading-none text-foreground">80%</span>
                    <span className="text-4xs text-foreground/50 font-bold uppercase tracking-wider mt-0.5">Leads</span>
                  </div>
                </div>
              </div>

              {/* Data list legends */}
              <div className="flex flex-col gap-2.5 text-xs text-foreground/75 font-semibold">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded bg-brand-500"></span>New</span>
                  <span>45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded bg-amber-500"></span>Contacted</span>
                  <span>30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded bg-emerald-500"></span>Converted</span>
                  <span>20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded bg-indigo-500"></span>Closed</span>
                  <span>5%</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDEBAR COLUMN: RECENT APPOINTMENTS & POPULAR (4 cols) ================= */}
        <div className="lg:col-span-4 flex flex-col gap-8">

          {/* Card 3: Recent Appointments feeds */}
          <div className="glass-card p-6 border border-brand-500/5 shadow flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-brand-500/5 pb-3">
              <h3 className="text-xs font-extrabold">Recent Appointments</h3>
              <Link href="/admin/appointments" className="text-4xs font-bold text-brand-500 hover:underline">View All</Link>
            </div>

            <div className="flex flex-col gap-3.5 max-h-80 overflow-y-auto pr-1">
              {[
                { name: "Ramesh Patil", time: "10:00 AM", service: "Back Pain Treatment", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" },
                { name: "Sneha Kulkarni", time: "11:30 AM", service: "Neck Pain Treatment", image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=100" },
                { name: "Ajay Singh", time: "02:00 PM", service: "Sports Injury Rehab", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100" },
                { name: "Pooja Sharma", time: "04:30 PM", service: "Post-Surgery Rehab", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100" }
              ].map((appt, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-brand-50/20 dark:bg-neutral-900/30 border border-brand-500/5 flex items-center gap-3 animate-fade-in hover:border-brand-500/15 transition-colors"
                >
                  <img
                    src={appt.image}
                    alt={appt.name}
                    className="h-9 w-9 rounded-lg object-cover border border-brand-500/10"
                  />
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-foreground truncate">{appt.name}</span>
                      <span className="text-4xs text-brand-500 font-bold">{appt.time}</span>
                    </div>
                    <span className="text-4xs text-foreground/60 font-semibold truncate mt-0.5">{appt.service}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Popular Services Progress bars */}
          <div className="glass-card p-6 border border-brand-500/5 shadow flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-brand-500/5 pb-3">
              <h3 className="text-xs font-extrabold">Popular Services</h3>
              <Link href="/services" className="text-4xs font-bold text-brand-500 hover:underline">View All</Link>
            </div>

            <div className="flex flex-col gap-4">
              {popularServices.map((service, i) => (
                <div key={i} className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <span>{service.name}</span>
                    <span className="text-brand-500">{service.pct}%</span>
                  </div>
                  {/* Progress bar container */}
                  <div className="w-full h-2 rounded bg-slate-100 dark:bg-neutral-900 overflow-hidden">
                    <div
                      style={{ width: `${service.pct}%` }}
                      className={`h-full rounded ${service.color} transition-all duration-500`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
