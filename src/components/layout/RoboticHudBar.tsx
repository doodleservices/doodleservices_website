"use client";

import React, { useEffect, useState } from "react";
import { hudContent } from "@/resources/data/content";

export default function RoboticHudBar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollY / docHeight) * 100) : 0;
      setScrollPercent(pct);
      setIsVisible(scrollY > 150);

      // Detect active section
      const sections = hudContent.sections.map((s) => s.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="System Telemetry & Section Navigation HUD"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 pointer-events-auto ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-[#111111]/92 text-white border border-[#FF7120]/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full font-mono text-[10px] sm:text-xs">
        {/* System Status Indicator & Soundwave Equalizer */}
        <div className="flex items-center gap-2 pr-2 sm:pr-3 border-r border-[#333] hidden sm:flex">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#888] tracking-wider">{hudContent.systemLabel}</span>
          {/* Micro Audio Equalizer Waves */}
          <div className="flex items-end gap-0.5 h-3 ml-1">
            <span className="w-0.5 bg-[#FF7120] wave-bar-1" />
            <span className="w-0.5 bg-[#FF7120] wave-bar-2" />
            <span className="w-0.5 bg-[#FF7120] wave-bar-3" />
          </div>
        </div>

        {/* Real-time Scroll Percentage Gauge */}
        <div className="px-2 border-r border-[#333] text-[#FF7120] font-bold hidden md:block">
          {hudContent.scrollLabel}: {scrollPercent}%
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {hudContent.sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                data-cursor="NAVIGATE"
                className={`px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#FF7120] text-black font-bold shadow-[0_0_12px_rgba(255,113,32,0.6)] scale-105"
                    : "text-[#888] hover:text-white hover:bg-[#222]"
                }`}
              >
                <span className={`text-[9px] ${isActive ? "text-black/80" : "text-[#555]"}`}>
                  {sec.code}
                </span>
                <span className="tracking-wider">{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
