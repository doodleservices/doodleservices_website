"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrambleText from "./ScrambleText";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
  chamfer?: boolean;
  scramble?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  icon = true,
  chamfer = true,
  scramble = true,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer select-none group relative";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-xs md:text-sm px-5 py-2.5 gap-2",
    lg: "text-sm md:text-base px-7 py-3.5 gap-2.5",
  };

  const chamferClass = chamfer ? "chamfer-br" : "";

  const variantStyles = {
    primary:
      "bg-[#FF7120] text-black font-bold hover:bg-[#E85800] border border-[#FF7120] shadow-[0_2px_12px_rgba(255,113,32,0.25)] hover:shadow-[0_4px_20px_rgba(255,113,32,0.4)]",
    secondary:
      "bg-[#111111] text-[#E5E4E0] hover:bg-black border border-[#111111]",
    outline:
      "bg-transparent text-[#111111] border border-[#9A9590] hover:border-[#111111] hover:bg-[rgba(0,0,0,0.04)]",
  };

  const combined = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${chamferClass} ${className}`;

  const renderLabel = () => {
    if (typeof children === "string" && scramble) {
      return <ScrambleText text={children} />;
    }
    return children;
  };

  const content = (
    <>
      <span>{renderLabel()}</span>
      {icon && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combined} data-interactive="true">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combined} data-interactive="true">
      {content}
    </button>
  );
}
