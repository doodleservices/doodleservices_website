"use client";

import React from "react";
import { TeamMember } from "@/types";
import CornerBrackets from "@/components/common/CornerBrackets";
import TiltCard from "@/components/common/TiltCard";
import Badge from "@/components/common/Badge";

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <TiltCard
      intensity={8}
      glare={true}
      className="h-full"
    >
      <CornerBrackets
        className="flex flex-col justify-between h-full bg-white p-6 hover:border-[#FF7120] hover:shadow-[0_8px_24px_rgba(255,113,32,0.14)] transition-all duration-300 group overflow-hidden"
        data-interactive="true"
        data-cursor={member.name.toUpperCase()}
      >
        {/* Top stripe */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-[#FF7120] transition-colors duration-300" />

        <div>
          {/* Avatar / Initials block */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#C8C4BE]">
            <div className="w-12 h-12 bg-[#111111] text-[#FF7120] flex items-center justify-center font-mono font-bold text-base border border-[#111111] group-hover:border-[#FF7120] group-hover:shadow-[0_0_0_4px_rgba(255,113,32,0.15)] transition-all duration-300">
              {member.avatarInitials}
            </div>
            <Badge variant="subtle" dot={false}>
              {member.experience}
            </Badge>
          </div>

          <h3 className="font-mono text-lg font-black uppercase tracking-tight text-[#111111] mb-1 group-hover:text-[#FF7120] transition-colors duration-200">
            {member.name}
          </h3>
          <span className="font-mono text-xs text-[#FF7120] block mb-3 font-bold uppercase">
            {member.role}
          </span>

          <p className="text-xs text-[#111111] font-medium leading-relaxed font-sans mb-4">
            {member.bio}
          </p>
        </div>

        <div className="pt-3 border-t border-[#C8C4BE] flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] text-[#636058] font-bold uppercase block">
              SPECIALTY FOCUS:
            </span>
            <span className="font-mono text-xs text-[#111111] font-bold">
              {member.specialty}
            </span>
          </div>
          <div className="font-mono text-[10px] text-[#636058] font-bold group-hover:text-[#FF7120] transition-colors">
            STUDIO LEAD
          </div>
        </div>
      </CornerBrackets>
    </TiltCard>
  );
}
