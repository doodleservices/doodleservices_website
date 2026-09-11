"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { siteConfig } from "@/resources/data/siteConfig";
import { footerContent } from "@/resources/data/content";
import { ArrowUpRight, Terminal, Heart } from "lucide-react";

import RoboticLogo from "@/components/common/RoboticLogo";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[#C8C4BE] bg-[#DFDCD6] text-[#111111] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#C8C4BE]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="inline-flex items-center gap-2.5 group cursor-pointer"
              title="Scroll to Top // Doodle Services Main Screen"
            >
              <RoboticLogo size={36} className="group-hover:scale-105 transition-transform" />
              <span className="font-mono font-bold text-lg tracking-tight text-[#141414] group-hover:text-[#FF7120] transition-colors">
                DOODLE <span className="text-[#FF7120]">[SERVICES]</span>
              </span>
            </Link>
            <p className="text-sm text-[#141414] font-medium max-w-md font-sans leading-relaxed">
              {siteConfig.positioning}
            </p>
            <div className="pt-2 flex items-center gap-3 font-mono text-xs text-[#141414] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#FF7120] animate-ping" />
              <span>UPTIME: {siteConfig.uptime}</span>
              <span>//</span>
              <span>TURNAROUND: {siteConfig.turnaroundAvg}</span>
            </div>
          </div>

          {/* Navigation Col */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#141414] mb-4 font-black">
              {footerContent.architectureHeading}
            </h4>
            <ul className="space-y-2.5">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-mono text-xs uppercase text-[#141414] font-bold hover:text-[#FF7120] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#141414] mb-4 font-black">
              {footerContent.transmissionHeading}
            </h4>
            <div className="space-y-3 font-mono text-xs text-[#141414] font-bold">
              <div>
                <span className="block text-[10px] text-[#141414] uppercase font-black">{footerContent.directEmailLabel}</span>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-[#FF7120] transition-colors text-[#141414] font-bold"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
              <div>
                <span className="block text-[10px] text-[#141414] uppercase font-black">{footerContent.studioLineLabel}</span>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-[#FF7120] transition-colors text-[#141414] font-bold"
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-emerald-50 border border-[#C8C4BE] text-emerald-950 text-[10px] hover:border-[#FF7120] transition-colors font-bold"
                >
                  WHATSAPP [↗]
                </a>
                <a
                  href={siteConfig.locationMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-white border border-[#C8C4BE] text-[#111111] font-bold text-[10px] hover:border-[#FF7120] hover:text-[#FF7120] transition-colors"
                >
                  LOCATION [↗]
                </a>
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 bg-white border border-[#C8C4BE] text-[#111111] font-bold text-[10px] hover:border-[#FF7120] hover:text-[#FF7120] transition-colors"
                >
                  {footerContent.twitterLabel}
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 bg-white border border-[#C8C4BE] text-[#111111] font-bold text-[10px] hover:border-[#FF7120] hover:text-[#FF7120] transition-colors"
                >
                  {footerContent.linkedinLabel}
                </a>
                <a
                  href={siteConfig.socials.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 bg-white border border-[#C8C4BE] text-[#111111] font-bold text-[10px] hover:border-[#FF7120] hover:text-[#FF7120] transition-colors"
                >
                  {footerContent.telegramLabel}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#111111] font-bold border-t border-[#C8C4BE]">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. {footerContent.copyrightSuffix}
          </div>
          <div className="flex items-center gap-2">
            <span>{footerContent.bottomTagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
