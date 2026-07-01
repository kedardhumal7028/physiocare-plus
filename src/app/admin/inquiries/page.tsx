"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  MessageSquare, Mail, Phone, Clock, Search, Filter,
  ChevronDown, CheckCircle, RefreshCw, ExternalLink, Globe,
  Inbox, AlertCircle, TrendingUp,
} from "lucide-react";

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  createdAt: string;
  updatedAt: string;
}

type InquiryStatus = Inquiry["status"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isInquiryStatus(value: unknown): value is InquiryStatus {
  return value === "new" || value === "contacted" || value === "resolved";
}

function normalizeInquiries(payload: unknown): Inquiry[] {
  const source = isRecord(payload)
    ? payload.data ?? payload.inquiries ?? payload.inquiry ?? payload
    : payload;
  const items = Array.isArray(source) ? source : [source];
  const inquiries: Inquiry[] = [];

  for (const item of items) {
    if (!isRecord(item)) continue;

    const now = new Date().toISOString();
    const id = String(item._id ?? item.id ?? "");
    const message = String(item.message ?? "");

    if (!id || !message) continue;

    inquiries.push({
      _id: id,
      name: String(item.name ?? "Unknown Patient"),
      email: String(item.email ?? ""),
      phone: item.phone ? String(item.phone) : undefined,
      subject: item.subject ? String(item.subject) : "General Inquiry",
      message,
      status: isInquiryStatus(item.status) ? item.status : "new",
      createdAt: String(item.createdAt ?? now),
      updatedAt: String(item.updatedAt ?? item.createdAt ?? now),
    });
  }

  return inquiries;
}

const STATUS_CONFIG = {
  new: {
    label: "New",
    bg: "bg-blue-50 dark:bg-blue-900/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800/30",
    dot: "bg-blue-500",
    pillBg: "bg-blue-500",
  },
  contacted: {
    label: "Contacted",
    bg: "bg-amber-50 dark:bg-amber-900/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800/30",
    dot: "bg-amber-500",
    pillBg: "bg-amber-500",
  },
  resolved: {
    label: "Resolved",
    bg: "bg-emerald-50 dark:bg-emerald-900/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800/30",
    dot: "bg-emerald-500",
    pillBg: "bg-emerald-500",
  },
};

function timeAgo(isoStr: string) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function formatDate(isoStr: string) {
  return new Date(isoStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | Inquiry["status"]>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [storageMode, setStorageMode] = useState<"mongodb" | "memory" | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/inquiry", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          isRecord(data) && typeof data.error === "string"
            ? data.error
            : "Failed to load inquiries"
        );
      }

      setStorageMode(
        isRecord(data) && data.storage === "memory" ? "memory" : "mongodb"
      );
      setInquiries(normalizeInquiries(data));
    } catch (error) {
      console.error("Failed to load inquiries:", error);
      setInquiries([]);
      setStorageMode(null);
      setLoadError(error instanceof Error ? error.message : "Failed to load inquiries");
    } finally {
      setIsLoading(false);
      setLastRefreshed(new Date());
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [load]);

  const handleStatusChange = async (id: string, status: Inquiry["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/inquiry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        const data = await res.json();
        const [updatedInquiry] = normalizeInquiries(data);
        if (updatedInquiry) {
          setInquiries((prev) =>
            prev.map((inq) => (inq._id === id ? updatedInquiry : inq))
          );
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.subject && inq.subject.toLowerCase().includes(q)) ||
      inq.message.toLowerCase().includes(q) ||
      (inq.phone && inq.phone.includes(q));
    const matchStatus = filterStatus === "all" || inq.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    resolved: inquiries.filter((i) => i.status === "resolved").length,
  };

  const conversionRate =
    counts.all > 0
      ? Math.round(((counts.contacted + counts.resolved) / counts.all) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-foreground">

      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-brand-500/5 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Inquiries</h1>
            <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 px-2.5 py-1 text-3xs font-bold text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              LIVE
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Globe className="h-3.5 w-3.5 text-brand-500" />
            <span className="text-xs text-foreground/50 font-medium">
              Automatically synced from the{" "}
              <Link
                href="/#contact"
                target="_blank"
                className="font-bold text-brand-500 hover:underline inline-flex items-center gap-0.5"
              >
                Contact Us form
                <ExternalLink className="h-3 w-3 ml-0.5" />
              </Link>{" "}
              on your website
            </span>
          </div>
          <p suppressHydrationWarning className="text-3xs text-foreground/35 mt-0.5">
            Last refreshed: {lastRefreshed.toLocaleTimeString("en-IN")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={load}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl border border-brand-500/15 px-4 py-2 text-xs font-bold text-foreground/70 hover:bg-brand-500/5 hover:text-brand-500 transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <Link
            href="/#contact"
            target="_blank"
            className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white hover:bg-brand-600 transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-brand-500/20"
          >
            <Globe className="h-3.5 w-3.5" />
            View Contact Form
          </Link>
        </div>
      </div>

      {/* ── Integration Info Banner ── */}
      <div className="glass-card border border-brand-500/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 sm:items-center bg-brand-50/30 dark:bg-brand-900/5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
          <Inbox className="h-5 w-5 text-brand-500" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-extrabold text-foreground">Contact Us Form → MongoDB</p>
          <p className="text-3xs text-foreground/55 mt-0.5 leading-relaxed">
            Every message submitted through the <strong>Contact Us</strong> section on your homepage is automatically saved here to your MongoDB database in real-time.
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
          <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-3xs font-bold text-emerald-600 dark:text-emerald-400">Database Active</span>
        </div>
      </div>

      {storageMode === "memory" && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-700 dark:border-amber-800/30 dark:bg-amber-900/10 dark:text-amber-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Local fallback is active because MongoDB is not configured. Messages will stay available until the dev server restarts.</span>
        </div>
      )}

      {loadError && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 dark:border-red-800/30 dark:bg-red-900/10 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{loadError}</span>
        </div>
      )}

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <button
          onClick={() => setFilterStatus("all")}
          className={`glass-card p-5 border text-left rounded-2xl transition-all duration-200 hover:shadow-md flex flex-col gap-3 ${
            filterStatus === "all" ? "border-brand-500/30 bg-brand-50/30 dark:bg-brand-900/10 shadow-md" : "border-brand-500/5 hover:border-brand-500/15"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-3xs font-extrabold text-foreground/50 uppercase tracking-wider">Total Messages</span>
            <MessageSquare className="h-3.5 w-3.5 text-brand-500/50" />
          </div>
          <span className="text-3xl font-extrabold text-foreground">{counts.all}</span>
          <span className="text-3xs text-foreground/40 font-semibold">All contact form submissions</span>
        </button>

        <button
          onClick={() => setFilterStatus("new")}
          className={`glass-card p-5 border text-left rounded-2xl transition-all duration-200 hover:shadow-md flex flex-col gap-3 ${
            filterStatus === "new" ? "border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10 shadow-md" : "border-brand-500/5 hover:border-brand-500/15"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-3xs font-extrabold text-foreground/50 uppercase tracking-wider">New</span>
            <span className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
          <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{counts.new}</span>
          <span className="text-3xs text-foreground/40 font-semibold">Awaiting response</span>
        </button>

        <button
          onClick={() => setFilterStatus("contacted")}
          className={`glass-card p-5 border text-left rounded-2xl transition-all duration-200 hover:shadow-md flex flex-col gap-3 ${
            filterStatus === "contacted" ? "border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10 shadow-md" : "border-brand-500/5 hover:border-brand-500/15"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-3xs font-extrabold text-foreground/50 uppercase tracking-wider">Contacted</span>
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          </div>
          <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">{counts.contacted}</span>
          <span className="text-3xs text-foreground/40 font-semibold">In progress</span>
        </button>

        <div className="glass-card p-5 border border-brand-500/5 text-left rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-3xs font-extrabold text-foreground/50 uppercase tracking-wider">Response Rate</span>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{conversionRate}%</span>
          <div className="w-full h-1.5 bg-brand-500/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${conversionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, subject, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-brand-500/10 bg-white dark:bg-neutral-900 pl-10 pr-4 py-2.5 text-sm font-medium text-foreground placeholder:text-foreground/30 outline-none focus:border-brand-500/40 focus:ring-2 focus:ring-brand-500/10 transition-all duration-200"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40 pointer-events-none" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="appearance-none rounded-xl border border-brand-500/10 bg-white dark:bg-neutral-900 pl-9 pr-8 py-2.5 text-sm font-semibold text-foreground/80 outline-none focus:border-brand-500/40 focus:ring-2 focus:ring-brand-500/10 cursor-pointer transition-all duration-200"
          >
            <option value="all">All ({counts.all})</option>
            <option value="new">New ({counts.new})</option>
            <option value="contacted">Contacted ({counts.contacted})</option>
            <option value="resolved">Resolved ({counts.resolved})</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40 pointer-events-none" />
        </div>
      </div>

      {/* ── Results count ── */}
      {search && (
        <p className="text-xs text-foreground/50 font-semibold -mt-2">
          Showing {filtered.length} of {inquiries.length} messages matching &ldquo;{search}&rdquo;
        </p>
      )}

      {/* ── Inquiries List ── */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-brand-500">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center gap-5 py-20 border border-brand-500/5 rounded-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/5 border border-brand-500/10">
            <Inbox className="h-7 w-7 text-brand-500/40" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-foreground/60">No messages found</p>
            <p className="text-xs text-foreground/35 mt-1 max-w-xs">
              {search
                ? "Try adjusting your search or filter."
                : "Messages submitted via the Contact Us form will appear here automatically."}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((inq) => {
            const cfg = STATUS_CONFIG[inq.status];
            const isExpanded = expandedId === inq._id;
            const isUpdating = updatingId === inq._id;

            return (
              <div
                key={inq._id}
                className={`glass-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                  inq.status === "new"
                    ? "border-blue-200/60 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-700"
                    : "border-brand-500/5 hover:border-brand-500/15 hover:shadow-md"
                }`}
              >
                <div
                  className="flex items-start gap-4 p-4 sm:p-5 cursor-pointer group"
                  onClick={() => setExpandedId(isExpanded ? null : inq._id)}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-brand-500 font-extrabold text-base border border-brand-500/10">
                    {inq.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-extrabold text-foreground">{inq.name}</span>
                      {inq.status === "new" && (
                        <span className="text-3xs font-bold text-white bg-blue-500 px-2 py-0.5 rounded-md shadow-sm shadow-blue-500/30 animate-pulse">
                          NEW
                        </span>
                      )}
                      <span className={`text-3xs font-bold px-2.5 py-0.5 rounded-lg border flex items-center gap-1 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                      <span className="text-3xs font-semibold text-foreground/40 flex items-center gap-1">
                        <Globe className="h-2.5 w-2.5" />
                        Contact Form
                      </span>
                    </div>

                    <p className="text-xs font-bold text-foreground/70 mb-1">
                      {inq.subject || "General Inquiry"}
                    </p>
                    <p className="text-xs text-foreground/45 line-clamp-1">{inq.message}</p>

                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-3xs text-foreground/40 font-semibold">
                        <Mail className="h-3 w-3" />{inq.email}
                      </span>
                      {inq.phone && (
                        <span className="flex items-center gap-1 text-3xs text-foreground/40 font-semibold">
                          <Phone className="h-3 w-3" />{inq.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-3xs text-foreground/30 font-semibold">
                        <Clock className="h-3 w-3" />{timeAgo(inq.createdAt)}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-foreground/25 shrink-0 mt-1 transition-transform duration-200 group-hover:text-foreground/50 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </div>

                {isExpanded && (
                  <div className="border-t border-brand-500/5 bg-brand-50/10 dark:bg-neutral-900/20 px-5 py-5 flex flex-col gap-5 animate-fade-in">
                    <div>
                      <p className="text-3xs font-extrabold uppercase tracking-wider text-foreground/35 mb-2 flex items-center gap-1.5">
                        <MessageSquare className="h-3 w-3" />
                        Message Content
                      </p>
                      <div className="bg-white dark:bg-neutral-900 border border-brand-500/8 rounded-2xl p-4">
                        <p className="text-sm text-foreground/75 leading-relaxed whitespace-pre-wrap">{inq.message}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-3xs font-extrabold text-foreground/35 uppercase tracking-wider">Name</span>
                        <span className="text-xs font-bold text-foreground">{inq.name}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-3xs font-extrabold text-foreground/35 uppercase tracking-wider">Email</span>
                        <a href={`mailto:${inq.email}`} className="text-xs font-bold text-brand-500 hover:underline truncate">
                          {inq.email}
                        </a>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-3xs font-extrabold text-foreground/35 uppercase tracking-wider">Phone</span>
                        <a href={`tel:${inq.phone}`} className="text-xs font-bold text-foreground/70">
                          {inq.phone || "—"}
                        </a>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-3xs font-extrabold text-foreground/35 uppercase tracking-wider">Received</span>
                        <span className="text-xs font-semibold text-foreground/60">{formatDate(inq.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-brand-500/5">
                      <span className="text-3xs font-extrabold text-foreground/35 uppercase tracking-wider mr-1">
                        Update Status:
                      </span>
                      {(["new", "contacted", "resolved"] as Inquiry["status"][]).map((s) => {
                        const sCfg = STATUS_CONFIG[s];
                        const isCurrent = inq.status === s;
                        return (
                          <button
                            key={s}
                            onClick={() => !isCurrent && !isUpdating && handleStatusChange(inq._id, s)}
                            disabled={isCurrent || isUpdating}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-3xs font-bold border transition-all duration-200 ${
                              isCurrent
                                ? `${sCfg.bg} ${sCfg.text} ${sCfg.border}`
                                : "border-brand-500/10 text-foreground/55 hover:bg-brand-500/5 hover:border-brand-500/20 cursor-pointer"
                            } disabled:opacity-60`}
                          >
                            {isUpdating && isCurrent ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <span className={`h-1.5 w-1.5 rounded-full ${sCfg.dot}`} />
                            )}
                            {sCfg.label}
                            {isCurrent && <CheckCircle className="h-3 w-3" />}
                          </button>
                        );
                      })}

                      <a
                        href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject || "Your Message — PhysioCare Plus")}&body=Dear ${encodeURIComponent(inq.name)},%0A%0AThank you for contacting PhysioCare Plus through our website.%0A%0A`}
                        onClick={() => handleStatusChange(inq._id, "contacted")}
                        className="ml-auto flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2 text-3xs font-bold text-white hover:bg-brand-600 transition-all duration-200 shadow-md shadow-brand-500/20 hover:-translate-y-0.5"
                      >
                        <Mail className="h-3 w-3" />
                        Reply via Email
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
