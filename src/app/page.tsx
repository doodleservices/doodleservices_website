import React from "react";
import { Hero } from "@/features/hero";
import { MetricsRibbon } from "@/features/metrics";
import { ScrollHighlightManifesto } from "@/features/manifesto";
import { ServicesSection } from "@/features/services";
import { ProcessSection } from "@/features/process";
import { PortfolioSection } from "@/features/portfolio";
import { PricingSection } from "@/features/pricing";
import { TestimonialsSection } from "@/features/testimonials";
import { TeamSection } from "@/features/team";
import { FaqSection } from "@/features/faq";
import { ContactSection } from "@/features/contact";
import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper";

export default function HomePage() {
  return (
    <>
      {/* 01. Hero Section with Cybernetic 3D Robot Mech Canvas */}
      <Hero />

      {/* 02. Metrics & Telemetry Ribbon */}
      <ScrollAnimationWrapper delay={50}>
        <MetricsRibbon />
      </ScrollAnimationWrapper>

      {/* 02.5. Wembi-Style Scroll-Driven Highlighting Manifesto */}
      <ScrollAnimationWrapper>
        <ScrollHighlightManifesto />
      </ScrollAnimationWrapper>

      {/* 03. All 8 Core Disciplines Bento Section */}
      <ScrollAnimationWrapper>
        <ServicesSection />
      </ScrollAnimationWrapper>

      {/* 04. Unified 4-Phase Delivery Pipeline */}
      <ScrollAnimationWrapper>
        <ProcessSection />
      </ScrollAnimationWrapper>

      {/* 05. Selected Portfolio Works & Prototypes */}
      <ScrollAnimationWrapper>
        <PortfolioSection />
      </ScrollAnimationWrapper>

      {/* 06. Transparent Sprint Packages */}
      <ScrollAnimationWrapper>
        <PricingSection />
      </ScrollAnimationWrapper>

      {/* 07. Verified Founder Testimonials */}
      <ScrollAnimationWrapper>
        <TestimonialsSection />
      </ScrollAnimationWrapper>

      {/* 08. Senior Studio Specialists Team */}
      <ScrollAnimationWrapper>
        <TeamSection />
      </ScrollAnimationWrapper>

      {/* 09. Interactive Technical FAQ */}
      <ScrollAnimationWrapper>
        <FaqSection />
      </ScrollAnimationWrapper>

      {/* 10. Direct Proposal Transmission / Contact Form */}
      <ScrollAnimationWrapper>
        <ContactSection />
      </ScrollAnimationWrapper>
    </>
  );
}
