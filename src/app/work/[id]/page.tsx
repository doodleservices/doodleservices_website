import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { portfolioData } from "@/resources/data/portfolio.data";
import CornerBrackets from "@/components/common/CornerBrackets";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import ProjectScreenshotsGallery from "@/features/portfolio/components/ProjectScreenshotsGallery";
import ProjectServicesBreakdown from "@/features/portfolio/components/ProjectServicesBreakdown";
import {
  ArrowLeft,
  ExternalLink,
  Activity,
  Globe,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
} from "lucide-react";

interface WorkDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  const ids: string[] = [];
  portfolioData.forEach((p) => {
    ids.push(p.id);
    // Also allow clean slug without proj- prefix
    if (p.id.startsWith("proj-")) {
      ids.push(p.id.replace("proj-", ""));
    }
  });
  return ids.map((id) => ({ id }));
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;

  // Find project by id or clean slug
  const project = portfolioData.find(
    (p) =>
      p.id === id ||
      p.id === `proj-${id}` ||
      p.id.replace("proj-", "") === id
  );

  if (!project) {
    notFound();
  }

  const liveDemoLink = project.demoLiveUrl || project.liveUrl || project.link;

  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#111111] font-bold hover:text-[#FF7120] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF7120] group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO SELECTED WORKS</span>
          </Link>

          <span className="font-mono text-[10px] uppercase tracking-widest text-[#111111] font-bold hidden sm:inline">
            CASE STUDY // {project.id.toUpperCase()}
          </span>
        </div>

        {/* Hero Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="orange" dot={true}>
              {project.category}
            </Badge>
            {project.clientLocation && (
              <span className="font-mono text-xs bg-white border border-[#C8C4BE] text-[#111111] font-bold px-2.5 py-0.5 flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-[#FF7120]" />
                {project.clientLocation}
              </span>
            )}
            <span className="font-mono text-xs bg-[#FF7120] text-black font-black px-2.5 py-0.5 border border-[#C8C4BE]">
              {project.metrics}
            </span>
          </div>

          <h1 className="font-mono text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111111] mb-4">
            {project.title}
          </h1>

          <p className="text-base md:text-lg text-[#111111] font-medium max-w-3xl leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Hero Image Showcase */}
        <CornerBrackets className="w-full bg-white p-2 border border-[#C8C4BE] shadow-xl relative overflow-hidden mb-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#161616]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover opacity-95"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs text-white/80 uppercase font-bold block">
                  PARTNER / CLIENT
                </span>
                <span className="font-mono text-sm md:text-base font-black text-white">
                  {project.client}
                </span>
              </div>
              {liveDemoLink && (
                <a
                  href={liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs bg-[#FF7120] text-black font-black uppercase px-3 py-1 hover:bg-white transition-colors"
                >
                  <span>LIVE DEMO [↗]</span>
                </a>
              )}
            </div>
          </div>
        </CornerBrackets>

        {/* Live System Screenshots & Production Views */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-12">
            <ProjectScreenshotsGallery
              screenshots={project.screenshots}
              projectTitle={project.title}
            />
          </div>
        )}

        {/* Separated Services Breakdown */}
        {project.servicesBreakdown && project.servicesBreakdown.length > 0 && (
          <div className="mb-12">
            <ProjectServicesBreakdown
              services={project.servicesBreakdown}
              projectTitle={project.title}
            />
          </div>
        )}

        {/* Deep Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Performance & Engineering Matrix */}
            {project.matrix && project.matrix.length > 0 && (
              <CornerBrackets className="p-6 bg-white border border-[#C8C4BE] shadow-md">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#C8C4BE]">
                  <Activity className="w-4 h-4 text-[#FF7120]" />
                  <h3 className="font-mono text-sm font-black uppercase tracking-widest text-[#111111]">
                    // ENGINEERING BENCHMARKS & KPIs
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.matrix.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#FAF8F5] border border-[#C8C4BE] hover:border-[#FF7120] transition-colors"
                    >
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-[#111111]">
                          {m.metric}
                        </span>
                        <span className="font-mono text-lg font-black text-[#FF7120]">
                          {m.value}
                        </span>
                      </div>
                      {m.context && (
                        <p className="text-xs text-[#111111] font-medium font-sans leading-relaxed">
                          {m.context}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CornerBrackets>
            )}

            {/* Architecture / International Appeal */}
            {project.internationalAppeal && (
              <div className="p-6 bg-white border border-[#C8C4BE] border-l-4 border-l-[#FF7120] shadow-md">
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FF7120] font-black uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>GLOBAL ENTERPRISE SLA & RELIABILITY</span>
                </div>
                <p className="text-sm text-[#111111] font-medium leading-relaxed font-sans">
                  {project.internationalAppeal}
                </p>
              </div>
            )}

            {/* Shipments & Deliverables */}
            <CornerBrackets className="p-6 bg-white border border-[#C8C4BE] shadow-md">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#C8C4BE]">
                <Layers className="w-4 h-4 text-[#FF7120]" />
                <h3 className="font-mono text-sm font-black uppercase tracking-widest text-[#111111]">
                  // DELIVERED SPECIFICATIONS
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-[#111111] font-bold font-sans p-2.5 bg-[#FAF8F5] border border-[#C8C4BE]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CornerBrackets>
          </div>

          {/* Sidebar & Tech Specs (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Project Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <CornerBrackets className="p-6 bg-white border border-[#C8C4BE] shadow-md">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#C8C4BE]">
                  <Cpu className="w-4 h-4 text-[#FF7120]" />
                  <h4 className="font-mono text-xs font-black uppercase tracking-widest text-[#111111]">
                    STACK & RUNTIME
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs bg-[#111111] text-white px-2.5 py-1 border border-[#111111] font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CornerBrackets>
            )}

            {/* Live Demo Direct Box */}
            {liveDemoLink && (
              <CornerBrackets className="p-6 bg-white border border-[#C8C4BE] text-[#111111] space-y-4 shadow-md">
                <div className="font-mono text-xs text-[#FF7120] font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF7120] animate-ping" />
                  <span>PRODUCTION RUNTIME LIVE</span>
                </div>
                <p className="text-xs text-[#111111] font-medium font-mono leading-relaxed">
                  Test the deployed production app in live cloud infrastructure:
                </p>
                <a
                  href={liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#FF7120] hover:bg-[#D0531D] text-black font-mono text-xs font-black uppercase py-3 px-4 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>EXPLORE DEMO LIVE URL [↗]</span>
                </a>
              </CornerBrackets>
            )}

            {/* Engagement Box */}
            <CornerBrackets className="p-6 bg-white border border-[#C8C4BE] space-y-4 shadow-md">
              <h4 className="font-mono text-xs font-black uppercase tracking-widest text-[#111111] pb-2 border-b border-[#C8C4BE]">
                NEED SIMILAR RESULTS?
              </h4>
              <p className="text-xs text-[#111111] font-medium font-sans leading-relaxed">
                We design and engineer bespoke software systems with 1-2 week production sprints.
              </p>
              <Button href="/#contact" variant="primary" size="md" className="w-full">
                START PROJECT ENGAGEMENT [→]
              </Button>
            </CornerBrackets>
          </div>
        </div>
      </div>
    </div>
  );
}
