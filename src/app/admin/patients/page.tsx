// d:\Physo\physiocare-plus\src\app\admin\patients\page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  getStoredAppointments,
  Appointment,
  MOCK_SERVICES,
  MOCK_CLINICIANS
} from "@/features/appointments/booking-store";
import {
  Search,
  User,
  Activity,
  Clock,
  Phone,
  FileText,
  Check,
  Calendar,
  AlertTriangle,
  Plus,
  Trash2
} from "lucide-react";

interface PainPin {
  id: string;
  x: number;
  y: number;
  label: string;
  intensity: number;
}

export default function AdminPatientsDirectory() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientName, setSelectedPatientName] = useState<string | null>(null);

  // Anatomical Pain Pin Map State
  const [pins, setPins] = useState<{ [patientName: string]: PainPin[] }>({
    "John Doe": [
      { id: "pin-1", x: 48, y: 72, label: "Lower back paraspinal muscle strain", intensity: 7 },
      { id: "pin-2", x: 52, y: 35, label: "Right rhomboid trigger point knot", intensity: 5 }
    ],
    "Alice Hill": [
      { id: "pin-3", x: 42, y: 82, label: "Left patellofemoral tracking syndrome", intensity: 8 }
    ]
  });

  const [newPinLabel, setNewPinLabel] = useState("");
  const [newPinIntensity, setNewPinIntensity] = useState(5);
  const [activeClickCoords, setActiveClickCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const list = getStoredAppointments();
    setAppointments(list);
    // Auto-select first patient if available
    const names = Array.from(new Set(list.map(a => a.patient_name)));
    if (names.length > 0) {
      setSelectedPatientName(names[0]);
    }
  }, []);

  // Fuzzy filter patients names
  const patientNames = Array.from(new Set(appointments.map(a => a.patient_name)))
    .filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Active patient EMR aggregates
  const patientAppointments = appointments.filter(a => a.patient_name === selectedPatientName);

  // Custom click trigger on the anatomical body SVG
  const handleBodyClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate click coordinates as percentages for fluid responsiveness
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    setActiveClickCoords({ x, y });
    setNewPinLabel("");
  };

  const handleAddPin = () => {
    if (!selectedPatientName || !activeClickCoords || !newPinLabel.trim()) return;

    const newPin: PainPin = {
      id: `pin-${Date.now()}`,
      x: activeClickCoords.x,
      y: activeClickCoords.y,
      label: newPinLabel,
      intensity: newPinIntensity
    };

    const currentPins = pins[selectedPatientName] || [];
    setPins({
      ...pins,
      [selectedPatientName]: [...currentPins, newPin]
    });

    setActiveClickCoords(null);
    setNewPinLabel("");
  };

  const handleDeletePin = (pinId: string) => {
    if (!selectedPatientName) return;
    const currentPins = pins[selectedPatientName] || [];
    setPins({
      ...pins,
      [selectedPatientName]: currentPins.filter(p => p.id !== pinId)
    });
  };

  const activePins = selectedPatientName ? pins[selectedPatientName] || [] : [];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">

      {/* Header */}
      <div className="border-b border-brand-500/5 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Patients Clinical EMR</h1>
        <p className="text-xs text-foreground/60">Review clinical history timelines, diagnostic forms, and place anatomical body pain coordinates.</p>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* ================= LEFT COLUMN: PATIENTS SEARCH DIRECTORY ================= */}
        <div className="flex flex-col gap-4">
          <div className="glass-card p-4 rounded-2xl border border-brand-500/10 shadow flex flex-col gap-4">

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-foreground/45" />
              <input
                type="text"
                placeholder="Search patient name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-brand-500/20 bg-background/50 pl-10 pr-3.5 py-2 text-xs outline-none focus:border-brand-500"
              />
            </div>

            {/* Patients Directory List */}
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
              {patientNames.length === 0 ? (
                <div className="text-xs text-foreground/45 text-center py-10">No patients registered.</div>
              ) : (
                patientNames.map((name) => {
                  const isSelected = selectedPatientName === name;
                  const phone = appointments.find(a => a.patient_name === name)?.patient_phone || "";
                  return (
                    <button
                      key={name}
                      onClick={() => {
                        setSelectedPatientName(name);
                        setActiveClickCoords(null);
                      }}
                      className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-all duration-200 cursor-pointer ${isSelected
                          ? "border-brand-500 bg-brand-500/5 shadow"
                          : "border-brand-500/10 hover:bg-brand-500/5"
                        }`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 shrink-0">
                        <User className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-foreground">{name}</span>
                        <span className="text-4xs text-foreground/60">{phone}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

          </div>
        </div>

        {/* ================= RIGHT COLUMNS: ACTIVE PATIENT EMR TIMELINE & PAIN MAP ================= */}
        {selectedPatientName ? (
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Patient overview banner */}
            <div className="glass-card p-5 rounded-2xl border border-brand-500/10 shadow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-brand-50/10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white shadow shadow-brand-500/10">
                  <User className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-lg font-bold text-foreground">{selectedPatientName}</h2>
                  <span className="text-3xs text-foreground/60">Blood Group: <span className="font-semibold text-foreground">O+</span> | Allergies: <span className="font-semibold text-red-500">Sulfa drugs</span></span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-brand-500/5 pt-3 sm:border-t-0 sm:pt-0 text-3xs text-foreground/60">
                <div className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-brand-500" />
                  <span>{appointments.find(a => a.patient_name === selectedPatientName)?.patient_phone}</span>
                </div>
              </div>
            </div>

            {/* Split Section: Anatomical Body Map vs Session History */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* 1. Anatomical SVG body pain mapper */}
              <div className="glass-card p-5 rounded-2xl border border-brand-500/10 shadow flex flex-col gap-4">
                <div className="border-b border-brand-500/5 pb-3">
                  <h3 className="text-xs font-bold text-foreground">Interactive Anatomical Pain Map</h3>
                  <p className="text-4xs text-foreground/60 mt-0.5">Tap on the muscle chart coordinates to register a glowing pain marker pin.</p>
                </div>

                {/* SVG Human Muscular Outlines Canvas */}
                <div className="relative mx-auto w-40 h-80 bg-slate-50 dark:bg-neutral-900/50 rounded-2xl border border-brand-500/5 flex items-center justify-center overflow-hidden">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full cursor-crosshair select-none"
                    onClick={handleBodyClick}
                  >
                    {/* Simplified SVG head outline */}
                    <circle cx="50" cy="12" r="7" className="fill-none stroke-foreground/20" strokeWidth="1" />

                    {/* Spine line */}
                    <line x1="50" y1="19" x2="50" y2="78" className="stroke-foreground/20" strokeWidth="1" />

                    {/* Simplified SVG upper torso */}
                    <path d="M50 19 L40 22 L35 32 L38 52 L50 55 L62 52 L65 32 L60 22 Z" className="fill-brand-500/5 stroke-foreground/20" strokeWidth="1" />

                    {/* Simplified SVG arms */}
                    <path d="M35 32 L26 50 L28 62 L32 62 L33 50 L38 42" className="fill-none stroke-foreground/20" strokeWidth="1" />
                    <path d="M65 32 L74 50 L72 62 L68 62 L67 50 L62 42" className="fill-none stroke-foreground/20" strokeWidth="1" />

                    {/* Legs */}
                    <path d="M42 55 L38 78 L35 94 L42 94 L45 78 L50 64 L55 78 L58 94 L65 94 L62 78 L58 55" className="fill-brand-500/5 stroke-foreground/20" strokeWidth="1" />

                    {/* Glowing Rendered Pins */}
                    {activePins.map((pin) => (
                      <g key={pin.id} className="group cursor-pointer">
                        <circle
                          cx={pin.x}
                          cy={pin.y}
                          r="3"
                          className="fill-red-500 stroke-white/50 animate-pulse"
                          strokeWidth="1"
                        />
                        <circle
                          cx={pin.x}
                          cy={pin.y}
                          r="6"
                          className="fill-red-500/20 stroke-none"
                        />
                      </g>
                    ))}

                    {/* Unsaved placement marker pointer */}
                    {activeClickCoords && (
                      <circle
                        cx={activeClickCoords.x}
                        cy={activeClickCoords.y}
                        r="3.5"
                        className="fill-brand-500 stroke-white animate-bounce"
                        strokeWidth="1"
                      />
                    )}
                  </svg>

                  {/* Absolute glowing layer indicator list of pain tags */}
                  {activePins.map((pin) => (
                    <div
                      key={pin.id}
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      className="absolute transform -translate-x-1/2 -translate-y-full mb-1 group bg-neutral-900 dark:bg-neutral-800 text-white text-4xs font-bold py-0.5 px-1.5 rounded opacity-50 hover:opacity-100 transition-opacity duration-200 shadow Pointer-events-none select-none pointer-events-none"
                    >
                      {pin.intensity}
                    </div>
                  ))}
                </div>

                {/* Pin placing input forms overlay */}
                {activeClickCoords && (
                  <div className="p-3.5 rounded-xl border border-brand-500/20 bg-brand-50/20 dark:bg-neutral-900/30 flex flex-col gap-3 animate-fade-in text-xs">
                    <span className="font-bold flex items-center gap-1.5 text-brand-600">
                      <Plus className="h-4 w-4" />
                      <span>Place Pain Marker at ({activeClickCoords.x}%, {activeClickCoords.y}%)</span>
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Right shoulder rotator cuff pain"
                      value={newPinLabel}
                      onChange={(e) => setNewPinLabel(e.target.value)}
                      className="w-full rounded-lg border border-brand-500/20 bg-background/50 px-2.5 py-1.5 text-xs outline-none focus:border-brand-500"
                    />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-3xs text-foreground/60 font-semibold">Intensity:</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={newPinIntensity}
                          onChange={(e) => setNewPinIntensity(Number(e.target.value))}
                          className="h-1.5 rounded bg-slate-200 dark:bg-neutral-700 outline-none w-20"
                        />
                        <span className="text-3xs font-extrabold text-red-500">{newPinIntensity}/10</span>
                      </div>
                      <button
                        onClick={handleAddPin}
                        disabled={!newPinLabel.trim()}
                        className="rounded-lg bg-brand-500 px-3 py-1.5 text-4xs font-bold text-white shadow-sm hover:bg-brand-600 cursor-pointer disabled:bg-foreground/10 disabled:cursor-not-allowed"
                      >
                        Pin Marker
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* 2. active pain markers listings table */}
              <div className="glass-card p-5 rounded-2xl border border-brand-500/10 shadow flex flex-col gap-4">
                <div className="border-b border-brand-500/5 pb-3">
                  <h3 className="text-xs font-bold text-foreground">Diagnostic Pain Log Coordinates</h3>
                </div>

                <div className="flex flex-col gap-2 max-h-76 overflow-y-auto pr-1">
                  {activePins.length === 0 ? (
                    <div className="text-4xs text-foreground/45 text-center py-10">No physical markers coordinates pinned yet. Click the outline body to place one.</div>
                  ) : (
                    activePins.map((pin) => (
                      <div
                        key={pin.id}
                        className="p-3 rounded-xl bg-brand-50/20 dark:bg-neutral-900/30 border border-brand-500/5 flex items-center justify-between gap-4 text-xs animate-fade-in hover:border-red-500/15 group transition-colors"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-foreground">{pin.label}</span>
                          <span className="text-4xs text-foreground/60">Body coordinates: X:{pin.x}% Y:{pin.y}%</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-4xs font-extrabold text-white bg-red-500 px-1.5 py-0.5 rounded shadow-sm">
                            Scale {pin.intensity}
                          </span>
                          <button
                            onClick={() => handleDeletePin(pin.id)}
                            className="text-foreground/30 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* 3. Chronological Visit History timeline */}
            <div className="glass-card p-6 rounded-2xl border border-brand-500/10 shadow flex flex-col gap-4">
              <div className="border-b border-brand-500/5 pb-3">
                <h3 className="text-xs font-bold text-foreground">Clinical Diagnostic Timeline</h3>
              </div>

              <div className="flex flex-col gap-6 pl-4 border-l border-brand-500/10 relative">
                {patientAppointments.length === 0 ? (
                  <div className="text-xs text-foreground/45 py-4">No appointments recorded for EMR timeline parsing.</div>
                ) : (
                  patientAppointments.map((appt) => {
                    const match = MOCK_SERVICES.find(s => s.id === appt.service_id);
                    return (
                      <div key={appt.id} className="relative flex flex-col gap-2 animate-fade-in pl-2">

                        {/* Timeline dot */}
                        <div className="absolute -left-6.5 top-1.5 h-3 w-3 rounded-full bg-brand-500 border-2 border-background shadow-sm"></div>

                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold text-foreground">{match?.name}</span>
                          <span className="text-4xs text-foreground/50">{appt.appointment_date} at {appt.start_time} | Status: <span className="font-bold text-brand-500 uppercase">{appt.status}</span></span>
                        </div>
                        <p className="text-3xs text-foreground/75 leading-relaxed bg-brand-50/20 dark:bg-neutral-900/30 p-3 rounded-xl border border-brand-500/5 font-mono">
                          Symptoms logged: "{appt.symptoms}"
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-2 flex h-96 items-center justify-center glass-card rounded-2xl border border-dashed border-brand-500/10 text-xs text-foreground/50">
            Please register or select a patient to view EMR timeline files.
          </div>
        )}

      </div>

    </div>
  );
}
