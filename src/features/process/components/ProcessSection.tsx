"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/common/SectionHeader";
import { processData } from "@/resources/data/process.data";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [stepVisible, setStepVisible] = useState<boolean[]>(
    new Array(processData.length).fill(false)
  );
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-synced line fill
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const line = lineRef.current;
      if (!section || !line) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start filling when section enters, complete when section exits
      const start = rect.top - windowH * 0.8;
      const end = rect.bottom - windowH * 0.3;
      const progress = Math.min(Math.max(-start / (end - start), 0), 1);
      line.style.height = `${progress * 100}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Step visibility via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStepVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-12 md:py-16 border-b border-[#C8C4BE] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          number="03"
          category="INCUBATION PIPELINE // 4 STAGES"
          title="INCUBATION // RAPID SPRINT PROTOCOL"
          subtitle="A battle-tested 4-phase agile delivery pipeline ensuring rapid MVP launches, parallel workstreams, and verifiable engineering benchmarks."
          badgeText="ZERO FRICTION WORKFLOW"
        />

        {/* Vertical Timeline Layout */}
        <div className="relative mt-8">
          {/* Center vertical track line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden md:block"
            style={{ width: 2 }}
          >
            {/* Track (grey) */}
            <div className="absolute inset-0 bg-[#C8C4BE] rounded-full" />
            {/* Fill (orange) — scroll synced */}
            <div
              ref={lineRef}
              className="process-line-fill rounded-full"
              style={{ height: "0%" }}
            />
          </div>

          {/* Mobile: Left side line */}
          <div className="absolute left-6 top-0 bottom-0 block md:hidden" style={{ width: 2 }}>
            <div className="absolute inset-0 bg-[#C8C4BE] rounded-full" />
            <div ref={undefined} className="bg-[#FF7120] rounded-full" style={{ height: "100%", width: "100%" }} />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-20">
            {processData.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isVisible = stepVisible[idx];

              return (
                <div
                  key={step.stepNumber}
                  ref={(el) => { stepRefs.current[idx] = el; }}
                  className={`
                    relative flex items-center gap-0
                    flex-row md:flex-row
                    ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
                  `}
                >
                  {/* Content Panel */}
                  <div
                    className={`
                      w-full md:w-5/12 pl-16 md:pl-0
                      ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}
                      ${isEven
                        ? isVisible ? "process-step-left in-view" : "process-step-left"
                        : isVisible ? "process-step-right in-view" : "process-step-right"
                      }
                    `}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div
                      className={`
                        bg-white border border-[#C8C4BE] p-6 md:p-8
                        hover:border-[#FF7120] hover:shadow-[0_8px_32px_rgba(255,113,32,0.15)]
                        transition-all duration-300 group card-hover-glow
                        relative overflow-hidden
                      `}
                    >
                      {/* Orange accent top stripe on hover */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#FF7120] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                      <div className={`flex items-center gap-2 mb-4 ${isEven ? "md:flex-row-reverse md:justify-start" : ""}`}>
                        <span className="font-mono text-xs font-bold text-[#FF7120] bg-[#FF7120]/10 px-2 py-0.5">
                          {step.stepNumber}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                      </div>

                      <h3 className="font-mono text-xl md:text-2xl font-black uppercase tracking-tight text-[#111111] mb-3 group-hover:text-[#FF7120] transition-colors duration-200">
                        {step.title}
                      </h3>

                      <p className="text-sm text-[#111111] font-medium leading-relaxed mb-5 font-sans">
                        {step.description}
                      </p>

                      <div className={`pt-4 border-t border-[#C8C4BE] space-y-2 ${isEven ? "md:items-end md:flex md:flex-col" : ""}`}>
                        {step.highlights.map((highlight, hIdx) => (
                          <div
                            key={hIdx}
                            className={`flex items-center gap-2 text-xs text-[#111111] font-bold font-mono ${isEven ? "md:flex-row-reverse" : ""}`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7120] shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`mt-5 ${isEven ? "md:text-right" : ""}`}>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-[#FF7120] hover:gap-2.5 transition-all duration-200 group/link font-bold"
                          data-interactive="true"
                        >
                          <span>START THIS PHASE</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Center Dot (hidden on mobile) */}
                  <div className="hidden md:flex w-2/12 flex-col items-center relative z-10">
                    <div
                      className={`
                        relative w-10 h-10 rounded-full border-2 flex items-center justify-center
                        font-mono text-xs font-bold transition-all duration-500
                        ${isVisible
                          ? "bg-[#FF7120] border-[#FF7120] text-black shadow-[0_0_0_6px_rgba(255,113,32,0.2)]"
                          : "bg-white border border-[#C8C4BE] text-[#111111]"
                        }
                      `}
                    >
                      {idx + 1}
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12" />

                  {/* Mobile dot */}
                  <div
                    className={`
                      absolute left-3 top-8 md:hidden w-6 h-6 rounded-full border-2 flex items-center justify-center z-10
                      font-mono text-[10px] font-bold transition-all duration-500
                      ${isVisible
                        ? "bg-[#FF7120] border-[#FF7120] text-black"
                        : "bg-white border border-[#C8C4BE] text-[#111111]"
                      }
                    `}
                  >
                    {idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#111111] text-white font-mono text-sm font-bold uppercase px-8 py-4 hover:bg-[#FF7120] hover:text-black active:scale-[0.97] transition-all duration-200 ripple-effect"
            data-interactive="true"
          >
            INITIATE PIPELINE [→]
          </a>
        </div>
      </div>
    </section>
  );
}
