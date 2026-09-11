"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";
import ProjectCard from "./ProjectCard";
import { portfolioData } from "@/resources/data/portfolio.data";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper";
import { ArrowRight, Layers, Smartphone, Globe, Server, Palette, Sparkles } from "lucide-react";

const filterTabs = [
  "ALL WORKS",
  "SEPARATE BY SERVICES",
  "WEB DEVELOPMENT",
  "APP DEVELOPMENT",
  "ADMIN & BACKEND",
  "UI/UX & DESIGN",
  "SEO & AI PLATFORMS",
];

interface ServiceGroup {
  id: string;
  number: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  serviceSlug: string;
  match: (project: (typeof portfolioData)[0]) => boolean;
}

const serviceGroups: ServiceGroup[] = [
  {
    id: "app-dev",
    number: "01",
    name: "Mobile App Development",
    icon: Smartphone,
    description: "Cross-platform iOS & Android mobile applications, fluid 60fps UX, offline-first architectures, and live commerce ribbons.",
    serviceSlug: "app-dev",
    match: (p) =>
      p.relatedServices?.includes("app-dev") ||
      p.category.toLowerCase().includes("app") ||
      p.deliverables.some((d) => d.toLowerCase().includes("flutter") || d.toLowerCase().includes("app")),
  },
  {
    id: "web-dev",
    number: "02",
    name: "Web Development & Storefronts",
    icon: Globe,
    description: "High-performance enterprise Next.js, React, and TypeScript web platforms engineered for conversion and speed.",
    serviceSlug: "web-dev",
    match: (p) =>
      p.relatedServices?.includes("web-dev") ||
      p.category.toLowerCase().includes("web") ||
      p.deliverables.some((d) => d.toLowerCase().includes("web") || d.toLowerCase().includes("react")),
  },
  {
    id: "admin-backend",
    number: "03",
    name: "Admin Panels & Real-Time Backend Systems",
    icon: Server,
    description: "Mission-critical merchant control panels, daily rate controllers, automated background ingestion, and Node/FastAPI microservices.",
    serviceSlug: "web-dev",
    match: (p) =>
      p.category.toLowerCase().includes("admin") ||
      p.category.toLowerCase().includes("backend") ||
      p.deliverables.some((d) => d.toLowerCase().includes("admin") || d.toLowerCase().includes("backend") || d.toLowerCase().includes("microservice") || d.toLowerCase().includes("sync")),
  },
  {
    id: "ui-ux",
    number: "04",
    name: "UI/UX & Brand Design Systems",
    icon: Palette,
    description: "Bespoke digital design systems, luxury noir & gold aesthetics, ergonomic thumb layouts, and component libraries.",
    serviceSlug: "web-design",
    match: (p) =>
      p.relatedServices?.includes("web-design") ||
      p.category.toLowerCase().includes("ui") ||
      p.category.toLowerCase().includes("design") ||
      p.deliverables.some((d) => d.toLowerCase().includes("ui") || d.toLowerCase().includes("design") || d.toLowerCase().includes("canvas")),
  },
  {
    id: "ai-seo",
    number: "05",
    name: "Autonomous AI & SEO Platforms",
    icon: Sparkles,
    description: "Agentic RAG reasoning loops, vector databases, high-precision semantic retrieval, and technical SEO architecture.",
    serviceSlug: "seo",
    match: (p) =>
      p.relatedServices?.includes("seo") ||
      p.category.toLowerCase().includes("seo") ||
      p.deliverables.some((d) => d.toLowerCase().includes("seo") || d.toLowerCase().includes("ai") || d.toLowerCase().includes("rag")),
  },
];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("ALL WORKS");

  const filteredProjects =
    activeTab === "ALL WORKS" || activeTab === "SEPARATE BY SERVICES"
      ? portfolioData
      : portfolioData.filter((p) => {
          const tab = activeTab.toLowerCase();
          if (tab === "web development") {
            return (
              p.relatedServices?.includes("web-dev") ||
              p.category.toLowerCase().includes("web") ||
              p.deliverables.some((d) => d.toLowerCase().includes("web") || d.toLowerCase().includes("react") || d.toLowerCase().includes("next"))
            );
          }
          if (tab === "app development") {
            return (
              p.relatedServices?.includes("app-dev") ||
              p.category.toLowerCase().includes("app") ||
              p.deliverables.some((d) => d.toLowerCase().includes("flutter") || d.toLowerCase().includes("app") || d.toLowerCase().includes("ios"))
            );
          }
          if (tab === "admin & backend") {
            return (
              p.category.toLowerCase().includes("admin") ||
              p.category.toLowerCase().includes("backend") ||
              p.deliverables.some((d) => d.toLowerCase().includes("admin") || d.toLowerCase().includes("backend") || d.toLowerCase().includes("microservice") || d.toLowerCase().includes("sync"))
            );
          }
          if (tab === "ui/ux & design") {
            return (
              p.relatedServices?.includes("web-design") ||
              p.category.toLowerCase().includes("ui/ux") ||
              p.category.toLowerCase().includes("design") ||
              p.deliverables.some((d) => d.toLowerCase().includes("ui") || d.toLowerCase().includes("design") || d.toLowerCase().includes("canvas"))
            );
          }
          if (tab === "seo & ai platforms") {
            return (
              p.relatedServices?.includes("seo") ||
              p.category.toLowerCase().includes("seo") ||
              p.deliverables.some((d) => d.toLowerCase().includes("seo") || d.toLowerCase().includes("rag") || d.toLowerCase().includes("ai") || d.toLowerCase().includes("vector"))
            );
          }
          return p.category.toLowerCase().includes(tab);
        });

  return (
    <section id="portfolio" className="py-12 md:py-16 border-b border-[#C8C4BE]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6 pb-4 border-b border-[#C8C4BE]">
          <SectionHeader
            number="04"
            category="OUR INCUBATIONS // SELECTED WORKS"
            title="PORT FOLIO // PRODUCTION ARCHIVES"
            subtitle="Explore how our senior engineering squad, native mobile platforms, UI/UX design systems, and autonomous AI architectures power international startups and global enterprises."
            badgeText="PORTFOLIO ARCHIVE"
            className="mb-0"
          />

          {/* ChainGPT Labs Signature Project Counter Module */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white border border-[#C8C4BE] p-3.5 shadow-sm flex items-center justify-between gap-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#777] font-bold block">
                  ALL DEPLOYED PROJECTS
                </span>
                <span className="font-stencil text-3xl font-black text-[#111111] block leading-none mt-1">
                  {portfolioData.length}
                </span>
              </div>
              <div className="w-8 h-8 bg-[#111111] text-[#FF7120] flex items-center justify-center chamfer-br">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <Button href="#contact" variant="primary" size="sm" chamfer={true}>
              INQUIRE ARCHITECTURE
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-[#C8C4BE]/60 font-mono text-xs">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 transition-all uppercase whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab
                  ? "bg-[#FF7120] text-black font-bold border border-[#FF7120] shadow-sm"
                  : "bg-white/80 text-[#555] border border-[#C8C4BE] hover:border-[#FF7120] hover:text-[#111111]"
              }`}
            >
              {tab === "SEPARATE BY SERVICES" && <Layers className="w-3.5 h-3.5" />}
              <span>{tab}</span>
            </button>
          ))}
        </div>

        {/* VIEW 1: SEPARATE BY SERVICES CLUSTERS */}
        {activeTab === "SEPARATE BY SERVICES" ? (
          <div className="space-y-14">
            {serviceGroups.map((grp) => {
              const groupProjects = portfolioData.filter(grp.match);
              if (groupProjects.length === 0) return null;
              const Icon = grp.icon;

              return (
                <div
                  key={grp.id}
                  className="bg-white/60 p-6 md:p-8 border border-[#C8C4BE] shadow-xs"
                >
                  {/* Service Cluster Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#C8C4BE] gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-[#111111] text-[#FF7120] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#FF7120]">
                            // SERVICE [{grp.number}]
                          </span>
                          <span className="font-mono text-[11px] text-[#888]">
                            {groupProjects.length} PROJECT{groupProjects.length > 1 ? "S" : ""}
                          </span>
                        </div>
                        <h3 className="font-mono text-xl font-black uppercase text-[#111111]">
                          {grp.name}
                        </h3>
                      </div>
                    </div>

                    <Link
                      href={`/services/${grp.serviceSlug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#111111] hover:text-[#FF7120] font-bold border border-[#C8C4BE] px-3 py-1.5 bg-white transition-colors"
                    >
                      <span>EXPLORE DISCIPLINE</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF7120]" />
                    </Link>
                  </div>

                  <p className="text-xs text-[#555] font-sans font-medium mb-6 max-w-2xl">
                    {grp.description}
                  </p>

                  {/* Projects in this Service Cluster */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {groupProjects.map((project, idx) => (
                      <ScrollAnimationWrapper key={`${grp.id}-${project.id}`} delay={idx * 60} className="h-full">
                        <ProjectCard project={project} />
                      </ScrollAnimationWrapper>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* VIEW 2: STANDARD FILTERED / ALL GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => (
              <ScrollAnimationWrapper key={project.id} delay={idx * 80} className="h-full">
                <ProjectCard project={project} />
              </ScrollAnimationWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
