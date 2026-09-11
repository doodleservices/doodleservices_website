import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import TeamMemberCard from "./TeamMemberCard";
import { teamData } from "@/resources/data/team.data";
import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper";

export default function TeamSection() {
  return (
    <section id="team" className="py-12 md:py-16 border-b border-[#C8C4BE] bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          number="07"
          category="THE SPECIALISTS"
          title="STUDIO TEAM // BUILT BY BUILDERS"
          subtitle="Experienced software engineers, visual designers, motion animators, and growth strategists with decades of combined execution."
          badgeText="100% IN-HOUSE SENIOR TALENT"
        />

        <div
          className={`grid gap-6 ${
            teamData.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : teamData.length === 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
              : teamData.length === 3
              ? "grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {teamData.map((member, idx) => (
            <ScrollAnimationWrapper key={member.id} delay={idx * 80} className="h-full">
              <div className="h-full">
                <TeamMemberCard member={member} />
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
