"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import Container from "@/components/layout/Container";
import Button from "@/components/common/Button";
import { useAuth } from "@/app/context/AuthContext";
import {
  getStoredAppointments,
  updateAppointmentStatus,
  Appointment,
  MOCK_SERVICES,
  MOCK_CLINICIANS
} from "@/features/appointments/booking-store";
import {
  Calendar,
  Clock,
  User,
  Plus,
  Activity,
  MapPin,
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
  CalendarDays,
  LogOut,
  Stethoscope,
  Car
} from "lucide-react";

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    refreshAppointments();
  }, [user]);

  const refreshAppointments = () => {
    if (!user) return;
    const allAppts = getStoredAppointments();
    
    // Filter appointments belonging to this logged-in patient.
    // Match by registered phone, email, or user.id
    const filtered = allAppts.filter(appt => {
      const matchPhone = user.phone && appt.patient_phone.replace(/\s+/g, "") === user.phone.replace(/\s+/g, "");
      const matchId = user.id && appt.patient_id === user.id;
      const matchName = user.name && appt.patient_name.toLowerCase().trim() === user.name.toLowerCase().trim();
      return matchPhone || matchId || matchName;
    });

    // Sort by date descending
    filtered.sort((a, b) => new Date(b.appointment_date + "T" + b.start_time).getTime() - new Date(a.appointment_date + "T" + a.start_time).getTime());

    setAppointments(filtered);
  };

  const handleCancelAppointment = (apptId: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      updateAppointmentStatus(apptId, "cancelled");
      refreshAppointments();
    }
  };

  // Stats Calculations
  const activeAppts = appointments.filter(a => a.status === "confirmed" || a.status === "pending");
  const homeVisits = appointments.filter(a => a.is_home_visit).length;
  const completedCount = appointments.filter(a => a.status === "completed").length;

  const getStatusStyle = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20";
    }
  };

  return (
    <>
      <Header />

      <main className="flex-grow py-12 md:py-16 bg-slate-50/50 dark:bg-neutral-950/20">
        <Container>
          
          {/* Welcome Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-brand-500/10 pb-6 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-3xs font-extrabold text-brand-500 uppercase tracking-widest">Patient Workspace</span>
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                Hello, {user?.name || "Patient"}
              </h1>
              <p className="text-xs text-foreground/50 font-medium">
                {user?.email} • {user?.phone}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/portal/book">
                <Button variant="primary" size="sm" icon={<Plus className="h-4 w-4" />}>
                  Schedule New Treatment
                </Button>
              </Link>
              <button
                onClick={logout}
                className="rounded-xl border border-rose-500/25 px-4 py-2 text-xs font-bold text-rose-500 bg-rose-500/5 hover:bg-rose-500/10 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
            <div className="glass-card p-5 border border-brand-500/5 shadow flex flex-col gap-2">
              <span className="text-3xs font-extrabold text-foreground/50 uppercase tracking-wider">Upcoming Treatments</span>
              <span className="text-2xl font-extrabold tracking-tight text-foreground">{activeAppts.length}</span>
              <span className="text-4xs text-foreground/45 leading-none">Pending coordination or confirmed</span>
            </div>
            <div className="glass-card p-5 border border-brand-500/5 shadow flex flex-col gap-2">
              <span className="text-3xs font-extrabold text-foreground/50 uppercase tracking-wider">Home Visits Dispatch</span>
              <span className="text-2xl font-extrabold tracking-tight text-brand-500">{homeVisits}</span>
              <span className="text-4xs text-foreground/45 leading-none">Visits at your home address</span>
            </div>
            <div className="glass-card p-5 border border-brand-500/5 shadow flex flex-col gap-2">
              <span className="text-3xs font-extrabold text-foreground/50 uppercase tracking-wider">Completed Sessions</span>
              <span className="text-2xl font-extrabold tracking-tight text-emerald-500">{completedCount}</span>
              <span className="text-4xs text-foreground/45 leading-none">Sessions attended and signed off</span>
            </div>
          </div>

          {/* Quick Portal Actions */}
          <div className="mb-8">
            <h3 className="text-3xs font-extrabold text-foreground/55 uppercase tracking-wider mb-3.5">Quick Portal Actions</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Link href="/portal/book" className="glass-card p-4 border border-brand-500/5 hover:border-brand-500/15 hover:shadow-md transition-all flex items-center gap-3 bg-white dark:bg-neutral-900 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 shrink-0">
                  <Stethoscope className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-3xs font-bold text-foreground group-hover:text-brand-500 transition-colors">Book Appt</span>
                  <span className="text-[9px] text-foreground/45">In-clinic schedule</span>
                </div>
              </Link>
              
              <Link href="/portal/visits" className="glass-card p-4 border border-brand-500/5 hover:border-brand-500/15 hover:shadow-md transition-all flex items-center gap-3 bg-white dark:bg-neutral-900 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                  <Car className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-3xs font-bold text-foreground group-hover:text-brand-500 transition-colors">Request Dispatch</span>
                  <span className="text-[9px] text-foreground/45">Home visit care</span>
                </div>
              </Link>

              <Link href="/portal/records" className="glass-card p-4 border border-brand-500/5 hover:border-brand-500/15 hover:shadow-md transition-all flex items-center gap-3 bg-white dark:bg-neutral-900 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-3xs font-bold text-foreground group-hover:text-brand-500 transition-colors">SOAP & EMR</span>
                  <span className="text-[9px] text-foreground/45">Diagnostic history</span>
                </div>
              </Link>

              <Link href="/portal/records" className="glass-card p-4 border border-brand-500/5 hover:border-brand-500/15 hover:shadow-md transition-all flex items-center gap-3 bg-white dark:bg-neutral-900 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 text-accent-500 shrink-0">
                  <Activity className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-3xs font-bold text-foreground group-hover:text-brand-500 transition-colors">HEP Stretch</span>
                  <span className="text-[9px] text-foreground/45">Daily workouts</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Column: Scheduled Appointments (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="glass-card p-6 border border-brand-500/5 shadow">
                <h3 className="text-sm font-extrabold text-foreground mb-4 uppercase tracking-wider pb-2 border-b border-brand-500/10">
                  My Appointment History
                </h3>

                {appointments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center gap-4 border border-dashed border-brand-500/10 rounded-2xl bg-brand-50/5">
                    <CalendarDays className="h-10 w-10 text-brand-500/30" />
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-foreground">No sessions scheduled yet</span>
                      <span className="text-4xs text-foreground/50 font-medium">Book a therapy plan to list details here.</span>
                    </div>
                    <Link href="/portal/book" className="mt-2">
                      <Button variant="secondary" size="sm">
                        Book Your First Consultation
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
                    {appointments.map((appt) => {
                      const service = MOCK_SERVICES.find((s) => s.id === appt.service_id);
                      const clinician = MOCK_CLINICIANS.find((c) => c.id === appt.clinician_id);
                      const isUpcoming = appt.status === "pending" || appt.status === "confirmed";

                      return (
                        <div
                          key={appt.id}
                          className="p-4 rounded-xl bg-brand-50/20 dark:bg-neutral-900/30 border border-brand-500/5 hover:border-brand-500/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex gap-3.5 items-start">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/10">
                              <Stethoscope className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col gap-1 min-w-0">
                              <span className="text-xs font-bold text-foreground leading-tight truncate">
                                {service?.name || "Physiotherapy Treatment"}
                              </span>
                              <span className="text-4xs text-foreground/60 font-semibold truncate leading-none">
                                Therapist: Dr. {clinician?.first_name} {clinician?.last_name}
                              </span>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-4xs font-bold text-foreground/50">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-brand-500" />
                                  <span>{appt.appointment_date}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-brand-500" />
                                  <span>{appt.start_time}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-brand-500" />
                                  <span>{appt.is_home_visit ? "🚗 Home Visit" : "🏥 In-Clinic"}</span>
                                </span>
                              </div>
                              {appt.is_home_visit && appt.home_address && (
                                <p className="text-[10px] text-foreground/45 italic leading-tight mt-1 border-l-2 border-brand-500/20 pl-2">
                                  Dispatch: {appt.home_address}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-4xs font-bold uppercase tracking-wider ${getStatusStyle(appt.status)}`}>
                              {appt.status}
                            </span>
                            
                            {isUpcoming && (
                              <button
                                onClick={() => handleCancelAppointment(appt.id)}
                                className="text-4xs text-rose-500 hover:text-rose-600 hover:underline font-bold flex items-center gap-0.5 cursor-pointer mt-1"
                              >
                                <XCircle className="h-3 w-3" />
                                <span>Cancel Session</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Support & Medical Records (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* EMR Information Card */}
              <div className="glass-card p-5 border border-brand-500/5 shadow flex flex-col gap-4">
                <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider pb-2 border-b border-brand-500/10 flex items-center gap-1.5">
                  <FileText className="h-4.5 w-4.5 text-brand-500" />
                  <span>EMR & Health Records</span>
                </h3>
                <p className="text-4xs text-foreground/60 leading-normal font-semibold">
                  Access digital summaries of past diagnostics, home workout targets, and clinical metrics.
                </p>
                
                <div className="flex flex-col gap-3">
                  {[
                    { title: "Lumbar Joint Diagnosis", date: "May 20, 2026", type: "PDF Report" },
                    { title: "Cervical Stretch Plan", date: "May 12, 2026", type: "Home Video Guideline" }
                  ].map((doc, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-brand-500/5 bg-brand-50/5 hover:bg-brand-50/10 flex items-center justify-between gap-2 text-xs">
                      <div className="flex flex-col">
                        <span className="text-4xs font-bold text-foreground">{doc.title}</span>
                        <span className="text-[9px] text-foreground/45">{doc.date}</span>
                      </div>
                      <span className="text-4xs font-bold text-brand-500 bg-brand-500/10 px-1.5 py-0.5 rounded truncate">
                        {doc.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Assistance Clinic Card */}
              <div className="glass-card p-5 border border-emerald-500/20 shadow flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-bold text-foreground">Need Assistance?</h4>
                  <p className="text-3xs text-foreground/60 leading-relaxed font-semibold">
                    Contact our coordinate desk for clinical adjustments or billing inquiries.
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 font-bold text-xs text-foreground">
                  <span>Help Desk: +1 (800) 555-0199</span>
                  <span>WhatsApp: Support Line Online</span>
                </div>
                
                <a
                  href="https://wa.me/18005550199?text=Hello%20PhysioCare%20Plus%2C%20I%20have%20a%20question%20regarding%20my%20treatment%20plan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-white text-center font-bold text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all duration-200 active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Connect with Coordinator</span>
                </a>
              </div>

            </div>

          </div>

        </Container>
      </main>

      <Footer />
    </>
  );
}
