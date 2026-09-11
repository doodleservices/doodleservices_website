import React from "react";

interface CornerBracketsProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  "data-interactive"?: string;
  onClick?: () => void;
}

export default function CornerBrackets({
  children,
  className = "",
  borderColor = "#FF7120",
  "data-interactive": dataInteractive,
  onClick,
}: CornerBracketsProps) {
  return (
    <div
      className={`relative p-4 md:p-6 bg-white border border-[#C8C4BE] ${className}`}
      data-interactive={dataInteractive}
      onClick={onClick}
    >
      {/* Top Left Bracket */}
      <span
        style={{ borderColor }}
        className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 pointer-events-none"
      />
      {/* Top Right Bracket */}
      <span
        style={{ borderColor }}
        className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 pointer-events-none"
      />
      {/* Bottom Left Bracket */}
      <span
        style={{ borderColor }}
        className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 pointer-events-none"
      />
      {/* Bottom Right Bracket */}
      <span
        style={{ borderColor }}
        className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 pointer-events-none"
      />
      {children}
    </div>
  );
}
