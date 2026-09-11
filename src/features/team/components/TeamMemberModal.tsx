"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { TeamMember } from "@/types";
import Badge from "@/components/common/Badge";

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  useEffect(() => {
    if (!member) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm backdrop-enter"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 bottom-0 z-[1001] w-full max-w-md bg-[#E5E4E0] border-l border-[#C8C4BE] shadow-2xl modal-enter flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C8C4BE] bg-white">
          <span className="font-mono text-xs uppercase text-[#888]">TEAM MEMBER</span>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-[#C8C4BE] bg-white hover:bg-[#FF7120] hover:text-black hover:border-[#FF7120] transition-all duration-200"
            data-interactive="true"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Avatar + info */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-[#111111] text-[#FF7120] flex items-center justify-center font-mono font-bold text-2xl border-2 border-[#FF7120] shrink-0 animate-orange-pulse">
              {member.avatarInitials}
            </div>
            <div>
              <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-[#111111]">
                {member.name}
              </h2>
              <span className="font-mono text-sm text-[#FF7120] font-semibold uppercase block">
                {member.role}
              </span>
              <Badge variant="subtle" dot={false} className="mt-1">
                {member.experience}
              </Badge>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#888] mb-2">// BIO</h3>
            <p className="text-sm text-[#55524E] leading-relaxed font-sans">{member.bio}</p>
          </div>

          {/* Specialty */}
          <div className="bg-white border border-[#C8C4BE] p-4">
            <span className="font-mono text-[10px] uppercase text-[#888] block mb-1">SPECIALTY FOCUS</span>
            <span className="font-mono text-sm font-bold text-[#111111]">{member.specialty}</span>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-[#C8C4BE]">
            <a
              href="#contact"
              onClick={onClose}
              className="w-full block text-center bg-[#111111] text-white font-mono text-sm font-bold uppercase py-3 px-6 hover:bg-[#FF7120] hover:text-black active:scale-[0.98] transition-all duration-150"
              data-interactive="true"
            >
              WORK WITH {member.name.split(" ")[0].toUpperCase()} [→]
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
