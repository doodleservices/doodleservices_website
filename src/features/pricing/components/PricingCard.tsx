"use client";

import React from "react";
import { PricingTier } from "@/types";
import CornerBrackets from "@/components/common/CornerBrackets";
import TiltCard from "@/components/common/TiltCard";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { Check, Clock, Star } from "lucide-react";

interface PricingCardProps {
  tier: PricingTier;
}

export default function PricingCard({ tier }: PricingCardProps) {
  return (
    <TiltCard intensity={6} glare={true} className="h-full">
      <CornerBrackets
        className={`flex flex-col justify-between h-full bg-white p-6 md:p-8 transition-all duration-300 overflow-hidden relative group ${
          tier.recommended
            ? "border-[#FF7120] shadow-[0_12px_36px_rgba(255,113,32,0.2)] ring-2 ring-[#FF7120]/20"
            : "hover:border-[#FF7120] hover:shadow-[0_8px_28px_rgba(255,113,32,0.12)]"
        }`}
        data-interactive="true"
      >
        {/* Recommended shimmer bg */}
        {tier.recommended && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF7120]/4 via-transparent to-[#FF7120]/2 pointer-events-none" />
        )}

        {/* Top accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
            tier.recommended ? "bg-[#FF7120]" : "bg-transparent group-hover:bg-[#FF7120]"
          }`}
        />

        <div>
          {/* Tier Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#C8C4BE]">
            <div>
              <h3 className="font-mono text-2xl font-black uppercase tracking-tight text-[#111111]">
                {tier.name}
              </h3>
              <span className="font-mono text-xs text-[#4A4540] font-semibold block mt-0.5">
                BEST FOR: {tier.bestFor}
              </span>
            </div>
            {tier.badge && (
              <Badge variant={tier.recommended ? "orange" : "dark"} dot={tier.recommended}>
                {tier.badge}
              </Badge>
            )}
          </div>

          {/* Pricing Note */}
          <div className="mb-6">
            <div className="font-mono text-2xl md:text-3xl font-black text-[#111111] group-hover:text-[#FF7120] transition-colors duration-200">
              {tier.priceNote}
            </div>
            <p className="text-xs text-[#2E2A27] font-sans font-medium mt-1.5 leading-relaxed">
              {tier.description}
            </p>
            <div className="mt-3 flex items-center gap-1.5 font-mono text-xs text-[#FF7120] font-bold">
              <Clock className="w-3.5 h-3.5 text-[#FF7120]" />
              <span>ESTIMATED VELOCITY: {tier.turnaround}</span>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-3 pt-4 border-t border-[#C8C4BE] mb-8">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#4A4540] font-bold block">
              // INCLUDED DELIVERABLES
            </span>
            {tier.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1C1A18] font-medium">
                <div className="w-4 h-4 rounded-full bg-[#F3EFEA] border border-[#C8C4BE] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#FF7120] group-hover:bg-[#FF7120]/10 transition-colors duration-200">
                  <Check className="w-2.5 h-2.5 text-[#FF7120]" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 border-t border-[#C8C4BE]">
          <Button
            href="#contact"
            variant={tier.recommended ? "primary" : "outline"}
            size="md"
            className="w-full ripple-effect"
          >
            SELECT {tier.name} SPRINT
          </Button>
        </div>
      </CornerBrackets>
    </TiltCard>
  );
}
