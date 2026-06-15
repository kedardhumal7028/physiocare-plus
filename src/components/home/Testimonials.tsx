import React from "react";
import { Star, Quote } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import Container from "../layout/Container";

const TESTIMONIALS = [
  {
    quote: "After suffering a severe hamstring tear during football, the sports injury rehabilitation program got me back on the field two weeks ahead of schedule. Truly elite care!",
    author: "Priya Sharma",
    role: "Athlete",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=80",
    rating: 5,
  },
  {
    quote: "The home visit physiotherapy care is spectacular. When my father was recovering from surgery, the therapist came straight to our house with portable analysis gear. Highly professional.",
    author: "Amit Kulkarni",
    role: "Patient's Family",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=80",
    rating: 5,
  },
  {
    quote: "Persistent neck stiffness from office desktop work was completely cured in just 3 sessions of manual alignment. Outstanding range of motion recovery!",
    author: "Neha Joshi",
    role: "Software Architect",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=80",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-4 md:py-6 bg-background"
    >
      <Container>
        <SectionTitle
          badge="Patient Testimonies"
          title="Verified Recoveries"
          description="Read how we've helped patients regain range of motion, muscle strength, and active pain-free lifestyles."
          className="mb-6"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="glass-card flex flex-col p-5 border border-card-border bg-card
                hover:border-brand-500/40 hover:shadow-lg
                transition-all duration-300 rounded-2xl relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-foreground/5" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm text-foreground/80 leading-relaxed italic flex-1 mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-card-border pt-4">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="h-9 w-9 rounded-full object-cover border-2 border-white dark:border-neutral-800 shadow"
                />
                <div>
                  <p className="text-sm font-bold text-foreground">{t.author}</p>
                  <p className="text-xs text-brand-500 font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
