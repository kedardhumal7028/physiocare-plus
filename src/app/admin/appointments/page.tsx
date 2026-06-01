// d:\Physo\physiocare-plus\src\app\admin\appointments\page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getStoredAppointments,
  updateAppointmentStatus,
  Appointment,
  MOCK_SERVICES,
  MOCK_CLINICIANS
} from "@/features/appointments/booking-store";
import {
  Calendar as CalendarIcon,
  Clock,
  Check,
  X,
  Search,
  Plus,
  AlertCircle,
  Activity,
  ArrowUpDown,
  Filter
} from "lucide-react";

export default function AdminAppointmentsMaster() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    setAppointments(getStoredAppointments());
  }, []);

  const handleStatusChange = (id: string, nextStatus: Appointment['status']) => {
    const updated = updateAppointmentStatus(id, nextStatus);
    setAppointments(updated);
  };

  // Filter pipeline
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = a.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patient_phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-foreground">

      {/* Header and Add Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-brand-500/5 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments Management</h1>
          <p className="text-xs text-foreground/50">Manage scheduling timetables, audit clinical check-ins, and override session statuses.</p>
        </div>

        <Link href="/portal/book">
          <button className="rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-500/10 hover:bg-brand-600 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer">
            <Plus className="h-4.5 w-4.5" />
            <span>Add Appointment</span>
          </button>
        </Link>
      </div>

      {/* Filter and Search Bar (Reference Layout) */}
      <div className="glass-card p-4 border border-brand-500/5 shadow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Left: Search input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-foreground/45" />
          <input
            type="text"
            placeholder="Search patient name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-brand-500/20 bg-background/50 pl-10 pr-3.5 py-2 text-xs outline-none focus:border-brand-500"
          />
        </div>

        {/* Right: Status selector & date range placeholders */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-foreground/60 font-semibold">
            <Filter className="h-4 w-4 text-brand-500" />
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-brand-500/20 bg-background px-3 py-1.5 text-xs font-semibold outline-none focus:border-brand-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

      </div>

      {/* ================= DYNAMIC APPOINTMENTS TABULAR SHEET ================= */}
      <div className="glass-card overflow-hidden border border-brand-500/10 shadow-lg bg-white dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-brand-500/10 bg-slate-50/50 dark:bg-neutral-950/20 text-foreground/70 font-extrabold uppercase tracking-wider">
                <th className="py-4 px-6 text-center w-12">#</th>
                <th className="py-4 px-6">Patient Name</th>
                <th className="py-4 px-6">Phone</th>
                <th className="py-4 px-6">Service</th>
                <th className="py-4 px-6">Date & Time</th>
                <th className="py-4 px-6 text-center w-28">Status</th>
                <th className="py-4 px-6 text-center w-36">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-500/5 font-medium">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-foreground/45">
                    No matching clinical appointment records found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appt, idx) => {
                  const serviceMatch = MOCK_SERVICES.find(s => s.id === appt.service_id);
                  const clinicianMatch = MOCK_CLINICIANS.find(c => c.id === appt.clinician_id);

                  return (
                    <tr key={appt.id} className="hover:bg-slate-50/40 dark:hover:bg-neutral-950/10 transition-colors animate-fade-in">
                      <td className="py-4 px-6 text-center text-foreground/40">{idx + 1}</td>
                      <td className="py-4 px-6 font-bold text-foreground">{appt.patient_name}</td>
                      <td className="py-4 px-6 text-foreground/60">{appt.patient_phone}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold">{serviceMatch?.name}</span>
                          <span className="text-4xs text-foreground/50">Dr. {clinicianMatch?.first_name} {clinicianMatch?.last_name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-0.5 text-foreground/80">
                          <span className="font-bold">{appt.appointment_date}</span>
                          <span className="text-4xs text-brand-500 font-extrabold">{appt.start_time}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`text-4xs font-extrabold uppercase px-2 py-1 rounded-md inline-block tracking-wider ${appt.status === 'confirmed'
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : appt.status === 'pending'
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : appt.status === 'completed'
                                ? "bg-brand-500/10 text-brand-500"
                                : "bg-red-500/10 text-red-500"
                          }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">

                          {/* Confirm / Approve Action */}
                          {appt.status === 'pending' && (
                            <button
                              onClick={() => handleStatusChange(appt.id, 'confirmed')}
                              title="Confirm Session"
                              className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 active:scale-90 transition-all cursor-pointer shadow"
                            >
                              <Check className="h-4 w-4 stroke-[3]" />
                            </button>
                          )}

                          {/* Complete Action */}
                          {appt.status === 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(appt.id, 'completed')}
                              title="Mark Complete"
                              className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 text-white hover:bg-brand-600 active:scale-90 transition-all cursor-pointer shadow"
                            >
                              <Check className="h-4 w-4 stroke-[3]" />
                            </button>
                          )}

                          {/* Cancel Action */}
                          {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                            <button
                              onClick={() => handleStatusChange(appt.id, 'cancelled')}
                              title="Cancel Session"
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-500/20 bg-red-50/10 text-red-500 hover:bg-red-500/20 active:scale-90 transition-all cursor-pointer"
                            >
                              <X className="h-4 w-4 stroke-[3]" />
                            </button>
                          )}

                          {/* Reopen Action */}
                          {appt.status === 'cancelled' && (
                            <button
                              onClick={() => handleStatusChange(appt.id, 'pending')}
                              title="Re-open Pending"
                              className="px-2.5 py-1 rounded-lg border border-brand-500/20 bg-brand-50/5 text-4xs font-bold text-foreground/75 hover:bg-brand-500/5 active:scale-95 transition-all cursor-pointer"
                            >
                              Re-open
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Control (Reference Layout) */}
        <div className="px-6 py-4 border-t border-brand-500/5 bg-slate-50/20 dark:bg-neutral-950/10 flex items-center justify-between">
          <span className="text-4xs text-foreground/50 font-bold">Showing {filteredAppointments.length} of {appointments.length} entries</span>
          <div className="flex items-center gap-1.5 text-4xs font-bold">
            <button className="px-2.5 py-1.5 rounded-lg border border-brand-500/10 bg-background text-foreground/45 hover:bg-brand-505/5 cursor-not-allowed">Previous</button>
            <button className="h-7 w-7 rounded-lg bg-brand-500 text-white flex items-center justify-center shadow">1</button>
            <button className="h-7 w-7 rounded-lg border border-brand-500/10 bg-background text-foreground/80 hover:bg-brand-500/5 flex items-center justify-center">2</button>
            <button className="h-7 w-7 rounded-lg border border-brand-500/10 bg-background text-foreground/80 hover:bg-brand-500/5 flex items-center justify-center">3</button>
            <span className="text-foreground/30 px-1">...</span>
            <button className="h-7 w-7 rounded-lg border border-brand-500/10 bg-background text-foreground/80 hover:bg-brand-500/5 flex items-center justify-center">10</button>
            <button className="px-2.5 py-1.5 rounded-lg border border-brand-500/10 bg-background text-foreground/80 hover:bg-brand-500/5">Next</button>
          </div>
        </div>

      </div>

    </div>
  );
}
