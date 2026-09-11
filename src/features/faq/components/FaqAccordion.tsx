"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types";
import { Plus, Minus, HelpCircle, CheckCircle2 } from "lucide-react";
import CornerBrackets from "@/components/common/CornerBrackets";

interface FaqAccordionProps {
  items: FaqItem[];
}

const CATEGORIES = [
  "ALL QUESTIONS",
  "AGENCY & SCOPE",
  "ENGINEERING & SPEED",
  "IP & POLICIES",
];

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeCategory, setActiveCategory] = useState("ALL QUESTIONS");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredItems = items.filter((item) => {
    if (activeCategory === "ALL QUESTIONS") return true;
    if (activeCategory === "AGENCY & SCOPE") {
      return (
        item.category.includes("AGENCY") ||
        item.category.includes("MODULAR") ||
        item.category.includes("ONBOARDING")
      );
    }
    if (activeCategory === "ENGINEERING & SPEED") {
      return (
        item.category.includes("TIMELINES") ||
        item.category.includes("TECH") ||
        item.category.includes("TIMEZONE") ||
        item.category.includes("REPLATFORMING")
      );
    }
    if (activeCategory === "IP & POLICIES") {
      return (
        item.category.includes("IP") ||
        item.category.includes("MAINTENANCE") ||
        item.category.includes("REVISIONS")
      );
    }
    return true;
  });

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-2 border-b border-[#C8C4BE]/70">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(0);
            }}
            className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 transition-all cursor-pointer select-none ${
              activeCategory === cat
                ? "bg-[#FF7120] text-black font-bold border border-[#FF7120] shadow-sm chamfer-br"
                : "bg-white text-[#555] border border-[#C8C4BE] hover:border-[#111] hover:text-[#111]"
            }`}
            data-interactive="true"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Cards */}
      <div className="space-y-3">
        {filteredItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <CornerBrackets
              key={item.id}
              className={`p-0 transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-[#FF7120] shadow-[0_4px_20px_rgba(255,113,32,0.12)] bg-white"
                  : "bg-white/95 hover:border-[#9A9590] hover:shadow-xs"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 cursor-pointer group select-none"
                aria-expanded={isOpen}
                data-interactive="true"
              >
                <div className="flex flex-col gap-1.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="coord-square shadow-[0_0_6px_rgba(255,113,32,0.6)]" />
                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isOpen ? "text-[#FF7120]" : "text-[#888]"
                      }`}
                    >
                      [{idx < 9 ? `0${idx + 1}` : idx + 1}]
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#666] font-bold">
                      // {item.category}
                    </span>
                  </div>
                  <h3 className="font-mono text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight text-[#111111] group-hover:text-[#FF7120] transition-colors duration-200 mt-1">
                    {item.question}
                  </h3>
                </div>

                <div
                  className={`w-8 h-8 flex items-center justify-center shrink-0 transition-all duration-300 chamfer-br mt-0.5 ${
                    isOpen
                      ? "bg-[#FF7120] text-black font-bold"
                      : "bg-[#F6F4F0] text-[#111111] border border-[#C8C4BE] group-hover:border-[#FF7120] group-hover:text-[#FF7120]"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Animated answer panel */}
              <div
                className="overflow-hidden transition-all duration-400"
                style={{
                  maxHeight: isOpen ? "500px" : "0px",
                  transition: "max-height 0.35s cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                <div className="px-5 md:px-6 pb-6 pt-1 border-t border-[#C8C4BE]">
                  <p className="pt-4 text-sm md:text-base text-[#222222] font-medium leading-relaxed font-sans">
                    {item.answer}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#EAE7E2] flex items-center justify-between text-[10px] font-mono text-[#777]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7120]" />
                      <span className="font-bold text-[#111] uppercase">DOODLE SERVICES POLICY</span>
                    </div>
                    <span className="hidden sm:inline">UPDATED FOR 2026 ROADMAPS</span>
                  </div>
                </div>
              </div>
            </CornerBrackets>
          );
        })}
      </div>
    </div>
  );
}
