"use client";

import React from "react";
import Link from "next/link";
import { ProjectServiceBreakdown } from "@/types";
import CornerBrackets from "@/components/common/CornerBrackets";
import Badge from "@/components/common/Badge";
import { Layers, CheckCircle2, ArrowRight, Server, Smartphone, Globe, Palette, ShieldCheck } from "lucide-react";

interface ProjectServicesBreakdownProps {
  services: ProjectServiceBreakdown[];
  projectTitle: string;
}

const getServiceIcon = (serviceId: string) => {
  if (serviceId.includes("app")) return Smartphone;
  if (serviceId.includes("backend") || serviceId.includes("admin")) return Server;
  if (serviceId.includes("design") || serviceId.includes("ui")) return Palette;
  if (serviceId.includes("web")) return Globe;
  return Layers;
};

export default function ProjectServicesBreakdown({
  services,
  projectTitle,
}: ProjectServicesBreakdownProps) {
  if (!services || services.length === 0) return null;

  return (
    <CornerBrackets className="p-6 md:p-8 bg-white border border-[#C8C4BE] shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#C8C4BE] gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#FF7120]" />
          <h3 className="font-mono text-sm font-black uppercase tracking-widest text-[#111111]">
            // SEPARATED BY SERVICES &amp; ARCHITECTURE
          </h3>
        </div>
        <Badge variant="orange" dot={true}>
          {services.length} DEDICATED SERVICE LAYERS
        </Badge>
      </div>

      <p className="text-sm text-[#444444] font-medium font-sans mb-6">
        This project was architected, delivered, and decoupled across {services.length} dedicated engineering and design services:
      </p>

      <div className="space-y-6">
        {services.map((item, idx) => {
          const Icon = getServiceIcon(item.serviceId);
          // Determine matching service route if available
          const serviceSlug =
            item.serviceId === "app-dev"
              ? "app-dev"
              : item.serviceId === "web-dev"
              ? "web-dev"
              : item.serviceId === "web-design"
              ? "web-design"
              : null;

          return (
            <div
              key={idx}
              className="p-5 md:p-6 bg-[#FAF8F5] border border-[#C8C4BE] hover:border-[#FF7120] transition-colors relative overflow-hidden group"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#C8C4BE]/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-[#111111] text-[#FF7120] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#FF7120] font-bold uppercase tracking-wider block">
                      SERVICE LAYER 0{idx + 1}
                    </span>
                    <h4 className="font-mono text-base md:text-lg font-black uppercase text-[#111111]">
                      {item.serviceTitle}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs bg-white text-[#111111] font-bold px-2.5 py-1 border border-[#C8C4BE]">
                    {item.role}
                  </span>
                  {serviceSlug && (
                    <Link
                      href={`/services/${serviceSlug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#FF7120] font-bold hover:underline"
                    >
                      <span>VIEW SERVICE</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs md:text-sm text-[#333333] font-medium font-sans mb-4 leading-relaxed">
                {item.summary}
              </p>

              {/* Deliverables Checklist */}
              <div>
                <span className="font-mono text-[10px] text-[#777777] uppercase font-bold tracking-widest block mb-2">
                  DELIVERED CAPABILITIES:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {item.deliverables.map((deliv, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-2 text-xs font-sans text-[#111111] font-medium bg-white p-2.5 border border-[#C8C4BE]/60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7120] shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CornerBrackets>
  );
}
