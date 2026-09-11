"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProjectScreenshot } from "@/types";
import CornerBrackets from "@/components/common/CornerBrackets";
import Badge from "@/components/common/Badge";
import { Smartphone, Sparkles, Eye, ChevronRight, ChevronLeft } from "lucide-react";

interface ProjectScreenshotsGalleryProps {
  screenshots: ProjectScreenshot[];
  projectTitle: string;
}

export default function ProjectScreenshotsGallery({
  screenshots,
  projectTitle,
}: ProjectScreenshotsGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!screenshots || screenshots.length === 0) return null;

  const current = screenshots[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <CornerBrackets className="p-6 md:p-8 bg-white border border-[#C8C4BE] shadow-lg relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#C8C4BE] gap-2">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#FF7120]" />
          <h3 className="font-mono text-sm font-black uppercase tracking-widest text-[#111111]">
            // LIVE APPLICATION SHOWCASE &amp; SCREENSHOTS
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#666]">
          <Badge variant="dark" dot={true}>
            {screenshots.length} PRODUCTION VIEWS
          </Badge>
          <span className="font-bold text-[#FF7120]">
            0{activeIndex + 1} / 0{screenshots.length}
          </span>
        </div>
      </div>

      {/* Main Interactive Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Phone Screen Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[320px] aspect-[9/19] bg-[#0E0E10] border-4 border-[#1E1E22] rounded-[36px] shadow-2xl p-2.5 overflow-hidden flex flex-col ring-1 ring-[#FFD700]/30">
            {/* Speaker / Camera Notch */}
            <div className="w-24 h-4 bg-[#1E1E22] mx-auto rounded-full mb-1 flex items-center justify-center shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-[#333]" />
            </div>

            {/* Screen Content */}
            <div className="relative flex-1 w-full rounded-[26px] overflow-hidden bg-black">
              <Image
                src={current.url}
                alt={current.title}
                fill
                priority
                className="object-cover object-top transition-opacity duration-300"
                sizes="320px"
              />
            </div>

            {/* Home Indicator bar */}
            <div className="w-28 h-1 bg-[#444] rounded-full mx-auto mt-2 shrink-0" />
          </div>
        </div>

        {/* Right: Screen Details & Navigation */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-black text-[#FF7120] uppercase bg-[#FF7120]/10 border border-[#FF7120]/30 px-2 py-0.5">
                {current.tag || "PRODUCTION VIEW"}
              </span>
              <span className="font-mono text-xs text-[#888]">
                SCREEN 0{activeIndex + 1}
              </span>
            </div>

            <h4 className="font-mono text-2xl font-black uppercase tracking-tight text-[#111111] mb-2">
              {current.title}
            </h4>

            <p className="text-sm text-[#333333] font-medium font-sans leading-relaxed">
              {current.caption}
            </p>
          </div>

          {/* Quick Navigation Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="p-2.5 border border-[#C8C4BE] bg-[#FBF9F7] hover:bg-[#FF7120] hover:text-black hover:border-[#FF7120] transition-colors cursor-pointer"
              aria-label="Previous screen"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 border border-[#C8C4BE] bg-[#FBF9F7] hover:bg-[#FF7120] hover:text-black hover:border-[#FF7120] transition-colors cursor-pointer"
              aria-label="Next screen"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[#777]">
              Navigate screens or select below
            </span>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-5 gap-2 pt-2 border-t border-[#C8C4BE]/60">
            {screenshots.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-[9/16] rounded overflow-hidden border-2 transition-all cursor-pointer ${
                  activeIndex === idx
                    ? "border-[#FF7120] ring-2 ring-[#FF7120]/30 scale-105"
                    : "border-[#C8C4BE] opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={s.url}
                  alt={s.title}
                  fill
                  className="object-cover object-top"
                  sizes="60px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </CornerBrackets>
  );
}
