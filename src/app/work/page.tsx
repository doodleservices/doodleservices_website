import React from "react";
import Link from "next/link";
import { PortfolioSection } from "@/features/portfolio";
import { ArrowLeft } from "lucide-react";

export default function WorkPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#141414] font-bold hover:text-[#FF7120] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF7120]" />
          <span>RETURN TO STUDIO HOME</span>
        </Link>
      </div>
      <PortfolioSection />
    </div>
  );
}
