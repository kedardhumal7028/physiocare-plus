// d:\Physo\physiocare-plus\src\components\home\Stats.tsx
import React from "react";
import { TrendingUp, ShieldCheck, Award, Clock } from "lucide-react";
import Container from "../layout/Container";

export default function Stats() {

  const stats = [
    { value: "5,000+", label: "Patients Treated", icon: TrendingUp },
    { value: "12+ Years", label: "Experience", icon: Award },
    { value: "95%", label: "Recovery Rate", icon: ShieldCheck },
    { value: "Available", label: "Home Visit", icon: Clock },
  ];

  return (
    <section className="py-12 bg-brand-50/30 dark:bg-neutral-950/20 border-y border-brand-500/5">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center gap-1.5 animate-fade-in">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 mb-1">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</span>
                <span className="text-xs sm:text-sm text-foreground/70">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
