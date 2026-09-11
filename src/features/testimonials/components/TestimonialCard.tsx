"use client";

import React, { useState } from "react";
import { TestimonialItem } from "@/types";
import CornerBrackets from "@/components/common/CornerBrackets";
import TiltCard from "@/components/common/TiltCard";
import { Quote, Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TiltCard intensity={6} glare={true} className="h-full" onClick={() => setExpanded(!expanded)}>
      <CornerBrackets
        className="flex flex-col justify-between h-full bg-white p-6 hover:border-[#FF7120] hover:shadow-[0_8px_24px_rgba(255,113,32,0.14)] transition-all duration-300 group overflow-hidden"
        data-interactive="true"
      >
        {/* Top stripe */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-[#FF7120] transition-all duration-300" />

        <div>
          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 text-[#FF7120] fill-[#FF7120]"
              />
            ))}
          </div>

          {/* Quote icon */}
          <Quote className="w-6 h-6 text-[#FF7120]/40 mb-3" />

          {/* Quote text */}
          <blockquote className="text-sm text-[#111111] font-medium leading-relaxed font-sans mb-4 italic">
            &ldquo;{expanded ? testimonial.quote : testimonial.quote.slice(0, 120) + (testimonial.quote.length > 120 ? "..." : "")}&rdquo;
          </blockquote>

          {testimonial.quote.length > 120 && (
            <button
              className="font-mono text-[10px] uppercase text-[#FF7120] hover:text-[#E85800] transition-colors mb-4 font-bold"
              data-interactive="true"
            >
              {expanded ? "SHOW LESS" : "READ MORE"}
            </button>
          )}
        </div>

        {/* Author */}
        <div className="pt-4 border-t border-[#C8C4BE] flex items-center gap-3">
          <div className="w-9 h-9 bg-[#111111] text-[#FF7120] flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:border-[#FF7120] border border-transparent transition-all duration-200">
            {testimonial.avatarInitials ?? testimonial.author[0]}
          </div>
          <div>
            <span className="font-mono text-sm font-bold text-[#111111] block group-hover:text-[#FF7120] transition-colors">
              {testimonial.author}
            </span>
            <span className="font-mono text-[10px] text-[#636058] font-bold uppercase">
              {testimonial.role} — {testimonial.company}
            </span>
          </div>
        </div>
      </CornerBrackets>
    </TiltCard>
  );
}
