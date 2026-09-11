"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import CornerBrackets from "@/components/common/CornerBrackets";
import { Crosshair, ArrowUp } from "lucide-react";
import ThreeRobotCanvas from "@/components/common/ThreeRobotCanvas";

interface RobotLayout {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function HeroVisual() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [robotLayout, setRobotLayout] = useState<RobotLayout | null>(null);
  const isDockedRef = useRef(false);
  isDockedRef.current = isDocked;

  // Compute docked target coordinates (top-right corner below navbar - compact half-size)
  const getDockedLayout = useCallback((): RobotLayout => {
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 640 : false;
    const isTablet = typeof window !== "undefined" ? window.innerWidth < 1024 : false;
    const size = isMobile ? 76 : isTablet ? 92 : 108;
    const top = isMobile ? 70 : 76;
    const rightMargin = isMobile ? 12 : 20;
    const left = (typeof window !== "undefined" ? window.innerWidth : 1200) - rightMargin - size;
    return { top, left, width: size, height: size };
  }, []);

  // Compute hero box coordinates in viewport
  const getHeroBoxLayout = useCallback((): RobotLayout | null => {
    if (!boxRef.current) return null;
    const rect = boxRef.current.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  }, []);

  // Update layout based on docking state
  const updateLayout = useCallback(
    (docked: boolean) => {
      if (docked) {
        setRobotLayout(getDockedLayout());
      } else {
        const heroLayout = getHeroBoxLayout();
        if (heroLayout) {
          setRobotLayout(heroLayout);
        }
      }
    },
    [getDockedLayout, getHeroBoxLayout]
  );

  // Smooth scroll back to hero section
  const scrollToHero = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setMounted(true);

    // Initial positioning after DOM layout settles
    const timer = setTimeout(() => {
      const scrollY = window.scrollY;
      const shouldDock = scrollY > 180;
      setIsDocked(shouldDock);
      updateLayout(shouldDock);
    }, 50);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const box = boxRef.current;
      const currentDocked = isDockedRef.current;

      // When near top of page (scrollY < 120), ALWAYS stay in hero box
      if (scrollY < 120) {
        if (currentDocked) {
          setIsDocked(false);
          updateLayout(false);
        } else {
          // Keep synced 1:1 with hero box during micro-scrolls at top
          const heroLayout = getHeroBoxLayout();
          if (heroLayout) setRobotLayout(heroLayout);
        }
        return;
      }

      // When scrolled past hero, dock permanently into top-right corner
      if (box) {
        const rect = box.getBoundingClientRect();
        // Dock trigger: user scrolled down past 160px and box moved towards top
        if (!currentDocked && scrollY > 160 && rect.top < 90) {
          setIsDocked(true);
          updateLayout(true);
        }
      }
    };

    const handleResize = () => {
      updateLayout(isDockedRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [getHeroBoxLayout, updateLayout]);

  return (
    <div className="relative w-full max-w-lg mx-auto flex items-center justify-center">
      {/* Decorative Technical Blueprint Backing — NEVER MOVES */}
      <div className="absolute -inset-4 border border-[#C8C4BE] bg-[#E5E4E0]/60 -z-10" />

      {/* Precision Corner Markings */}
      <div className="absolute -top-6 -left-6 font-mono text-[9px] text-[#888] tracking-widest hidden sm:block">
        [SYS.3D_ROBOT_CORE]
      </div>
      <div className="absolute -top-6 -right-6 font-mono text-[9px] text-[#888] tracking-widest hidden sm:block">
        [DOODLE.SERVICES_V3]
      </div>

      {/* 
        MAIN HERO BOX (NEVER MOVES):
        The box stays fixed inside the Hero section at all times.
        When the robot is docked/floating, the box shows the standby blueprint placeholder.
      */}
      <CornerBrackets className="w-full shadow-xl bg-white p-2 border border-[#C8C4BE] relative overflow-visible">
        <div
          ref={boxRef}
          className="relative aspect-square w-full overflow-hidden bg-white"
        >
          {/* Technical Blueprint Placeholder inside the Hero Box when Robot flies to Top-Right */}
          <div
            className={`absolute inset-0 bg-[#FAF8F5] border-2 border-dashed border-[#FF7120]/40 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ${
              isDocked ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className="w-12 h-12 rounded-full border border-dashed border-[#FF7120] flex items-center justify-center mb-3 animate-spin"
              style={{ animationDuration: "12s" }}
            >
              <Crosshair className="w-5 h-5 text-[#FF7120]" />
            </div>
            <span className="font-mono text-xs font-black text-[#111111] uppercase tracking-wider block mb-3">
              // 3D ROBOT RELOCATED TO PIP DOCK
            </span>
            <button
              onClick={scrollToHero}
              className="font-mono text-[10px] bg-[#111111] hover:bg-[#FF7120] hover:text-black text-white px-3 py-1.5 font-bold border border-[#FF7120]/50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#FF7120]" />
              <span>SCROLL TO RE-ANCHOR</span>
            </button>
          </div>

          {/* Precision Targeting Reticle in Corner (when robot is inside hero box) */}
          <div
            className={`absolute top-4 right-4 z-20 pointer-events-none transition-opacity duration-300 ${
              !isDocked ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-[#FF7120]/50 animate-reticle-slow" />
              <Crosshair className="w-4 h-4 text-[#FF7120]" />
            </div>
          </div>
        </div>
      </CornerBrackets>

      {/* 
        THE 3D ROBOT IN BODY PORTAL:
        - Attached directly to document.body, so it can NEVER be clipped by parent overflow-hidden
        - In floating mode: Pure 3D robot with NO outer box, NO borders, NO background (transparent)
        - In inline mode: Renders seamlessly inside the Hero section white frame
        - Floats permanently at all scroll positions on the screen
        - Click on floating robot to smoothly scroll back to hero
      */}
      {mounted &&
        robotLayout &&
        createPortal(
          <div
            onClick={isDocked ? () => scrollToHero() : undefined}
            title={isDocked ? "Click to scroll back to Hero" : undefined}
            style={{
              position: "fixed",
              top: `${robotLayout.top}px`,
              left: `${robotLayout.left}px`,
              width: `${robotLayout.width}px`,
              height: `${robotLayout.height}px`,
              transition: isDocked
                ? "top 650ms cubic-bezier(0.16, 1, 0.3, 1), left 650ms cubic-bezier(0.16, 1, 0.3, 1), width 650ms cubic-bezier(0.16, 1, 0.3, 1), height 650ms cubic-bezier(0.16, 1, 0.3, 1), background-color 450ms ease, box-shadow 450ms ease, border-color 450ms ease"
                : window.scrollY < 120
                ? "none"
                : "top 550ms cubic-bezier(0.16, 1, 0.3, 1), left 550ms cubic-bezier(0.16, 1, 0.3, 1), width 550ms cubic-bezier(0.16, 1, 0.3, 1), height 550ms cubic-bezier(0.16, 1, 0.3, 1), background-color 450ms ease, box-shadow 450ms ease, border-color 450ms ease",
              backgroundColor: isDocked ? "transparent" : "#FFFFFF",
              border: isDocked ? "none" : "1px solid #C8C4BE",
              boxShadow: isDocked ? "none" : "0 20px 50px rgba(0, 0, 0, 0.08)",
              zIndex: 45,
            }}
            className={`overflow-hidden select-none relative ${
              isDocked ? "cursor-pointer pointer-events-auto" : "cursor-default incubator-chamber"
            }`}
          >
            {/* ChainGPT Incubator Pod Cylinder Fixtures (when in hero box) */}
            {!isDocked && (
              <>
                <div className="incubator-top-cap" />
                <div className="incubator-neon-ring-top" />
                <div className="incubator-neon-ring-bottom" />
                <div className="incubator-bottom-pedestal" />
                <div className="incubator-glass-reflection" />
              </>
            )}

            {/* Minimal return-to-hero hover hint pill in floating mode */}
            {isDocked && (
              <div className="absolute top-1 right-1 z-30 opacity-0 hover:opacity-100 transition-opacity bg-[#111111]/80 text-[#FF7120] text-[8px] font-mono px-1.5 py-0.5 border border-[#FF7120]/40 flex items-center gap-1">
                <ArrowUp className="w-2.5 h-2.5" />
                <span>HERO</span>
              </div>
            )}

            {/* The Interactive 3D Robot Mech Canvas */}
            <ThreeRobotCanvas className="w-full h-full relative z-10" hideHud={isDocked} />
          </div>,
          document.body
        )}
    </div>
  );
}
