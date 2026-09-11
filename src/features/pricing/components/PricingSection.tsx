import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import PricingCard from "./PricingCard";
import { pricingData } from "@/resources/data/pricing.data";
import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-12 md:py-16 border-b border-[#C8C4BE] bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          number="05"
          category="SPRINT PROTOCOLS // PREDICTABLE TIERS"
          title="SPRINT TIERS // ZERO BLOAT"
          subtitle="Modular, predictable agile sprint structures giving you complete technical autonomy without bloated agency retainers."
          badgeText="TRANSPARENT SPRINT SCOPE"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {pricingData.map((tier, idx) => (
            <ScrollAnimationWrapper key={tier.id} delay={idx * 80} className="h-full">
              <div className="h-full">
                <PricingCard tier={tier} />
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Custom Scope Note with ChainGPT Chamfer */}
        <div className="mt-8 p-4 bg-white border border-[#C8C4BE] chamfer-br flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#111111] font-bold shadow-sm">
          <div className="flex items-center gap-2">
            <span className="coord-square shadow-[0_0_8px_rgba(255,113,32,0.8)]" />
            <span>NEED A BESPOKE SINGLE-DISCIPLINE OR ENTERPRISE ACCELERATOR?</span>
          </div>
          <a
            href="#contact"
            className="text-[#FF7120] uppercase font-black hover:underline flex items-center gap-1.5 bg-black text-white px-3 py-1.5 chamfer-br"
          >
            REQUEST CUSTOM SCOPING [→]
          </a>
        </div>
      </div>
    </section>
  );
}
