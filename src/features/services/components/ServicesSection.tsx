import React from "react";
import Image from "next/image";
import SectionHeader from "@/components/common/SectionHeader";
import ServiceCard from "./ServiceCard";
import { servicesData } from "@/resources/data/services.data";
import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper";

export default function ServicesSection() {
  return (
    <section id="services" className="py-12 md:py-16 border-b border-[#C8C4BE] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header with ChainGPT Labs Stencil Vibe */}
        <SectionHeader
          number="02"
          category="BEYOND ORDINARY CODE // 8 DISCIPLINES"
          title="BEYOND CODE // COMPLETE DIGITAL LABS"
          subtitle="Every discipline your brand needs to scale from zero to global deployment — unified under one senior in-house engineering squad."
          badgeText="8 IN-HOUSE DISCIPLINES"
        />

        {/* ChainGPT Labs Quick Discipline Selector Strip */}
        <div className="flex flex-wrap gap-2.5 mb-8 pb-4 border-b border-[#C8C4BE]">
          {[
            "FULL-STACK WEB",
            "CROSS-PLATFORM APPS",
            "3D & ROBOTICS",
            "AI AGENTS",
            "BESPOKE UI/UX",
            "ORGANIC SEO ARCHITECTURE",
          ].map((tag, idx) => (
            <div
              key={idx}
              className="font-mono text-[10px] font-bold tracking-wider px-3 py-1 bg-white border border-[#C8C4BE] hover:border-[#FF7120] hover:text-[#FF7120] transition-colors cursor-default select-none flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 bg-[#FF7120]" />
              <span>{tag}</span>
            </div>
          ))}
        </div>

        {/* Bento Grid of 8 Services with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesData.map((service, idx) => (
            <ScrollAnimationWrapper key={service.id} delay={idx * 60} className="h-full">
              <div className="h-full">
                <ServiceCard service={service} />
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
