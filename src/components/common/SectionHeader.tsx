import React from "react";
import Badge from "./Badge";

interface SectionHeaderProps {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  number,
  category,
  title,
  subtitle,
  badgeText,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-6 md:mb-10 ${
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-4xl"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-2.5 mb-3.5 ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        {/* ChainGPT Signature Orange Coordinate Square */}
        <span className="w-2 h-2 bg-[#FF7120] inline-block shrink-0 shadow-[0_0_8px_rgba(255,113,32,0.6)]" />
        <span className="font-mono text-xs text-[#FF7120] tracking-widest font-bold">
          [{number}]
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-[#111111] font-bold">
          {category}
        </span>
        {badgeText && <Badge variant="subtle">{badgeText}</Badge>}
      </div>

      <h2 className="text-3xl md:text-5xl lg:text-6xl font-stencil font-black tracking-tight text-[#111111] leading-[1.05] uppercase">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3.5 text-base md:text-lg text-[#2E2A27] font-medium leading-relaxed max-w-2xl font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
