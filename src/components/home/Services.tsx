import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import Container from "../layout/Container";

const SPECIALTIES = [
  {
    title: "Back Pain Treatment",
    desc: "Targeted spinal adjustments, manual decompression, and core stabilization routines designed to eliminate lumbar and sciatic pain.",
    slug: "back-pain",
    image: "/services/back_pain.png",
  },
  {
    title: "Neck Pain Treatment",
    desc: "Cervical joint mobilization and deep tissue muscle adjustments to release tension, cure headaches, and recover posture alignment.",
    slug: "neck-pain",
    image: "/services/neck_pain.png",
  },
  {
    title: "Sports Injury Rehabilitation",
    desc: "Premium dynamic athletic rehabilitation focusing on tissue alignment, restoring agility thresholds, and quick field returns.",
    slug: "sports-injury-rehab",
    image: "/services/sports_rehab.png",
  },
  {
    title: "Knee Pain Treatment",
    desc: "Certified physical therapy designed to improve patellar tracking, strengthen surrounding quadriceps, and recover flexion ranges.",
    slug: "knee-pain",
    image: "/services/knee_pain.png",
  },
  {
    title: "Home Visit Physiotherapy",
    desc: "State-of-the-art in-home rehabilitation programs bringing custom portable analysis gear and targeted sessions to you.",
    slug: "home-visit-physio",
    image: "/services/home_visit.png",
  },
  {
    title: "Post-Surgery Rehabilitation",
    desc: "Clinically monitored post-operative rehab programs to safely accelerate healing after joint replacements or major reconstructions.",
    slug: "post-op-recovery",
    image: "/services/post_surgery.png",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-4 md:py-6 bg-background"
    >
      <Container>
        <SectionTitle
          badge="Our Services"
          title="Specialized Physiotherapy Treatments"
          description="Personalized clinical treatments using modern medical equipment and manual adjustment techniques to recover your natural range of motion."
          className="mb-6"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.map((spec) => (
            <div
              key={spec.slug}
              className="glass-card overflow-hidden flex flex-col border border-card-border
                hover:border-brand-500/50 hover:shadow-xl hover:-translate-y-1
                transition-all duration-300 group bg-card"
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden bg-background">
                <img
                  src={spec.image}
                  alt={spec.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-1.5 flex-1">
                <h3 className="text-sm font-bold text-foreground group-hover:text-brand-500 transition-colors duration-200">
                  {spec.title}
                </h3>
                <p className="text-xs text-foreground/70 leading-relaxed flex-1">
                  {spec.desc}
                </p>
              </div>

              {/* Footer */}
              <div className="px-4 pb-4 pt-0 border-t border-card-border mt-auto pt-3">
                <Link
                  href={`/portal/book?service=${spec.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors"
                >
                  Book This Service
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
