// d:\Physo\physiocare-plus\src\components\home\Services.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import Container from "../layout/Container";

export default function Services() {

  const specialties = [
    {
      title: "Back Pain Treatment",
      desc: "Targeted spinal adjustments, manual decompression, and core stabilization routines designed to eliminate lumbar and sciatic pain.",
      slug: "back-pain",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Neck Pain Treatment",
      desc: "Cervical joint mobilization and deep tissue muscle adjustments to release tension, cure headaches, and recover posture alignment.",
      slug: "neck-pain",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Sports Injury Rehabilitation",
      desc: "Premium dynamic athletic rehabilitation focusing on tissue alignment, restoring agility thresholds, and quick field returns.",
      slug: "sports-injury-rehab",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Knee Pain Treatment",
      desc: "Certified physical therapy designed to improve patellar tracking, strengthen surrounding quadriceps, and recover flexion ranges.",
      slug: "knee-pain",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Home Visit Physiotherapy",
      desc: "State-of-the-art in-home rehabilitation programs bringing custom portable analysis gear and targeted sessions to you.",
      slug: "home-visit-physio",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Post-Surgery Rehabilitation",
      desc: "Clinically monitored post-operative rehab programs to safely accelerate healing after joint replacements or major reconstructions.",
      slug: "post-op-recovery",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-50/50 dark:bg-neutral-950/20 border-y border-brand-500/5">
      <Container>

        <SectionTitle
          badge="Our Services"
          title="We provide specialized physiotherapy treatments"
          description="Personalized clinical treatments using modern medical equipment and manual adjustment techniques to recover your natural range of motion."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((spec, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden flex flex-col justify-between border border-brand-500/5 hover:border-brand-500/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex flex-col">
                {/* Visual Image Block */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={spec.image}
                    alt={spec.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content Block */}
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-brand-500 transition-colors">
                    {spec.title}
                  </h3>
                  <p className="text-4xs text-foreground/75 leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Learn More link from Reference */}
              <div className="px-5 pb-5 pt-2 border-t border-brand-500/5">
                <Link
                  href={`/portal/book?service=${spec.slug}`}
                  className="inline-flex items-center gap-1.5 text-4xs font-bold text-brand-500 hover:text-brand-600 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
