import React from "react";
import { siteConfig } from "@/resources/data/siteConfig";

export default function SocialSidebar() {
  return (
    <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-6">
      <div className="w-[1px] h-16 bg-[#C8C4BE]" />
      <div className="flex flex-col items-center gap-5 text-[10px] font-mono tracking-widest text-[#666] [writing-mode:vertical-lr] uppercase">
        <a
          href={siteConfig.socials.twitter}
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#FF7120] transition-colors rotate-180"
        >
          X.COM
        </a>
        <a
          href={siteConfig.socials.telegram}
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#FF7120] transition-colors rotate-180"
        >
          TELEGRAM
        </a>
        <a
          href={siteConfig.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#FF7120] transition-colors rotate-180"
        >
          LINKEDIN
        </a>
      </div>
      <div className="w-[1px] h-16 bg-[#C8C4BE]" />
    </div>
  );
}
