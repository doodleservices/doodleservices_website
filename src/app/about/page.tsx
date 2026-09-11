import React from "react";
import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";
import CornerBrackets from "@/components/common/CornerBrackets";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { siteConfig } from "@/resources/data/siteConfig";
import { ArrowLeft, CheckCircle2, Shield, Zap, RefreshCw, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#111111] font-bold hover:text-[#FF7120] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF7120]" />
            <span>RETURN TO STUDIO HOME</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#FF7120] font-bold">[ABOUT]</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#111111] font-bold">
              // STUDIO GENESIS
            </span>
            <Badge variant="subtle">DOODLE SERVICES</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-tight text-[#111111] leading-[1.05]">
            WHY DOODLE SERVICES EXISTS
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#111111] font-medium font-sans leading-relaxed max-w-2xl">
            {siteConfig.positioning}
          </p>
        </div>

        {/* The Problem & Solution Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <CornerBrackets className="bg-white border border-[#C8C4BE] p-6 md:p-8 space-y-4 shadow-md">
            <span className="font-mono text-xs text-[#FF7120] uppercase font-black">
              // THE FRAGMENTATION PROBLEM
            </span>
            <h3 className="font-mono text-xl font-black uppercase text-[#111111]">
              THE HEADACHE OF 5 DIFFERENT FREELANCERS
            </h3>
            <p className="text-sm text-[#111111] font-medium leading-relaxed font-sans">
              Founders and businesses waste dozens of hours each week coordinating disparate freelancers. The web developer waits for the UI designer, the motion animator uses conflicting assets, and nobody optimizes for technical SEO until the end.
            </p>
          </CornerBrackets>

          <CornerBrackets className="bg-white border border-[#C8C4BE] text-[#111111] p-6 md:p-8 space-y-4 shadow-md">
            <span className="font-mono text-xs text-[#FF7120] uppercase font-black">
              // THE DOODLE ADVANTAGE
            </span>
            <h3 className="font-mono text-xl font-black uppercase text-[#111111]">
              ONE STUDIO. ONE TIMELINE. ZERO COMPROMISE.
            </h3>
            <p className="text-sm text-[#111111] font-medium leading-relaxed font-sans">
              At Doodle Services, code, design, animation, video editing, and SEO happen in parallel under one unified architecture. Every deliverable is cohesive, delivered 2x faster, and managed through a single direct point of contact.
            </p>
          </CornerBrackets>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <SectionHeader
            number="02"
            category="FOUNDATIONAL PRINCIPLES"
            title="OUR OPERATING PILLARS"
            subtitle="The 4 non-negotiable commitments that guide every project we undertake."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-[#C8C4BE] hover:border-[#FF7120] transition-colors">
              <Zap className="w-6 h-6 text-[#FF7120] mb-3" />
              <h4 className="font-mono text-lg font-black uppercase text-[#111111] mb-2">
                VELOCITY & PARALLEL EXECUTION
              </h4>
              <p className="text-xs md:text-sm text-[#111111] font-medium">
                We do not work in serial silos. Design and development proceed concurrently from Day 1 to ship in 1-3 weeks.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#C8C4BE] hover:border-[#FF7120] transition-colors">
              <Eye className="w-6 h-6 text-[#FF7120] mb-3" />
              <h4 className="font-mono text-lg font-black uppercase text-[#111111] mb-2">
                UNIFIED CREATIVE HARMONY
              </h4>
              <p className="text-xs md:text-sm text-[#111111] font-medium">
                The visual identity in your app matches your video edits, web micro-interactions, and campaign posters identically.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#C8C4BE] hover:border-[#FF7120] transition-colors">
              <RefreshCw className="w-6 h-6 text-[#FF7120] mb-3" />
              <h4 className="font-mono text-lg font-black uppercase text-[#111111] mb-2">
                DIRECT FOUNDER ACCESS
              </h4>
              <p className="text-xs md:text-sm text-[#111111] font-medium">
                No account managers playing telephone. You speak directly with the architects and creatives executing your project.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#C8C4BE] hover:border-[#FF7120] transition-colors">
              <Shield className="w-6 h-6 text-[#FF7120] mb-3" />
              <h4 className="font-mono text-lg font-black uppercase text-[#111111] mb-2">
                POST-LAUNCH ACCOUNTABILITY
              </h4>
              <p className="text-xs md:text-sm text-[#111111] font-medium">
                We do not vanish after deployment. We provide dedicated warranty support, maintenance retainers, and search telemetry.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-[#111111] text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#333]">
          <div>
            <h3 className="font-mono text-xl font-bold uppercase text-white">
              READY TO BUILD WITH US?
            </h3>
            <p className="text-xs text-[#AAA] font-sans mt-1">
              Tell us about your project and receive a custom, transparent quote.
            </p>
          </div>
          <Button href="/#contact" variant="primary" size="md">
            GET A PROPOSAL [→]
          </Button>
        </div>
      </div>
    </div>
  );
}
