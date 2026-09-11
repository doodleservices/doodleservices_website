"use client";

import React, { useEffect, useRef, useState } from "react";
import { playRoboticChirp, playMechanicalServo } from "./RoboticAudio";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<string>("");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only activate for pointer (non-touch) devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant pinpoint dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }

      // Contextual micro-HUD label follows with offset
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${e.clientX + 16}px, ${e.clientY + 12}px, 0)`;
      }
    };

    // Smooth mechanical physics loop for reticle follower
    const animate = () => {
      const ease = 0.15;
      ring.current.x += (mouse.current.x - ring.current.x) * ease;
      ring.current.y += (mouse.current.y - ring.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      playMechanicalServo();
      if (shockwaveRef.current) {
        shockwaveRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(0.2)`;
        shockwaveRef.current.style.opacity = "0.9";
        setTimeout(() => {
          if (shockwaveRef.current) {
            shockwaveRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(2.8)`;
            shockwaveRef.current.style.opacity = "0";
          }
        }, 10);
      }
    };

    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    let lastHoverElem: HTMLElement | null = null;

    const trackInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const customCursorData = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (customCursorData) {
        if (target !== lastHoverElem) {
          playRoboticChirp();
          lastHoverElem = target;
        }
        setIsHovering(true);
        setHoverType(customCursorData.toUpperCase());
        return;
      }

      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-interactive]"
      ) as HTMLElement | null;

      if (interactive) {
        if (interactive !== lastHoverElem) {
          playRoboticChirp();
          lastHoverElem = interactive;
        }
        setIsHovering(true);

        if (target.closest("input, textarea")) {
          setHoverType("ENTER TEXT");
        } else if (interactive.hasAttribute("aria-label")) {
          setHoverType(interactive.getAttribute("aria-label")!.toUpperCase().slice(0, 20));
        } else {
          // Extract actual meaningful text from the element
          const rawText = (interactive.innerText || interactive.textContent || "").trim();
          const cleanedText = rawText
            .replace(/[\[\]\(\)\{\}\/\\→↗←→#]/g, "")
            .replace(/\s+/g, " ")
            .trim();

          if (cleanedText && cleanedText.length >= 2 && cleanedText.length <= 22) {
            setHoverType(cleanedText.toUpperCase());
          } else {
            const href = interactive.getAttribute("href") || "";
            if (href.startsWith("mailto:")) setHoverType("SEND EMAIL");
            else if (href.startsWith("tel:")) setHoverType("CALL STUDIO");
            else if (href.includes("wa.me") || href.includes("whatsapp")) setHoverType("WHATSAPP");
            else if (href.includes("maps.google") || href.includes("location")) setHoverType("LOCATION");
            else if (interactive.tagName.toLowerCase() === "button") setHoverType("EXECUTE");
            else if (interactive.tagName.toLowerCase() === "a") setHoverType("EXPLORE");
            else setHoverType("VIEW");
          }
        }
      } else {
        lastHoverElem = null;
        setIsHovering(false);
        setHoverType("");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousemove", trackInteractive, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", trackInteractive);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <>
      {/* Laser Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: isClicking ? "#FFFFFF" : "#FF7120",
          boxShadow: isClicking ? "0 0 14px #FFFFFF" : "0 0 10px rgba(255,113,32,0.8)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s, background-color 0.15s, box-shadow 0.15s, transform 0.05s ease-out",
        }}
      />

      {/* Shockwave Ping on Click */}
      <div
        ref={shockwaveRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none -ml-6 -mt-6 will-change-transform"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "2px solid #FF7120",
          opacity: 0,
          transition: "transform 0.45s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.45s ease-out",
        }}
      />

      {/* Outer High-Tech Reticle & Bracket Follower */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.25s",
        }}
      >
        <div
          className={`relative transition-all duration-200 ease-out flex items-center justify-center ${
            isHovering
              ? "w-14 h-14 bg-[#FF7120]/10 border border-[#FF7120]/80 shadow-[0_0_24px_rgba(255,113,32,0.35)]"
              : isClicking
              ? "w-7 h-7 bg-[#FF7120]/30 border border-[#FF7120]"
              : "w-9 h-9 border border-[#FF7120]/50"
          }`}
          style={{
            borderRadius: isHovering ? "4px" : "50%",
          }}
        >
          {/* Robotic Corner Brackets when hovering */}
          {isHovering ? (
            <>
              <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#FF7120]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#FF7120]" />
              <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#FF7120]" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#FF7120]" />
              {/* Internal micro crosshair */}
              <span className="absolute w-2 h-[1px] bg-[#FF7120]/70" />
              <span className="absolute h-2 w-[1px] bg-[#FF7120]/70" />
            </>
          ) : (
            /* 4 Cardinal HUD Ticks */
            <>
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-[#FF7120]/70" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-[#FF7120]/70" />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-0.5 bg-[#FF7120]/70" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-0.5 bg-[#FF7120]/70" />
            </>
          )}
        </div>
      </div>

      {/* Robotic Contextual Micro-HUD Badge */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{
          opacity: isVisible && isHovering && hoverType ? 1 : 0,
          transform: "translate3d(-100px, -100px, 0)",
          transition: "opacity 0.2s ease",
        }}
      >
        <div className="bg-[#111111]/95 text-[#FF7120] border border-[#FF7120]/60 font-mono text-[9px] font-bold px-2 py-0.5 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7120] animate-pulse" />
          <span className="tracking-widest">[{hoverType}]</span>
        </div>
      </div>
    </>
  );
}
