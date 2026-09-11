"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isAudioEnabled, setAudioEnabled } from "./RoboticAudio";

export default function AudioToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isAudioEnabled());
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setAudioEnabled(next);
  };

  return (
    <button
      onClick={toggle}
      className={`relative flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] uppercase border transition-all duration-200 cursor-pointer ${
        enabled
          ? "bg-[#FF7120] text-black border-[#FF7120] shadow-[0_0_12px_rgba(255,113,32,0.35)] font-bold"
          : "bg-white/90 text-[#666] border-[#C8C4BE] hover:border-[#FF7120] hover:text-[#FF7120]"
      }`}
      title={enabled ? "Robotic SFX: Active" : "Robotic SFX: Muted"}
      data-cursor="TOGGLE SFX"
      aria-label="Toggle robotic audio feedback"
    >
      {enabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="hidden sm:inline tracking-wider">SFX: ON</span>
          <div className="flex items-end gap-0.5 h-3 ml-0.5">
            <span className="w-0.5 h-1.5 bg-white animate-pulse" />
            <span className="w-0.5 h-3 bg-white/80 animate-pulse delay-75" />
            <span className="w-0.5 h-2 bg-white animate-pulse delay-150" />
          </div>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#888]" />
          <span className="hidden sm:inline tracking-wider">SFX: OFF</span>
        </>
      )}
    </button>
  );
}
