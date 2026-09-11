import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "@/resources/data/services.data";
import { portfolioData } from "@/resources/data/portfolio.data";
import CornerBrackets from "@/components/common/CornerBrackets";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Terminal, Cpu, ShieldCheck } from "lucide-react";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const slugs: string[] = [];
  servicesData.forEach((s) => {
    slugs.push(s.id);
    if (s.id === "web-dev") slugs.push("web-development");
    if (s.id === "app-dev") slugs.push("app-development");
    if (s.id === "web-design") slugs.push("web-designing");
  });
  return slugs.map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  // Find matching service with slug aliasing
  const service = servicesData.find(
    (s) =>
      s.id === slug ||
      (s.id === "web-dev" && slug === "web-development") ||
      (s.id === "app-dev" && slug === "app-development") ||
      (s.id === "web-design" && slug === "web-designing")
  );

  if (!service) {
    notFound();
  }

  // Map discipline slug to delivered production case studies
  const serviceKey =
    slug === "web-development" ? "web-dev" :
    slug === "app-development" ? "app-dev" :
    slug === "web-designing" ? "web-design" :
    slug;

  const matchingProjects = portfolioData.filter((p) => {
    if (p.relatedServices?.includes(serviceKey)) return true;
    if (serviceKey === "web-dev") {
      return (
        p.category.toLowerCase().includes("web") ||
        p.deliverables.some((d) => d.toLowerCase().includes("web") || d.toLowerCase().includes("react"))
      );
    }
    if (serviceKey === "app-dev") {
      return (
        p.category.toLowerCase().includes("app") ||
        p.deliverables.some((d) => d.toLowerCase().includes("flutter") || d.toLowerCase().includes("app"))
      );
    }
    if (serviceKey === "web-design" || serviceKey === "editing" || serviceKey === "poster-creation") {
      return (
        p.category.toLowerCase().includes("design") ||
        p.category.toLowerCase().includes("ui") ||
        p.category.toLowerCase().includes("media")
      );
    }
    if (serviceKey === "seo") {
      return (
        p.category.toLowerCase().includes("seo") ||
        p.deliverables.some((d) => d.toLowerCase().includes("seo") || d.toLowerCase().includes("rag"))
      );
    }
    return false;
  });

  const displayProjects = matchingProjects.length > 0 ? matchingProjects : [portfolioData[0]];

  return (
    <div className="pt-28 md:pt-36 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#111111] font-bold hover:text-[#FF7120] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF7120]" />
            <span>RETURN TO ALL DISCIPLINES</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF7120] font-bold">
              [{service.number}]
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#111111] font-bold">
              // {service.tag}
            </span>
            <Badge variant="subtle">DISCIPLINE SPECIFICATION</Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-tight text-[#111111] leading-[1.05]">
            {service.title}
          </h1>

          <p className="mt-4 text-lg md:text-xl text-[#111111] font-medium font-sans max-w-2xl leading-relaxed">
            {service.fullDesc}
          </p>
        </div>

        {/* Technical Specification Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Deliverables Box */}
          <div className="lg:col-span-8">
            <CornerBrackets className="bg-white border border-[#C8C4BE] p-6 md:p-8 space-y-6 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-[#C8C4BE]">
                <h3 className="font-mono text-sm uppercase tracking-widest font-black text-[#111111]">
                  // CORE DELIVERABLE MATRIX
                </h3>
                <span className="font-mono text-[10px] text-[#111111] font-bold">
                  GUARANTEED SPRINT OUTPUTS
                </span>
              </div>

              <div className="space-y-4">
                {service.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#FBF9F7] border border-[#C8C4BE] flex items-start gap-3 hover:border-[#FF7120] transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FF7120] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-sm font-bold text-[#111111] block">
                        {item}
                      </span>
                      <span className="text-xs text-[#111111] font-medium font-sans block mt-0.5">
                        Production-ready output tested across devices, browsers, and edge environments.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CornerBrackets>
          </div>

          {/* Sidebar Tech Stack & Telemetry */}
          <div className="lg:col-span-4 space-y-6">
            <CornerBrackets className="bg-white border border-[#C8C4BE] p-6 space-y-4 shadow-md">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-black pb-2 border-b border-[#C8C4BE] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#FF7120]" />
                <span>TECHNOLOGY STACK</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs bg-[#F3EFEA] border border-[#C8C4BE] px-2.5 py-1 text-[#111111] font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CornerBrackets>

            <CornerBrackets className="bg-white border border-[#C8C4BE] text-[#111111] p-6 space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-[#FF7120] font-mono text-xs font-black">
                <Terminal className="w-4 h-4" />
                <span>SPRINT METRICS</span>
              </div>
              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-[#C8C4BE]">
                  <span className="text-[#111111] font-bold">Standard Turnaround</span>
                  <span className="text-[#FF7120] font-black">1 - 3 WEEKS</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#C8C4BE]">
                  <span className="text-[#111111] font-bold">Revisions Included</span>
                  <span className="text-[#111111] font-black">UNLIMITED</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#C8C4BE]">
                  <span className="text-[#111111] font-bold">Dedicated Lead</span>
                  <span className="text-[#111111] font-black">SENIOR ARCHITECT</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#111111] font-bold">IP Ownership</span>
                  <span className="text-[#FF7120] font-black">100% TRANSFERRED</span>
                </div>
              </div>
            </CornerBrackets>
          </div>
        </div>

        {/* Flagship Production Benchmarks Delivered Under This Service */}
        <div className="mt-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#C8C4BE] gap-2">
            <div>
              <span className="font-mono text-[10px] text-[#FF7120] uppercase tracking-widest font-black block">
                // PROVEN PRODUCTION CASE STUDIES
              </span>
              <h3 className="font-mono text-2xl font-black uppercase text-[#111111]">
                PROJECTS DELIVERED UNDER {service.title.toUpperCase()}
              </h3>
            </div>
            <span className="font-mono text-xs bg-[#111111] text-[#FF7120] px-3 py-1 font-bold">
              {displayProjects.length} BENCHMARKS AVAILABLE
            </span>
          </div>

          <div className="space-y-6">
            {displayProjects.map((p) => (
              <div key={p.id} className="bg-white border border-[#C8C4BE] p-6 md:p-8 shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-[#C8C4BE] gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#FF7120] uppercase tracking-widest font-black block mb-1">
                      {p.category}
                    </span>
                    <h4 className="font-mono text-xl font-black uppercase text-[#111111]">
                      {p.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#111111] font-bold bg-[#F6F4F0] px-3 py-1 border border-[#C8C4BE]">
                      {p.clientLocation || p.client}
                    </span>
                    <span className="font-mono text-xs font-black text-black bg-[#FF7120] px-3 py-1 border border-[#C8C4BE]">
                      {p.metrics}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 relative aspect-video overflow-hidden bg-[#161616] border border-[#C8C4BE]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-7 space-y-4">
                    <p className="text-sm text-[#111111] font-medium leading-relaxed font-sans">
                      {p.description}
                    </p>
                    {p.matrix && p.matrix.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                        {p.matrix.slice(0, 4).map((m, idx) => (
                          <div key={idx} className="bg-[#FAF8F5] p-2.5 border border-[#C8C4BE]">
                            <span className="text-[10px] text-[#111111] font-bold block">{m.metric}</span>
                            <span className="font-black text-[#FF7120] text-xs">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap gap-3">
                      <Link
                        href={`/work/${p.id}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs bg-[#FF7120] text-black px-4 py-2 hover:bg-white border border-[#FF7120] transition-colors shadow font-black"
                      >
                        <span>VIEW FULL CASE STUDY & SERVICES</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      {(p.demoLiveUrl || p.liveUrl || p.link) && (
                        <a
                          href={p.demoLiveUrl || p.liveUrl || p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs bg-[#111111] text-white px-4 py-2 hover:bg-[#252525] border border-[#111111] transition-colors shadow font-bold"
                        >
                          <span>LIVE DEMO [↗]</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 font-mono text-xs border border-[#C8C4BE] bg-white text-[#111111] font-bold px-6 py-3 hover:border-[#FF7120] hover:text-[#FF7120] transition-colors"
            >
              <span>EXPLORE COMPLETE PORTFOLIO ARCHIVES [→]</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
