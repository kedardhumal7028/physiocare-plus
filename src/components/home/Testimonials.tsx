// d:\Physo\physiocare-plus\src\components\home\Testimonials.tsx
import React from "react";
import { Star } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import Container from "../layout/Container";

export default function Testimonials() {
  
  const testimonialHighlights = [
    {
      quote: "After suffering a severe hamstring tear during football, the sports injury rehabilitation program got me back on the field two weeks ahead of schedule. Truly elite care!",
      author: "Sarah Jenkins",
      role: "Athlete",
      rating: 5
    },
    {
      quote: "The home visit physiotherapy care is spectacular. When my father was recovering from surgery, the therapist came straight to our house with portable analysis gear. Highly professional.",
      author: "David Grey",
      role: "Patient's Son",
      rating: 5
    },
    {
      quote: "Persistent neck stiffness from office desktop work was completely cured in just 3 sessions of manual alignment. Outstanding range of motion recovery!",
      author: "Jessica M.",
      role: "Software Architect",
      rating: 5
    }
  ];

  return (
    <section className="py-20 md:py-28">
      <Container>
        
        <SectionTitle
          badge="Patient Testimonies"
          title="Verified Recoveries"
          description="Read how we've helped patients regain range of motion, muscle strength, and active pain-free lifestyles."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonialHighlights.map((test, i) => (
            <div key={i} className="glass-card flex flex-col justify-between rounded-2xl p-6 border border-brand-500/10 shadow-lg relative">
              
              {/* Star rating aggregate */}
              <div className="flex gap-1 text-amber-500 mb-4">
                {Array.from({ length: test.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4.5 w-4.5 fill-amber-500" />
                ))}
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed italic mb-6">
                "{test.quote}"
              </p>

              <div className="border-t border-brand-500/5 pt-4">
                <h4 className="text-sm font-bold text-foreground">{test.author}</h4>
                <span className="text-xs font-semibold text-brand-500">{test.role}</span>
              </div>

            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
