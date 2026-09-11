import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import FaqAccordion from "./FaqAccordion";
import { faqData } from "@/resources/data/faq.data";

export default function FaqSection() {
  return (
    <section id="faq" className="py-12 md:py-16 border-b border-[#C8C4BE]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          number="08"
          category="FREQUENT INQUIRIES // VERIFIED POLICIES"
          title="FAQ // ANSWERS BEFORE YOU ASK"
          subtitle="Everything you need to know about our 8 core disciplines, 1-3 week sprint velocity, enterprise tech stack, full IP ownership, and post-launch maintenance."
          badgeText="CLEAR POLICIES"
          align="center"
        />

        <FaqAccordion items={faqData} />
      </div>
    </section>
  );
}
