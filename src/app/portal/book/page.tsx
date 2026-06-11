// d:\Physo\physiocare-plus\src\app\portal\book/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import Container from "@/components/layout/Container";
import Button from "@/components/common/Button";
import {
  MOCK_SERVICES,
  MOCK_CLINICIANS,
  saveAppointment,
  Service,
  Clinician
} from "@/features/appointments/booking-store";
import {
  Activity,
  User,
  Calendar,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Clock,
  MapPin,
  Phone,
  Award,
  Check,
  ShieldCheck,
  CalendarCheck,
  Stethoscope
} from "lucide-react";

// Official WhatsApp brand SVG icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-xs text-foreground/50 bg-brand-50/10">
        Loading onboarding booking wizard...
      </div>
    }>
      <BookingWizardContent />
    </Suspense>
  );
}

function BookingWizardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Wizard Steps
  const [step, setStep] = useState(1);
  const stepsList = [
    { num: 1, name: "Modality", icon: Activity },
    { num: 2, name: "Specialist", icon: User },
    { num: 3, name: "Schedule", icon: Calendar },
    { num: 4, name: "Intake", icon: FileText },
    { num: 5, name: "Confirm", icon: CheckCircle2 }
  ];

  // Wizard Selections State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedClinician, setSelectedClinician] = useState<Clinician | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [isHomeVisit, setIsHomeVisit] = useState(false);
  const [homeAddress, setHomeAddress] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const [bookingFinished, setBookingFinished] = useState(false);
  const [finishedId, setFinishedId] = useState("");

  // Handle URL Pre-selection
  useEffect(() => {
    const serviceSlug = searchParams.get("service");
    if (serviceSlug) {
      const match = MOCK_SERVICES.find(s => s.slug === serviceSlug);
      if (match) {
        setSelectedService(match);
        setIsHomeVisit(match.is_home_service);
      }
    }
  }, [searchParams]);

  // Handle Step validations
  const canGoNext = () => {
    if (step === 1) return selectedService !== null;
    if (step === 2) return selectedClinician !== null;
    if (step === 3) return selectedDate !== "" && selectedTime !== "";
    if (step === 4) {
      const basicCheck = patientName.trim() !== "" && patientPhone.trim() !== "" && symptoms.trim().length >= 10;
      if (isHomeVisit) {
        return basicCheck && homeAddress.trim() !== "";
      }
      return basicCheck;
    }
    return true;
  };

  const handleNext = () => {
    if (canGoNext() && step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Submit Booking transaction
  const handleConfirmBooking = () => {
    if (!selectedService || !selectedClinician) return;

    const newAppt = saveAppointment({
      patient_id: "pat-guest",
      patient_name: patientName,
      patient_phone: patientPhone,
      service_id: selectedService.id,
      clinician_id: selectedClinician.id,
      appointment_date: selectedDate,
      start_time: selectedTime,
      status: "pending",
      is_home_visit: isHomeVisit,
      home_address: isHomeVisit ? homeAddress : undefined,
      symptoms: symptoms
    });

    setFinishedId(newAppt.id);
    setBookingFinished(true);
  };

  // Filter available timeslots based on day of week
  const getAvailableSlots = () => {
    if (!selectedClinician || !selectedDate) return [];
    const dateObj = new Date(selectedDate);
    const dayOfWeek = dateObj.getDay();
    return selectedClinician.availability[dayOfWeek] || [];
  };

  return (
    <>
      <Header />

      <main className="flex-grow py-12 md:py-16 bg-slate-50/50 dark:bg-neutral-950/20">
        <Container>

          {/* Breadcrumbs & Header Casing */}
          <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Book Appointment</h1>
            <div className="flex items-center gap-1.5 text-xs text-foreground/45 justify-center md:justify-start font-bold">
              <Link href="/" className="hover:text-brand-500">Home</Link>
              <span>&gt;</span>
              <span className="text-brand-500">Book Appointment</span>
            </div>
          </div>

          {/* Core Split Screen Layout (Reference Design) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">

            {/* ================= LEFT COLUMN: THE WIZARD FORM (8 cols) ================= */}
            <div className="lg:col-span-8 flex flex-col gap-6">

              {bookingFinished ? (
                <div className="glass-card rounded-2xl p-8 md:p-12 text-center border border-emerald-500/20 shadow-2xl animate-fade-in flex flex-col items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 animate-bounce">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>

                  <div className="flex flex-col gap-2 max-w-md">
                    <h2 className="text-2xl font-bold text-foreground">Appointment Scheduled!</h2>
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      Your physiotherapy consultation has been successfully locked. A care coordinator will review symptoms and verify details shortly.
                    </p>
                  </div>

                  <div className="w-full max-w-sm rounded-xl bg-brand-50/50 dark:bg-neutral-900/50 p-6 border border-brand-500/5 text-left flex flex-col gap-3.5 text-xs">
                    <div className="flex justify-between font-bold pb-2 border-b border-brand-500/10">
                      <span>Booking Reference:</span>
                      <span className="text-brand-500 uppercase">{finishedId.substring(0, 10)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service selected:</span>
                      <span className="font-semibold">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Physiotherapist:</span>
                      <span className="font-semibold">Dr. {selectedClinician?.first_name} {selectedClinician?.last_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span className="font-semibold text-brand-500">{selectedDate} at {selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Environment:</span>
                      <span className="font-semibold">{isHomeVisit ? "🚗 Home Dispatch" : "🏥 In-Clinic Clinic"}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 w-full justify-center mt-2">
                    <button
                      onClick={() => {
                        setBookingFinished(false);
                        setStep(1);
                        setSelectedService(null);
                        setSelectedClinician(null);
                        setSelectedDate("");
                        setSelectedTime("");
                        setPatientName("");
                        setPatientPhone("");
                        setIsHomeVisit(false);
                        setHomeAddress("");
                        setSymptoms("");
                      }}
                      className="rounded-xl border border-brand-500/20 bg-background px-5 py-2.5 text-xs font-bold text-foreground/80 hover:bg-brand-500/5 transition-all duration-200 cursor-pointer"
                    >
                      Schedule Another
                    </button>
                    <button
                      onClick={() => router.push("/admin")}
                      className="rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-500/10 hover:bg-brand-600 transition-all duration-200 cursor-pointer"
                    >
                      View in Admin
                    </button>
                  </div>
                </div>
              ) : (

                <div className="glass-card overflow-hidden flex flex-col border border-brand-500/10 shadow-lg">

                  {/* Step indicators */}
                  <div className="bg-brand-50/40 dark:bg-neutral-900/30 px-6 py-4 border-b border-brand-500/10 flex justify-between gap-4">
                    {stepsList.map((s) => {
                      const Icon = s.icon;
                      const isCurrent = step === s.num;
                      const isPast = step > s.num;
                      return (
                        <div
                          key={s.num}
                          className={`flex items-center gap-2 transition-all duration-300 ${isCurrent
                              ? "text-brand-500 font-bold"
                              : isPast
                                ? "text-emerald-500"
                                : "text-foreground/45"
                            }`}
                        >
                          <div className={`flex h-7 w-7 items-center justify-center rounded-lg border text-2xs font-bold ${isCurrent
                              ? "border-brand-500 bg-brand-500 text-white shadow"
                              : isPast
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : "border-foreground/20"
                            }`}>
                            {s.num}
                          </div>
                          <span className="text-3xs font-bold uppercase tracking-wider hidden sm:inline">{s.name}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Form fields body */}
                  <div className="p-6 md:p-8 flex-grow min-h-96 flex flex-col justify-between">

                    {/* STEP 1: SERVICE */}
                    {step === 1 && (
                      <div className="animate-fade-in flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-base font-bold text-foreground">Choose Treatment</h3>
                          <p className="text-4xs text-foreground/60">Select the therapeutic modality matching your pain triggers.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {MOCK_SERVICES.map((s) => {
                            const isSelected = selectedService?.id === s.id;
                            return (
                              <button
                                key={s.id}
                                onClick={() => {
                                  setSelectedService(s);
                                  setIsHomeVisit(s.is_home_service);
                                }}
                                className={`glass-card p-4 text-left border flex flex-col justify-between gap-4 transition-all duration-300 cursor-pointer ${isSelected
                                    ? "!border-brand-500 !bg-brand-50 dark:!bg-brand-900/40 ring-2 ring-brand-500 shadow-md scale-[1.02]"
                                    : "border-brand-500/10 hover:border-brand-500/40 hover:-translate-y-0.5"
                                  }`}
                              >
                                <div className="flex flex-col gap-1.5">
                                  <span className="font-bold text-xs text-foreground">{s.name}</span>
                                  <p className="text-4xs text-foreground/75 leading-relaxed line-clamp-2">{s.description}</p>
                                </div>
                                <div className="flex items-center justify-between border-t border-brand-500/10 pt-3 text-4xs">
                                  <span className="inline-flex items-center gap-1 font-semibold text-brand-500">
                                    <Clock className="h-3 w-3" />
                                    <span>{s.duration_minutes} mins</span>
                                  </span>
                                  <span className="font-extrabold text-foreground">${s.price.toFixed(2)}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: CLINICIAN */}
                    {step === 2 && (
                      <div className="animate-fade-in flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-base font-bold text-foreground">Select Physiotherapist</h3>
                          <p className="text-4xs text-foreground/60">Select the rehabilitation specialist to manage your EMR.</p>
                        </div>
                        <div className="flex flex-col gap-4">
                          {MOCK_CLINICIANS.map((c) => {
                            const isSelected = selectedClinician?.id === c.id;
                            return (
                              <button
                                key={c.id}
                                onClick={() => setSelectedClinician(c)}
                                className={`glass-card p-4 border text-left flex gap-4 transition-all duration-300 cursor-pointer ${isSelected
                                    ? "!border-brand-500 !bg-brand-50 dark:!bg-brand-900/40 ring-2 ring-brand-500 shadow-md scale-[1.02]"
                                    : "border-brand-500/10 hover:border-brand-500/40 hover:-translate-y-0.5"
                                  }`}
                              >
                                <img
                                  src={c.avatar_url}
                                  alt={c.first_name}
                                  className="h-14 w-14 rounded-xl object-cover"
                                />
                                <div className="flex-1 flex flex-col gap-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-xs text-foreground">Dr. {c.first_name} {c.last_name}</span>
                                    <span className="text-4xs font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">{c.rating} ★</span>
                                  </div>
                                  <span className="text-3xs text-brand-500 font-semibold">{c.specialties.join(" • ")}</span>
                                  <p className="text-4xs text-foreground/70 leading-relaxed line-clamp-2 mt-0.5">{c.bio}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: SCHEDULE */}
                    {step === 3 && (
                      <div className="animate-fade-in flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-base font-bold text-foreground">Schedule Date & Time</h3>
                          <p className="text-4xs text-foreground/60">Pick an active calendar day and consultation slot.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-3xs font-bold text-foreground/80">Choose Date</label>
                            <input
                              type="date"
                              value={selectedDate}
                              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                              onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setSelectedTime("");
                              }}
                              className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3.5 text-xs outline-none focus:border-brand-500"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-3xs font-bold text-foreground/80">Available Time Slots</label>
                            {!selectedDate ? (
                              <div className="flex h-32 items-center justify-center rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-dashed border-brand-500/10 text-3xs text-foreground/50">
                                Please select a date to view available time slots.
                              </div>
                            ) : getAvailableSlots().length === 0 ? (
                              <div className="flex h-32 items-center justify-center rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-dashed border-brand-500/10 text-3xs text-foreground/50">
                                No available slots. Select another date.
                              </div>
                            ) : (
                              <div className="grid grid-cols-3 gap-2">
                                {getAvailableSlots().map((slot) => (
                                  <button
                                    key={slot}
                                    onClick={() => setSelectedTime(slot)}
                                    className={`py-2 px-3 rounded-lg border text-center text-xs font-bold transition-all duration-200 cursor-pointer ${selectedTime === slot
                                        ? "bg-brand-500 border-brand-500 text-white shadow"
                                        : "border-brand-500/15 text-foreground/80 hover:bg-brand-500/5"
                                      }`}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: PATIENT DETAILS (REFERENCE APPOINTMENT FORM DESIGN) */}
                    {step === 4 && (
                      <div className="animate-fade-in flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-base font-bold text-foreground">Patient Information</h3>
                          <p className="text-4xs text-foreground/60">Fill in details matching the required clinic registers.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-3xs font-bold text-foreground/80">Full Name</label>
                            <input
                              type="text"
                              placeholder="Enter your full name"
                              value={patientName}
                              onChange={(e) => setPatientName(e.target.value)}
                              className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 text-xs outline-none focus:border-brand-500"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-3xs font-bold text-foreground/80">Phone Number</label>
                            <input
                              type="tel"
                              placeholder="Enter your phone number"
                              value={patientPhone}
                              onChange={(e) => setPatientPhone(e.target.value)}
                              className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 text-xs outline-none focus:border-brand-500"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-3xs font-bold text-foreground/80">Email Address (Optional)</label>
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                            className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 text-xs outline-none focus:border-brand-500"
                          />
                        </div>

                        {selectedService?.is_home_service && (
                          <div className="flex flex-col gap-4 bg-brand-50/20 dark:bg-neutral-900/30 p-4 rounded-xl border border-brand-500/5">
                            <label className="flex items-center gap-3 cursor-pointer text-xs font-bold">
                              <input
                                type="checkbox"
                                checked={isHomeVisit}
                                onChange={(e) => setIsHomeVisit(e.target.checked)}
                                className="h-4.5 w-4.5 rounded border-brand-500/20 text-brand-500 focus:ring-brand-500"
                              />
                              <span>Request home visitation treatment (in-home dispatch)</span>
                            </label>
                            {isHomeVisit && (
                              <div className="flex flex-col gap-1.5 animate-fade-in">
                                <label className="text-3xs font-bold text-foreground/80">Home Address</label>
                                <textarea
                                  placeholder="Enter complete dispatch address details..."
                                  value={homeAddress}
                                  onChange={(e) => setHomeAddress(e.target.value)}
                                  rows={2}
                                  className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 text-xs outline-none focus:border-brand-500"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                          <label className="text-3xs font-bold text-foreground/80">Symptoms & Messages (Optional)</label>
                          <textarea
                            placeholder="Write your message / describe symptoms..."
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            rows={3}
                            className="w-full rounded-xl border border-brand-500/20 bg-background/50 p-3 text-xs outline-none focus:border-brand-500"
                          />
                          <span className="text-4xs text-foreground/45 text-right">{symptoms.length}/10 min characters</span>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: INVOICE / CONFIRM */}
                    {step === 5 && (
                      <div className="animate-fade-in flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-base font-bold text-foreground">Confirm Session Intake</h3>
                          <p className="text-4xs text-foreground/70">Verify booking invoice details before final scheduling.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div className="flex flex-col gap-4 bg-brand-50/10 dark:bg-neutral-900/10 p-5 rounded-2xl border border-brand-500/5">
                            <div className="flex items-center gap-3 pb-3 border-b border-brand-500/10">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
                                <CheckCircle2 className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-foreground">{patientName}</h4>
                                <p className="text-3xs text-foreground/60">{patientPhone}</p>
                              </div>
                            </div>
                            <ul className="flex flex-col gap-3 text-xs">
                              <li className="flex justify-between">
                                <span className="text-foreground/60">Selected Modality:</span>
                                <span className="font-bold text-foreground">{selectedService?.name}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-foreground/60">Specialist:</span>
                                <span className="font-bold text-foreground">Dr. {selectedClinician?.first_name} {selectedClinician?.last_name}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-foreground/60">Date & Time:</span>
                                <span className="font-bold text-brand-500">{selectedDate} at {selectedTime}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-foreground/60">Modality context:</span>
                                <span className="font-bold text-foreground">{isHomeVisit ? "🚗 In-Home Dispatch" : "🏥 In-Clinic Session"}</span>
                              </li>
                            </ul>
                          </div>

                          <div className="flex flex-col justify-between gap-4 bg-background dark:bg-neutral-950 p-5 rounded-2xl border border-brand-500/20 shadow-md">
                            <div className="flex flex-col gap-2">
                              <h4 className="text-3xs font-bold uppercase tracking-wider text-brand-500">Treatment Invoice</h4>
                              <hr className="border-brand-500/10" />
                            </div>
                            <div className="flex flex-col gap-2.5 text-xs">
                              <div className="flex justify-between">
                                <span>Base consultation fee:</span>
                                <span className="font-bold">${selectedService?.price.toFixed(2)}</span>
                              </div>
                              {isHomeVisit && (
                                <div className="flex justify-between">
                                  <span>Dynamic transit fee:</span>
                                  <span className="font-bold text-emerald-500">$20.00</span>
                                </div>
                              )}
                              <hr className="border-brand-500/5 my-1" />
                              <div className="flex justify-between text-sm font-bold">
                                <span>Aggregate Total Due:</span>
                                <span className="text-brand-500">${((selectedService?.price || 0) + (isHomeVisit ? 20.00 : 0)).toFixed(2)}</span>
                              </div>
                            </div>
                            <button
                              onClick={handleConfirmBooking}
                              className="w-full rounded-xl bg-brand-500 py-3 text-center text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600 transition-all duration-200 mt-2 cursor-pointer"
                            >
                              Confirm & Schedule consultation
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Footer buttons */}
                  <div className="bg-brand-50/30 dark:bg-neutral-900/20 px-6 py-4 border-t border-brand-500/10 flex justify-between items-center shrink-0">
                    <button
                      onClick={handlePrev}
                      disabled={step === 1}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${step === 1
                          ? "text-foreground/30 border border-transparent cursor-not-allowed"
                          : "border border-brand-500/20 text-foreground/80 hover:bg-brand-500/5"
                        }`}
                    >
                      <ChevronLeft className="h-4.5 w-4.5" />
                      <span>Back</span>
                    </button>
                    {step < 5 ? (
                      <button
                        onClick={handleNext}
                        disabled={!canGoNext()}
                        className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${canGoNext()
                            ? "bg-brand-500 text-white shadow-md hover:bg-brand-600 hover:translate-x-0.5"
                            : "bg-foreground/10 text-foreground/45 cursor-not-allowed"
                          }`}
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4.5 w-4.5" />
                      </button>
                    ) : (
                      <span className="text-3xs text-brand-500 font-extrabold uppercase tracking-wider">Confirm details step</span>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* ================= RIGHT COLUMN: WHY CHOOSE US & NEED HELP (4 cols) ================= */}
            <div className="lg:col-span-4 flex flex-col gap-6">

              {/* "Why Choose Us?" Solid Deep Blue Card from Reference */}
              <div className="rounded-2xl bg-brand-900 text-white p-6 shadow-xl border border-brand-500/10 flex flex-col gap-5">
                <h3 className="text-sm font-extrabold tracking-tight pb-3 border-b border-white/10 uppercase tracking-widest text-brand-100">Why Choose Us?</h3>

                <ul className="flex flex-col gap-3.5 text-xs text-brand-50/90 font-medium">
                  {[
                    "Experienced & Certified Therapists",
                    "Personalized Treatment Plans",
                    "Advanced Physiotherapy Techniques",
                    "One-on-One Patient Care",
                    "Proven Results"
                  ].map((value, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/10 text-white">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* "Need Help?" green WhatsApp Box from Reference */}
              <div className="glass-card p-6 border border-emerald-500/20 shadow-xl flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-bold text-foreground">Need Help?</h4>
                  <p className="text-3xs text-foreground/60 leading-relaxed font-semibold">Call us or chat with our desk coordinators instantly.</p>
                </div>

                <a
                  href="tel:+18005550199"
                  className="flex items-center gap-2 text-sm font-extrabold text-brand-500 hover:underline"
                >
                  <Phone className="h-4.5 w-4.5" />
                  <span>+1 (800) 555-0199</span>
                </a>

                <a
                  href="https://wa.me/18005550199?text=Hello%20PhysioCare%20Plus%2C%20I%20need%20assistance%20scheduling%20an%20appointment!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-white text-center font-bold text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-all duration-200 active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

          {/* Bottom Info Bar: Quick features (Quick Response, Easy Scheduling, Professional Care) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-16 border-t border-brand-500/10 pt-8 text-center sm:text-left">
            {[
              { title: "Quick Response", desc: "We will confirm your appointment shortly.", icon: CalendarCheck },
              { title: "Easy Scheduling", desc: "Choose your convenient date and time.", icon: Clock },
              { title: "Professional Care", desc: "We are here to help you recover faster.", icon: Stethoscope }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex flex-col sm:flex-row items-center gap-3 text-xs">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/10 shadow-sm mb-2 sm:mb-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-bold text-foreground">{f.title}</h4>
                    <p className="text-4xs text-foreground/60 leading-none">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </Container>
      </main>

      <Footer />
    </>
  );
}
