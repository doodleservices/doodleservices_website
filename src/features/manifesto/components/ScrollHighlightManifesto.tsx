"use client";

import React, { useEffect, useRef, useState } from "react";
import { manifestoContent } from "@/resources/data/content";
import CornerBrackets from "@/components/common/CornerBrackets";
import Badge from "@/components/common/Badge";
import { Terminal, Cpu, Activity } from "lucide-react";

export default function ScrollHighlightManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Split paragraph into words for scroll-driven illumination
  const words = manifestoContent?.paragraph
    ? manifestoContent.paragraph.split(" ")
    : [
        "Doodle", "Services", "operates", "as", "an", "integrated", "cybernetic", "studio.",
        "We", "eliminate", "freelance", "chaos,", "handoff", "friction,", "and", "fragmented",
        "agency", "overhead.", "From", "reactive", "web", "architectures", "and", "native",
        "mobile", "apps", "to", "kinetic", "3D", "motion,", "cinematic", "post-production,",
        "and", "algorithmic", "search", "dominance", "—", "all", "eight", "core", "disciplines",
        "compile", "synchronously", "under", "one", "singular", "command."
      ];

  const keywordsToHighlight = new Set([
    "cybernetic",
    "eliminate",
    "synchronously",
    "dominance",
    "singular",
    "integrated",
    "architectures",
    "motion,"
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // MIDPOINT TRACKING:
      // progress = 0  → top of the text block is exactly at the screen center (50%)
      // progress = 1  → bottom of the text block crosses the screen center (50%)
      // This means a word turns orange only when IT physically crosses the 50% midline —
      // words still in the bottom half of the screen always remain dark.
      const midline = windowHeight * 0.5;
      const rawProgress = (midline - rect.top) / rect.height;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      setProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const highlightedCount = Math.floor(progress * words.length);

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative py-14 md:py-20 border-b border-[#C8C4BE] bg-transparent overflow-hidden"
    >
      {/* Background Circuit Grid & Tech Crosses */}
      <div className="absolute inset-0 circuit-grid opacity-30 pointer-events-none" />
      
      {/* Precision Decorative Corner Crosshairs */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-[#111111] font-bold tracking-widest hidden md:block">
        + SYS.LOC [37.77° N, 122.41° W]
      </div>
      <div className="absolute top-6 right-6 font-mono text-[10px] text-[#111111] font-bold tracking-widest hidden md:block">
        TEL.FREQ // 144HZ +
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Robotic Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#C8C4BE]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#FF7120] tracking-wider">
                {manifestoContent.tag}
              </span>
              <span className="text-[#111111] font-bold">///</span>
              <Badge variant="orange" dot={true}>
                {manifestoContent.badge}
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-mono font-black tracking-tight text-[#111111] uppercase">
              A SINGLE <span className="text-[#FF7120]">SYNCHRONIZED</span> DIGITAL MACHINE
            </h2>
          </div>

          {/* Telemetry Progress Readout */}
          <div className="font-mono text-xs text-[#111111] bg-white border border-[#C8C4BE] p-3 shadow-sm self-start md:self-auto flex items-center gap-4">
            <div>
              <span className="block text-[10px] text-[#111111] uppercase font-bold">DECRYPT PROGRESS</span>
              <span className="text-[#FF7120] font-black text-sm">
                {Math.round(progress * 100)}%
              </span>
            </div>
            <div className="w-24 bg-[#E0DCD6] h-2.5 border border-[#C8C4BE] overflow-hidden">
              <div
                className="bg-[#FF7120] h-full transition-all duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <div className="hidden sm:block text-right">
              <span className="block text-[10px] text-[#111111] uppercase font-bold">BUFFER</span>
              <span className="text-[#111111] font-bold text-xs">{highlightedCount}/{words.length} W</span>
            </div>
          </div>
        </div>

        {/* The Scroll Highlight Text Container - Crisp White Titanium Card */}
        <CornerBrackets className="bg-white border border-[#C8C4BE] p-8 md:p-14 shadow-xl text-[#111111] relative overflow-hidden">
          {/* Sweeping Laser Scanline */}
          <div className="animate-scanline" />

          {/* Terminal Sub-Header with Crisp High-Contrast Styling */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-8 border-b border-[#C8C4BE] text-xs font-mono">
            <div className="inline-flex items-center gap-2 bg-[#FF7120]/10 border border-[#FF7120]/50 px-3 py-1.5 text-[#FF7120] font-mono font-bold tracking-wider">
              <Terminal className="w-4 h-4 text-[#FF7120] shrink-0" />
              <span className="text-[#FF7120] font-black tracking-wide">{manifestoContent.terminalText}</span>
            </div>
            <div className="flex items-center gap-2 text-[#111111] font-bold">
              <Activity className="w-4 h-4 text-[#FF7120]" />
              <span className="text-[#111111] font-mono font-black">STREAM: SYNCHRONOUS</span>
            </div>
          </div>

          {/* Words Container: dark text by default, orange as scroll progresses */}
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono leading-[1.4] tracking-tight flex flex-wrap gap-x-3 gap-y-2.5 select-none">
            {words.map((word, index) => {
              const isIlluminated = index < highlightedCount;
              return (
                <span
                  key={index}
                  className={`inline-block transition-colors duration-300 font-bold ${
                    isIlluminated
                      ? "text-[#FF7120]"
                      : "text-[#111111]"
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>

          {/* Bottom Telemetry Metrics Strip */}
          <div className="mt-12 pt-8 border-t border-[#C8C4BE] grid grid-cols-1 sm:grid-cols-3 gap-6">
            {manifestoContent.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[#F8F6F1] border border-[#C8C4BE] p-4 flex flex-col justify-between hover:border-[#FF7120] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#111111] uppercase tracking-wider font-black">
                    {stat.label}
                  </span>
                  <Cpu className="w-4 h-4 text-[#FF7120]" />
                </div>
                <span className="font-mono text-xl md:text-2xl font-black text-[#FF7120]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </CornerBrackets>

        {/* Scroll down hint badge */}
        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#111111] bg-white px-4 py-2 border border-[#C8C4BE] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF7120] animate-ping" />
            {manifestoContent.subtitle}
          </span>
        </div>
      </div>
    </section>
  );
}
