"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectItem } from "@/types";
import CornerBrackets from "@/components/common/CornerBrackets";
import TiltCard from "@/components/common/TiltCard";
import Badge from "@/components/common/Badge";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.id}`}
      className="block h-full group outline-hidden"
      data-interactive="true"
      data-cursor="VIEW CASE STUDY"
    >
      <TiltCard
        intensity={8}
        glare={true}
        className="h-full"
      >
        <CornerBrackets
          className="group flex flex-col justify-between h-full bg-white transition-all duration-300 hover:border-[#FF7120] hover:shadow-[0_12px_36px_rgba(255,113,32,0.18)] p-0 overflow-hidden"
        >
          {/* Thumbnail Area */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#161616]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* View overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
              <div className="flex items-center gap-2 bg-[#FF7120] text-black font-mono text-xs uppercase px-4 py-2 font-bold tracking-wider shadow-lg">
                <ExternalLink className="w-3.5 h-3.5" />
                OPEN CASE STUDY & MATRIX [→]
              </div>
            </div>

            <div className="absolute top-3 left-3 flex items-center gap-2">
              <Badge variant="dark" dot={true}>
                {project.category}
              </Badge>
              {project.clientLocation && (
                <span className="font-mono text-[10px] bg-black/80 text-[#C8C4BE] px-2 py-0.5 border border-[#333] hidden sm:inline-block">
                  {project.clientLocation}
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white font-mono text-xs">
              <span className="text-[#FF7120] font-bold truncate max-w-[55%]">{project.client}</span>
              <span className="bg-[#111111]/90 px-2 py-0.5 border border-[#333] text-[11px] text-[#00E5FF] font-medium tracking-tight">
                {project.metrics}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="font-mono text-xl font-black uppercase tracking-tight text-[#111111] mb-2 group-hover:text-[#FF7120] transition-colors flex items-center justify-between">
                <span>{project.title}</span>
                <ArrowUpRight className="w-4 h-4 text-[#111111] group-hover:text-[#FF7120] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
              </h3>

              {/* Service Badges */}
              {project.servicesBreakdown && project.servicesBreakdown.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.servicesBreakdown.map((sb, sbIdx) => (
                    <span
                      key={sbIdx}
                      className="font-mono text-[9px] uppercase font-bold bg-[#111111] text-[#FF7120] px-1.5 py-0.5 border border-[#111111]"
                    >
                      {sb.serviceTitle.replace(" Development", "").replace(" & Brand Identity", "").replace(" & Real-Time Backend", "")}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-sm text-[#111111] font-medium leading-relaxed mb-4 font-sans">
                {project.description}
              </p>
            </div>

            {/* Deliverable Tags */}
            <div className="pt-4 border-t border-[#C8C4BE] flex flex-wrap gap-1.5">
              {project.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] bg-[#F6F4F0] text-[#111111] font-bold px-2 py-0.5 group-hover:bg-[#FF7120]/10 group-hover:text-[#FF7120] transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </CornerBrackets>
      </TiltCard>
    </Link>
  );
}
