"use client";

import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/types";
import CornerBrackets from "@/components/common/CornerBrackets";
import TiltCard from "@/components/common/TiltCard";
import {
  Code2,
  Smartphone,
  Palette,
  Sliders,
  Film,
  Clapperboard,
  LayoutGrid,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
}

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Smartphone,
  Palette,
  Sliders,
  Film,
  Clapperboard,
  LayoutGrid,
  TrendingUp,
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.iconName] || Code2;

  return (
    <Link
      href={`/services/${service.id}`}
      className="block h-full group outline-hidden"
      data-interactive="true"
      data-cursor="VIEW DISCIPLINE"
    >
      <TiltCard
        intensity={10}
        glare={true}
        className="h-full"
      >
        <CornerBrackets
          className="group flex flex-col justify-between h-full bg-white transition-all duration-300 hover:border-[#FF7120] hover:shadow-[0_8px_24px_rgba(255,113,32,0.18)] overflow-hidden relative"
        >
          {/* Top accent bar & Scanline indicator on hover */}
          <div className="h-0.5 bg-transparent group-hover:bg-[#FF7120] transition-colors duration-300 -mt-[1px]" />

          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#C8C4BE] pt-5 px-5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#FF7120] font-bold">
                  {service.number}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-[#111111] uppercase font-bold">
                  // {service.tag}
                </span>
              </div>
              <div className="p-2 bg-[#F6F4F0] text-[#111111] group-hover:bg-[#FF7120] group-hover:text-black transition-all duration-200 group-hover:scale-110">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="px-5">
              {/* Title & Short Description */}
              <h3 className="font-mono text-lg md:text-xl font-bold uppercase tracking-tight text-[#111111] mb-2.5 group-hover:text-[#FF7120] transition-colors duration-200">
                {service.title}
              </h3>
              <p className="text-sm text-[#111111] font-medium leading-relaxed mb-4">
                {service.shortDesc}
              </p>

              {/* Deliverables snippet */}
              <ul className="space-y-1.5 pt-2 mb-6 border-t border-[#C8C4BE]">
                {service.deliverables.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#111111] font-medium font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7120] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#C8C4BE] flex items-center justify-between px-5 pb-5">
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.slice(0, 2).map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] bg-[#F6F4F0] text-[#111111] font-bold px-2 py-0.5 group-hover:bg-[#FF7120]/10 group-hover:text-[#FF7120] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="font-mono text-xs uppercase text-[#111111] flex items-center gap-1 group-hover:text-[#FF7120] transition-colors">
              <span>EXPLORE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </CornerBrackets>
      </TiltCard>
    </Link>
  );
}
