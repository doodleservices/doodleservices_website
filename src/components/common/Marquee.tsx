import React from "react";

interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: "slow" | "medium" | "fast";
  className?: string;
}

export default function Marquee({
  items,
  separator = "•",
  speed = "medium",
  className = "",
}: MarqueeProps) {
  const content = (
    <div className="flex items-center gap-8 px-4 whitespace-nowrap">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-8">
          <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#111111]">
            {item}
          </span>
          <span className="text-[#FF7120] text-xs select-none">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`overflow-hidden border-y border-[#C8C4BE] bg-white/80 backdrop-blur-sm py-3.5 ${className}`}
    >
      <div className="animate-marquee flex">
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
