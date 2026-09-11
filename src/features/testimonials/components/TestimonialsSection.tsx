import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import TestimonialCard from "./TestimonialCard";
import { testimonialsData } from "@/resources/data/testimonials.data";
import CornerBrackets from "@/components/common/CornerBrackets";
import Button from "@/components/common/Button";
import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper";

export default function TestimonialsSection() {
  return (
    <section className="py-12 md:py-16 border-b border-[#C8C4BE]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          number="06"
          category="FOUNDER PERSPECTIVES"
          title="TESTIMONIALS // DON'T TAKE OUR WORD"
          subtitle="Real outcomes from visionary founders and product teams who switched from fragmented freelancers to our unified studio pipeline."
          badgeText="VERIFIED REVIEWS"
        />

        <div
          className={`grid gap-6 mb-6 ${
            testimonialsData.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : testimonialsData.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {testimonialsData.map((t, idx) => (
            <ScrollAnimationWrapper key={t.id} delay={idx * 80} className="h-full">
              <div className="h-full">
                <TestimonialCard testimonial={t} />
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* First Success Story Callout */}
        <CornerBrackets className="p-5 md:p-6 bg-white text-[#111111] border border-[#C8C4BE] flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF7120] font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-[#FF7120] animate-pulse" />
              <span>ONBOARDING NEW PARTNERS</span>
            </div>
            <h3 className="font-mono text-lg md:text-xl font-black uppercase text-[#111111]">
              BE ONE OF OUR NEXT BREAKTHROUGH CASE STUDIES
            </h3>
            <p className="text-sm text-[#111111] font-medium font-sans mt-1">
              Work directly with our senior lead architects and designers to turn your vision into high-converting products.
            </p>
          </div>
          <Button href="#contact" variant="primary" size="md" className="shrink-0">
            JOIN EARLY PARTNER COHORT [→]
          </Button>
        </CornerBrackets>
      </div>
    </section>
  );
}
