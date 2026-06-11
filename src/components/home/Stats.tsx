import React from "react";
import { TrendingUp, ShieldCheck, Award, Home } from "lucide-react";
import Container from "../layout/Container";

const STATS = [
  { value: "5,000+", label: "Patients Treated",  icon: TrendingUp,  color: "text-brand-500",   bg: "bg-blue-50 dark:bg-blue-950/30" },
  { value: "12+ Yrs", label: "Experience",        icon: Award,       color: "text-amber-500",   bg: "bg-amber-50 dark:bg-amber-950/30" },
  { value: "95%",     label: "Recovery Rate",     icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { value: "Home",    label: "Visits Available",  icon: Home,        color: "text-violet-500",  bg: "bg-violet-50 dark:bg-violet-950/30" },
];

export default function Stats() {
  return (
    <section className="py-4 md:py-6 bg-background">
      <Container>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map(({ value, label, icon: Icon, color, bg }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ${color} mb-1`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {value}
              </span>
              <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
