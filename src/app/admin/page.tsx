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
    <div className="flex flex-col gap-7 animate-fade-in">

      {/* Header Panel */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-neutral-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Welcome back, Dr. Emma Stone. Monitor active schedules and clinical performance.</p>
        </div>
        <Link
          href="/admin/appointments"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0b469a] px-4 py-2.5 text-[13px] font-bold text-white
            shadow-md shadow-[#0b469a]/25 hover:bg-[#083580] hover:-translate-y-px
            active:scale-[0.97] transition-all duration-150"
        >
          View Appointments
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#0d1117] rounded-2xl p-5
              border border-slate-200 dark:border-neutral-800
              hover:border-[#0b469a]/30 hover:shadow-md dark:hover:border-blue-800/50
              shadow-sm transition-all duration-200 flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{kpi.name}</span>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{kpi.value}</span>
            </div>
            <Link
              href={kpi.link}
              className="text-[11px] font-bold text-[#0b469a] dark:text-blue-400 hover:text-[#083580] dark:hover:text-blue-300 transition-colors inline-flex items-center gap-0.5"
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
          <div className="bg-white dark:bg-[#0d1117] rounded-2xl p-6 border border-slate-200 dark:border-neutral-800 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[13px] font-bold text-slate-900 dark:text-white">Appointments Overview</h3>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Weekly visitation analysis</span>
              </div>
              <span className="text-[11px] font-bold text-[#0b469a] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-lg">This Week</span>
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
          <div className="bg-white dark:bg-[#0d1117] rounded-2xl p-6 border border-slate-200 dark:border-neutral-800 shadow-sm flex flex-col gap-6">
            <div className="border-b border-slate-100 dark:border-neutral-800 pb-3">
              <h3 className="text-[13px] font-bold text-slate-900 dark:text-white">Leads Overview</h3>
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
          <div className="bg-white dark:bg-[#0d1117] rounded-2xl p-6 border border-slate-200 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <h3 className="text-[13px] font-bold text-slate-900 dark:text-white">Recent Appointments</h3>
              <Link href="/admin/appointments" className="text-[11px] font-bold text-[#0b469a] dark:text-blue-400 hover:text-[#083580] dark:hover:text-blue-300 transition-colors">View All</Link>
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
                  className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-100 dark:border-neutral-800 flex items-center gap-3 hover:border-[#0b469a]/20 transition-colors"
                >
                  <img
                    src={appt.image}
                    alt={appt.name}
                    className="h-9 w-9 rounded-lg object-cover border border-[#0b469a]/10"
                  />
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-bold text-slate-900 dark:text-white truncate">{appt.name}</span>
                      <span className="text-[11px] text-[#0b469a] dark:text-blue-400 font-semibold">{appt.time}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">{appt.service}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Popular Services Progress bars */}
          <div className="bg-white dark:bg-[#0d1117] rounded-2xl p-6 border border-slate-200 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <h3 className="text-[13px] font-bold text-slate-900 dark:text-white">Popular Services</h3>
              <Link href="/services" className="text-[11px] font-bold text-[#0b469a] dark:text-blue-400 hover:text-[#083580] dark:hover:text-blue-300 transition-colors">View All</Link>
            </div>

            <div className="flex flex-col gap-4">
              {popularServices.map((service, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[13px] font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">{service.name}</span>
                    <span className="text-[#0b469a] dark:text-blue-400 font-bold">{service.pct}%</span>
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
