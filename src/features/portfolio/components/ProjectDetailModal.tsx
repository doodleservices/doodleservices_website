"use client";

import React, { useEffect } from "react";
import { X, ArrowUpRight, ExternalLink, Activity, Globe, ShieldCheck, Cpu } from "lucide-react";
import { ProjectItem } from "@/types";
import Badge from "@/components/common/Badge";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm backdrop-enter"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 z-[1001] w-full max-w-2xl bg-[#E5E4E0] border-l border-[#C8C4BE] shadow-2xl modal-enter flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C8C4BE] bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Badge variant="orange" dot={true}>
              {project.category}
            </Badge>
            <span className="font-mono text-xs text-[#888] uppercase tracking-wider">
              ENTERPRISE CASE STUDY
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-[#C8C4BE] bg-white hover:bg-[#FF7120] hover:text-black hover:border-[#FF7120] transition-all duration-200 group"
            data-interactive="true"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Thumbnail */}
          <div className="relative h-64 bg-[#161616] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-[#FF7120] font-bold text-sm block">
                  {project.client}
                </span>
                {project.clientLocation && (
                  <span className="font-mono text-[11px] text-[#A09890] flex items-center gap-1 mt-0.5">
                    <Globe className="w-3 h-3 text-[#00E5FF]" />
                    {project.clientLocation}
                  </span>
                )}
              </div>
              <span className="bg-[#111111]/95 text-[#00E5FF] px-2.5 py-1 font-mono text-xs border border-[#333] shadow">
                {project.metrics}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Title & Overview */}
            <div>
              <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-[#111111] mb-2 flex items-center gap-2">
                {project.title}
              </h2>
              <p className="text-sm text-[#55524E] leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white border border-[#C8C4BE] p-3.5">
                <span className="block font-mono text-[10px] uppercase text-[#888] mb-1">CLIENT ORIGIN</span>
                <span className="font-mono text-xs font-bold text-[#111111] truncate block">
                  {project.clientLocation || project.client}
                </span>
              </div>
              <div className="bg-white border border-[#C8C4BE] p-3.5">
                <span className="block font-mono text-[10px] uppercase text-[#888] mb-1">DISCIPLINE</span>
                <span className="font-mono text-xs font-bold text-[#111111] truncate block">
                  {project.category}
                </span>
              </div>
              <div className="bg-white border border-[#C8C4BE] p-3.5 col-span-2 sm:col-span-1">
                <span className="block font-mono text-[10px] uppercase text-[#888] mb-1">PRIMARY KPI</span>
                <span className="font-mono text-xs font-bold text-[#FF7120] truncate block">
                  {project.metrics}
                </span>
              </div>
            </div>

            {/* Performance Matrix Section */}
            {project.matrix && project.matrix.length > 0 && (
              <div className="bg-white border border-[#C8C4BE] p-4">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#C8C4BE]">
                  <Activity className="w-4 h-4 text-[#FF7120]" />
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111]">
                    // ENGINEERING & PERFORMANCE MATRIX
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.matrix.map((m, idx) => (
                    <div key={idx} className="bg-[#FAF8F5] p-3 border border-[#E8E3DD]">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-mono text-[11px] font-bold text-[#333]">
                          {m.metric}
                        </span>
                        <span className="font-mono text-sm font-bold text-[#FF7120]">
                          {m.value}
                        </span>
                      </div>
                      {m.context && (
                        <p className="text-[11px] text-[#666] font-sans leading-tight">
                          {m.context}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* International Architecture & Compliance Banner */}
            {project.internationalAppeal && (
              <div className="bg-[#111111] text-white p-4 border-l-4 border-[#00E5FF]">
                <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-[#00E5FF] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  GLOBAL ENTERPRISE SLA & COMPLIANCE
                </div>
                <p className="text-xs text-[#C8C2BC] leading-relaxed font-sans">
                  {project.internationalAppeal}
                </p>
              </div>
            )}

            {/* Deliverables */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#888] mb-3">
                // DELIVERABLES & SHIPMENTS
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs bg-white border border-[#C8C4BE] text-[#333] px-3 py-1.5 hover:border-[#FF7120] hover:text-[#FF7120] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Cpu className="w-3.5 h-3.5 text-[#FF7120]" />
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#888]">
                    // CORE TECHNOLOGY STACK
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] bg-[#111111] text-[#E0DDD9] px-2.5 py-1 border border-[#333]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="pt-4 border-t border-[#C8C4BE] flex flex-col sm:flex-row gap-3">
              {(project.demoLiveUrl || project.liveUrl || project.link) && (
                <a
                  href={project.demoLiveUrl || project.liveUrl || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#111111] text-white font-mono text-xs font-bold uppercase py-3 px-4 hover:bg-[#252525] border border-[#111111] transition-all shadow"
                  data-interactive="true"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#00E5FF]" />
                  EXPLORE DEMO LIVE URL [↗]
                </a>
              )}
              <a
                href="#contact"
                onClick={onClose}
                className="flex-1 block text-center bg-[#FF7120] text-black font-mono text-xs font-bold uppercase py-3 px-4 hover:bg-[#E85800] active:scale-[0.98] transition-all"
                data-interactive="true"
              >
                REQUEST SIMILAR ARCHITECTURE [→]
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
