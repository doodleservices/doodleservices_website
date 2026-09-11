import React from "react";
import { metricsData } from "@/resources/data/metrics.data";

export default function MetricsRibbon() {
  return (
    <section className="border-b border-[#C8C4BE] bg-white/75 backdrop-blur-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2">
        <div className="flex items-center justify-between py-2 border-b border-[#C8C4BE]">
          <div className="flex items-center gap-2">
            <span className="coord-square shadow-[0_0_8px_rgba(255,113,32,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#111111] font-bold">
              VERIFIED BENCHMARKS // TELEMETRY
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#888] font-bold">
            LATENCY_AUDIT_OK
          </span>
        </div>

        {/* Flush Architectural CAD Grid Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#C8C4BE] border-b border-[#C8C4BE]">
          {metricsData.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-transparent hover:bg-white transition-all group relative cursor-default"
            >
              {/* Corner coordinate indicator */}
              <span className="coord-square absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-stencil text-4xl md:text-5xl font-black tracking-tight text-[#111111] group-hover:text-[#FF7120] transition-colors">
                  {item.value}
                </span>
                {item.suffix && (
                  <span className="font-stencil text-2xl md:text-3xl font-black text-[#FF7120]">
                    {item.suffix}
                  </span>
                )}
              </div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-bold mb-2">
                // {item.label}
              </h4>
              <p className="text-xs text-[#55524E] leading-relaxed font-mono">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
