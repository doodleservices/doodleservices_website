"use client";

import React, { useRef } from "react";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import HeroVisual from "./HeroVisual";
import TechArtifactBox from "./TechArtifactBox";
import { siteConfig } from "@/resources/data/siteConfig";
import { heroContent } from "@/resources/data/content";

const TECH_PARTNERS = [
  { name: "NEXT.JS", tag: "v16.3" },
  { name: "REACT", tag: "v19.2" },
  { name: "THREE.JS", tag: "3D CORE" },
  { name: "TYPESCRIPT", tag: "TYPE-SAFE" },
  { name: "TAILWIND", tag: "CSS v4" },
  { name: "OPENAI", tag: "AI AGENTS" },
  { name: "PYTHON", tag: "ML PIPELINE" },
  { name: "VERCEL", tag: "EDGE GLOBAL" },
  { name: "FIGMA", tag: "BESPOKE UI" },
  { name: "STRIPE", tag: "COMMERCE" },
];

export default function Hero() {
  const tickerRef = useRef<HTMLDivElement>(null);

  const scrollTicker = (direction: "left" | "right") => {
    if (tickerRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      tickerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative pt-20 md:pt-24 border-b border-[#C8C4BE] overflow-hidden">
      {/* Top Circuit Coordinate Marker */}
      <div className="absolute top-22 right-8 font-mono text-[9px] text-[#A8A19B] tracking-widest hidden xl:block select-none pointer-events-none z-10">
        [SYS.NODE_01 // LAT: 37.77°N // DOODLE_SERVICES]
      </div>

      {/* ========================================================
          1. CHAINGPT LABS SIGNATURE TOP MARQUEE BANNER
          ======================================================== */}
      <div className="w-full border-y border-[#C8C4BE] bg-white/70 backdrop-blur-xs relative overflow-hidden py-3">
        {/* Coordinate Orange Squares */}
        <span className="coord-square absolute top-1.5 left-2 shadow-[0_0_8px_rgba(255,113,32,0.8)]" />
        <span className="coord-square absolute top-1.5 right-2 shadow-[0_0_8px_rgba(255,113,32,0.8)]" />
        <span className="coord-square absolute bottom-1.5 left-2 shadow-[0_0_8px_rgba(255,113,32,0.8)]" />
        <span className="coord-square absolute bottom-1.5 right-2 shadow-[0_0_8px_rgba(255,113,32,0.8)]" />

        {/* Continuous Kinetic Stencil Marquee */}
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-4">
              <span className="font-stencil font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#111111]">
                ONE STUDIO
              </span>
              <span className="font-stencil font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FF7120]">
                EVERY DIGITAL NEED
              </span>
              <span className="font-stencil font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#111111]">
                RAPID SPRINT DELIVERY
              </span>
              <span className="text-[#C8C4BE] font-mono text-2xl">///</span>
            </div>
          ))}
        </div>

        {/* Coordinate Subtitle Strip */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-2 flex items-center justify-between border-t border-[#E5E4E0] pt-1.5">
          <div className="flex items-center gap-2">
            <span className="coord-square" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#111111] font-bold">
              BACKING VISIONARY BUILDERS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-[#888] font-bold hidden sm:inline">
              DOODLE SERVICES // 2026
            </span>
            <span className="font-mono text-[9px] text-[#FF7120] font-bold">
              SYS_OK
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. CHAINGPT LABS 3-COLUMN ARCHITECTURAL BLUEPRINT BODY
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT COLUMN: Manifesto Pitch & Primary CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category indicator with orange square */}
              <div className="flex items-center gap-2">
                <span className="coord-square shadow-[0_0_8px_rgba(255,113,32,0.8)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#111111] font-bold">
                  DOODLE SERVICES // DIGITAL DELIVERY
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] text-[#FF7120] font-bold border border-[#FF7120]/40 px-2 py-0.5 bg-[#FF7120]/10">
                  [SYS.V4.2]
                </span>
                <Badge variant="orange" dot={true}>
                  {heroContent.badge1}
                </Badge>
              </div>

              {/* Subheadline / Manifesto */}
              <p className="text-sm sm:text-base text-[#2E2A27] font-mono leading-relaxed max-w-md pt-2 border-t border-[#C8C4BE]">
                Backing the very best founders & visionary teams — transforming ambitious digital ideas into real-world market velocity under one singular roof.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  href="#contact"
                  size="md"
                  variant="primary"
                  chamfer={true}
                  className="font-mono font-bold"
                >
                  START SPRINT // APPLY NOW
                </Button>
                <Button
                  href="#services"
                  size="md"
                  variant="outline"
                  chamfer={false}
                  icon={false}
                  className="font-mono"
                >
                  EXPLORE DISCIPLINES
                </Button>
              </div>
            </div>

            {/* Quick Metrics Flush Strip */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-[#C8C4BE]">
              <div className="bg-white/80 p-2.5 border border-[#C8C4BE]/80">
                <span className="font-mono text-xl font-black text-[#111111] block">
                  {heroContent.stat1Value}
                </span>
                <span className="font-mono text-[9px] uppercase text-[#666] font-bold block mt-0.5">
                  {heroContent.stat1Label}
                </span>
              </div>
              <div className="bg-white/80 p-2.5 border border-[#C8C4BE]/80">
                <span className="font-mono text-xl font-black text-[#FF7120] block">
                  {heroContent.stat2Value}
                </span>
                <span className="font-mono text-[9px] uppercase text-[#666] font-bold block mt-0.5">
                  {heroContent.stat2Label}
                </span>
              </div>
              <div className="bg-white/80 p-2.5 border border-[#C8C4BE]/80">
                <span className="font-mono text-xl font-black text-[#111111] block">
                  {heroContent.stat3Value}
                </span>
                <span className="font-mono text-[9px] uppercase text-[#666] font-bold block mt-0.5">
                  {heroContent.stat3Label}
                </span>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: 3D Robot Incubator Pod */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-[420px]">
              <HeroVisual />
            </div>
          </div>

          {/* RIGHT COLUMN: Cybernetic Wireframe Artifact HUD & Stack Navigator */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <TechArtifactBox
              onPrev={() => scrollTicker("left")}
              onNext={() => scrollTicker("right")}
            />
          </div>
        </div>
      </div>

      {/* ========================================================
          3. CHAINGPT LABS CONTINUOUS TECH STACK PARTNER STRIP
          ======================================================== */}
      <div className="w-full border-t border-[#C8C4BE] bg-white/90 relative">
        <div
          ref={tickerRef}
          className="max-w-7xl mx-auto overflow-x-auto no-scrollbar grid grid-flow-col auto-cols-[160px] sm:auto-cols-[180px] divide-x divide-[#C8C4BE] border-x border-[#C8C4BE]"
        >
          {TECH_PARTNERS.map((item, idx) => (
            <div
              key={idx}
              className="py-3 px-4 flex flex-col items-center justify-center hover:bg-[#FF7120]/10 transition-colors group cursor-default select-none text-center"
            >
              <span className="font-stencil font-black text-sm tracking-wider text-[#111111] group-hover:text-[#FF7120] transition-colors">
                {item.name}
              </span>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#777] font-bold mt-0.5">
                // {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

