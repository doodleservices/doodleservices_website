import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "dark" | "outline" | "subtle";
  dot?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = "subtle",
  dot = true,
  className = "",
}: BadgeProps) {
  const variantStyles = {
    orange: "bg-[#FF7120] text-black font-bold border border-[#FF7120]",
    dark: "bg-[#111111] text-[#E5E4E0] border border-[#111111]",
    outline: "bg-transparent text-[#111111] border border-[#9A9590]",
    subtle: "bg-[rgba(20,20,20,0.05)] text-[#333] border border-[rgba(20,20,20,0.12)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === "orange" ? "bg-black animate-pulse" : "bg-[#FF7120]"
          }`}
        />
      )}
      <span>{children}</span>
    </span>
  );
}
