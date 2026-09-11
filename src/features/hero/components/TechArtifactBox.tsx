"use client";

import React, { useState, useEffect } from "react";
import CornerBrackets from "@/components/common/CornerBrackets";
import { ChevronLeft, ChevronRight, Activity, Cpu, ShieldCheck } from "lucide-react";

export default function TechArtifactBox({
  onPrev,
  onNext,
}: {
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      setRotation((prev) => (prev + 0.5) % 360);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      {/* Top Cybernetic Module: HUD Corner Bracketed Artifact */}
      <CornerBrackets className="bg-[#0F1012] border border-[#2A2B30] p-4 relative overflow-hidden shadow-lg aspect-square flex flex-col justify-between">
        {/* HUD Header Status */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FF7120] animate-pulse" />
            <span className="font-mono text-[9px] text-[#A09A92] font-bold tracking-widest uppercase">
              NODE // 0x4F
            </span>
          </div>
          <span className="font-mono text-[8px] text-[#FF7120] border border-[#FF7120]/40 px-1 py-0.5 bg-[#FF7120]/10 font-bold">
            ONLINE
          </span>
        </div>

        {/* Center 3D Isometric Connector Artifact (ChainGPT Labs signature star) */}
        <div className="relative w-full h-28 flex items-center justify-center my-auto">
          <div
            className="relative transition-transform ease-linear"
            style={{
              transform: `perspective(600px) rotateX(25deg) rotateY(${rotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Geometric Hub Core */}
            <svg
              className="w-20 h-20 text-white/90 drop-shadow-[0_0_12px_rgba(255,113,32,0.5)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Central Hexagon Body */}
              <polygon
                points="50,15 80,32 80,68 50,85 20,68 20,32"
                stroke="#FF7120"
                strokeWidth="2"
                fill="#16171B"
              />
              {/* Star Connector Arms */}
              <circle cx="50" cy="50" r="14" fill="#FF7120" fillOpacity="0.8" />
              <line x1="50" y1="15" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="3" />
              <line x1="80" y1="32" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="3" />
              <line x1="80" y1="68" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="3" />
              <line x1="50" y1="85" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="3" />
              <line x1="20" y1="68" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="3" />
              <line x1="20" y1="32" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="3" />
              {/* Outer Port Nodes */}
              <circle cx="50" cy="15" r="5" fill="#FFFFFF" />
              <circle cx="80" cy="32" r="5" fill="#FFFFFF" />
              <circle cx="80" cy="68" r="5" fill="#FFFFFF" />
              <circle cx="50" cy="85" r="5" fill="#FFFFFF" />
              <circle cx="20" cy="68" r="5" fill="#FFFFFF" />
              <circle cx="20" cy="32" r="5" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Precision Target Lines */}
          <div className="absolute inset-0 pointer-events-none border border-dashed border-[#2A2B30] opacity-40" />
        </div>

        {/* HUD Bottom Telemetry */}
        <div className="flex items-center justify-between border-t border-[#2A2B30] pt-2 z-10">
          <span className="font-mono text-[8px] text-[#7A756F]">SYNC // 99.88%</span>
          <span className="font-mono text-[8px] text-[#FF7120] font-bold">LATENCY 4ms</span>
        </div>
      </CornerBrackets>

      {/* Bottom Stack Navigation Controls (ChainGPT Labs: OUR PARTNERS < >) */}
      <div className="bg-white border border-[#C8C4BE] px-3.5 py-2.5 flex items-center justify-between shadow-xs">
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#111111] font-bold">
          CORE STACK:
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPrev}
            className="w-7 h-7 border border-[#C8C4BE] bg-[#F6F4F0] hover:bg-[#FF7120] hover:text-black hover:border-[#FF7120] transition-colors flex items-center justify-center cursor-pointer text-[#111]"
            aria-label="Previous Tech"
            data-interactive="true"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            className="w-7 h-7 border border-[#C8C4BE] bg-[#F6F4F0] hover:bg-[#FF7120] hover:text-black hover:border-[#FF7120] transition-colors flex items-center justify-center cursor-pointer text-[#111]"
            aria-label="Next Tech"
            data-interactive="true"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
