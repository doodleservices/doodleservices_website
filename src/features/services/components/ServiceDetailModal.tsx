"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { ServiceItem } from "@/types";
import {
  Code2, Smartphone, Palette, Sliders, Film, Clapperboard, LayoutGrid, TrendingUp
} from "lucide-react";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Code2, Smartphone, Palette, Sliders, Film, Clapperboard, LayoutGrid, TrendingUp,
};

export default function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const Icon = service ? (iconMap[service.iconName] || Code2) : Code2;

  useEffect(() => {
    if (!service) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm backdrop-enter"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 bottom-0 z-[1001] w-full max-w-xl bg-[#E5E4E0] border-l border-[#C8C4BE] shadow-2xl modal-enter flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C8C4BE] bg-[#111111] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF7120]">
              <Icon className="w-4 h-4 text-black" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-[#888] block">{service.number} — SERVICE DETAIL</span>
              <span className="font-mono text-sm font-bold uppercase text-white">{service.title}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-[#444] text-white hover:bg-[#FF7120] hover:border-[#FF7120] hover:text-black transition-all duration-200"
            data-interactive="true"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-sm text-[#55524E] leading-relaxed font-sans">{service.shortDesc}</p>
          </div>

          {/* Full Deliverables */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#888] mb-3">// FULL DELIVERABLES</h3>
            <ul className="space-y-2">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#222] font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#888] mb-3">// TECHNOLOGY STACK</h3>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs bg-white border border-[#C8C4BE] text-[#333] px-3 py-1 hover:border-[#FF7120] hover:text-[#FF7120] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-[#C8C4BE]">
            <a
              href="#contact"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 bg-[#FF7120] text-black font-mono text-sm font-bold uppercase py-3 px-6 hover:bg-[#E85800] active:scale-[0.98] transition-all duration-150"
              data-interactive="true"
            >
              REQUEST THIS SERVICE
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
