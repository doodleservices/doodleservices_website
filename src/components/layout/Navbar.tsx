"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { siteConfig } from "@/resources/data/siteConfig";
import { navbarContent } from "@/resources/data/content";
import Button from "@/components/common/Button";
import ScrambleText from "@/components/common/ScrambleText";
import { Menu, X, Terminal, ChevronDown } from "lucide-react";
import RoboticLogo from "@/components/common/RoboticLogo";
import AudioToggle from "@/components/common/AudioToggle";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#E5E4E0]/95 backdrop-blur-md border-b border-[#C8C4BE] py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          : "bg-[#E5E4E0]/85 backdrop-blur-sm py-3.5 border-b border-[#C8C4BE]/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between relative">
        {/* Robotic Logo & Website Name */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group cursor-pointer"
          data-interactive="true"
          title="Doodle Services // Home"
        >
          <RoboticLogo size={34} className="group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-stencil font-bold text-base md:text-lg tracking-wider text-[#111111] group-hover:text-[#FF7120] transition-colors">
              DOODLE <span className="text-[#FF7120]">[SERVICES]</span>
            </span>
            <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#636058] font-bold hidden sm:inline">
              {navbarContent.logoSubtitle}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links with ChainGPT Scramble Text (No square brackets on hover) */}
        <nav className="hidden lg:flex items-center gap-7">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-link-animated font-mono text-xs uppercase tracking-wider text-[#111111] font-bold hover:text-[#FF7120] transition-colors duration-200 py-1"
              data-interactive="true"
            >
              <ScrambleText text={link.label} />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & ChainGPT Ecosystem Dropdown */}
        <div className="hidden md:flex items-center gap-3">
          {/* ChainGPT 4-Dot Studio Stack Dropdown */}
          <div className="relative">
            <button
              onClick={() => setEcosystemOpen(!ecosystemOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 border border-[#C8C4BE] bg-white/80 hover:border-[#FF7120] hover:bg-white text-[11px] font-mono font-bold tracking-wider transition-all"
              data-interactive="true"
            >
              {/* ChainGPT 4-dot orange icon */}
              <div className="grid grid-cols-2 gap-0.5 w-2.5 h-2.5">
                <span className="w-1 h-1 rounded-xs bg-[#FF7120]" />
                <span className="w-1 h-1 rounded-xs bg-[#FF7120]" />
                <span className="w-1 h-1 rounded-xs bg-[#FF7120]" />
                <span className="w-1 h-1 rounded-xs bg-[#FF7120]" />
              </div>
              <span>STUDIO STACK</span>
              <ChevronDown className="w-3 h-3 text-[#666]" />
            </button>

            {ecosystemOpen && (
              <div
                className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-[#C8C4BE] shadow-xl p-2 flex flex-col gap-1 z-50 animate-slide-up"
                onMouseLeave={() => setEcosystemOpen(false)}
              >
                <div className="px-2 py-1 text-[9px] font-mono text-[#888] font-bold uppercase tracking-widest border-b border-[#E5E4E0]">
                  // CORE PLATFORMS
                </div>
                {[
                  { name: "DOODLE AI ENGINE", desc: "Autonomous Agentic Systems" },
                  { name: "3D ROBOTICS CORE", desc: "Interactive Three.js Meshes" },
                  { name: "NEXT.JS 16 SPRINT", desc: "Sub-85ms Enterprise Web" },
                  { name: "FLUTTER CLOUD APP", desc: "Native iOS & Android" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 hover:bg-[#FF7120]/10 hover:border-l-2 hover:border-[#FF7120] transition-all cursor-pointer group"
                  >
                    <div className="font-mono text-[10px] font-bold text-[#111] group-hover:text-[#FF7120]">
                      {item.name}
                    </div>
                    <div className="text-[9px] text-[#666]">{item.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <AudioToggle />

          <Button
            href="#contact"
            size="sm"
            variant="primary"
            chamfer={true}
            className="font-mono text-xs font-bold tracking-wider"
          >
            {navbarContent.ctaButton}
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <AudioToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111111] border border-[#C8C4BE] bg-white hover:border-[#FF7120] hover:text-[#FF7120] transition-all duration-200 active:scale-95"
            aria-label="Toggle Navigation"
            data-interactive="true"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#111111] bg-[#E5E4E0]/98 backdrop-blur-md px-6 py-6 shadow-xl flex flex-col gap-4 animate-slide-up">
          <div className="flex items-center gap-2 pb-3 border-b border-[#C8C4BE] text-xs font-mono text-[#111111] font-bold">
            <Terminal className="w-4 h-4 text-[#FF7120]" />
            <span>{navbarContent.mobileStatusText}</span>
          </div>
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm uppercase tracking-wider text-[#111111] py-1 border-b border-[#C8C4BE]/50 hover:text-[#FF7120] hover:border-[#FF7120] transition-colors"
              data-interactive="true"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button
              href="#contact"
              size="md"
              variant="primary"
              chamfer={true}
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              {navbarContent.mobileCtaButton}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
