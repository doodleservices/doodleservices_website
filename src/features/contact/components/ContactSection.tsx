import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import QuoteForm from "./QuoteForm";
import { siteConfig } from "@/resources/data/siteConfig";
import { contactContent } from "@/resources/data/content";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  ExternalLink,
  Globe,
} from "lucide-react";
import CornerBrackets from "@/components/common/CornerBrackets";

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-16 bg-transparent border-t border-[#C8C4BE]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          number={contactContent.sectionNumber}
          category={contactContent.category}
          title={contactContent.title}
          subtitle={contactContent.subtitle}
          badgeText={contactContent.badgeText}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Interactive Form */}
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>

          {/* Quick Contact, Studio Location & Relocated Social Channels */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Comms Box */}
            <CornerBrackets className="p-6 bg-white space-y-4 shadow-sm">
              <h4 className="font-mono text-sm uppercase tracking-widest text-[#111111] font-bold pb-2 border-b border-[#C8C4BE] flex items-center justify-between">
                <span>{contactContent.directCommsHeading}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </h4>

              {/* Email */}
              <div className="flex items-start gap-3 text-xs">
                <Mail className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-mono text-[10px] text-[#4A4540] font-bold uppercase">
                    {contactContent.emailLabel}
                  </span>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-mono font-bold text-[#111111] hover:text-[#FF7120] transition-colors text-sm"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 text-xs">
                <Phone className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-mono text-[10px] text-[#4A4540] font-bold uppercase">
                    {contactContent.phoneLabel}
                  </span>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="font-mono font-bold text-[#111111] hover:text-[#FF7120] transition-colors text-sm"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp (Interactive & Clickable) */}
              <div className="flex items-start gap-3 text-xs pt-1 border-t border-[#C8C4BE]">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="w-full">
                  <span className="block font-mono text-[10px] text-emerald-700 uppercase font-bold">
                    WHATSAPP INSTANT DESK:
                  </span>
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono font-bold text-[#111111] hover:text-emerald-600 transition-colors mt-0.5 group text-sm"
                  >
                    <span>{siteConfig.whatsappNumber}</span>
                    <span className="text-[10px] text-emerald-600 group-hover:translate-x-0.5 transition-transform font-bold">
                      [CHAT NOW ↗]
                    </span>
                  </a>
                </div>
              </div>

              {/* Studio Location (Clickable Google Maps) */}
              <div className="flex items-start gap-3 text-xs pt-1 border-t border-[#C8C4BE]">
                <MapPin className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                <div className="w-full">
                  <span className="block font-mono text-[10px] text-[#4A4540] font-bold uppercase">
                    STUDIO HQ // GLOBAL PRESENCE:
                  </span>
                  <a
                    href={siteConfig.locationMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono font-bold text-[#111111] hover:text-[#FF7120] transition-colors mt-0.5 group text-sm"
                  >
                    <span>{siteConfig.location}</span>
                    <ExternalLink className="w-3 h-3 text-[#FF7120] group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Turnaround */}
              <div className="flex items-start gap-3 text-xs pt-1 border-t border-[#C8C4BE]">
                <Clock className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-mono text-[10px] text-[#4A4540] font-bold uppercase">
                    {contactContent.turnaroundLabel}
                  </span>
                  <span className="font-mono font-bold text-[#111111]">
                    {contactContent.turnaroundValue}
                  </span>
                </div>
              </div>
            </CornerBrackets>

            {/* Relocated Social Media Channels Box */}
            <CornerBrackets className="p-6 bg-white space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#C8C4BE] pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#FF7120]" />
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-black">
                    OFFICIAL TRANSMISSION CHANNELS
                  </h4>
                </div>
              </div>

              <p className="text-[11px] text-[#111111] font-mono font-medium leading-relaxed">
                Connect directly with the engineering &amp; design leadership on global networks:
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {[
                  { name: "Twitter / X", handle: "@doodle_services", url: siteConfig.socials.twitter },
                  { name: "LinkedIn", handle: "doodleservices", url: siteConfig.socials.linkedin },
                  { name: "Telegram", handle: "@pradyumnprajapati", url: siteConfig.socials.telegram },
                  { name: "Instagram", handle: "@doodleservices", url: siteConfig.socials.instagram },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 bg-[#F8F6F1] border border-[#C8C4BE] hover:border-[#FF7120] hover:bg-[#FFF4EC] transition-all group"
                  >
                    <div>
                      <div className="font-mono text-xs font-black text-[#111111] group-hover:text-[#FF7120] transition-colors">
                        {s.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#636058] font-bold">
                        {s.handle}
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FF7120] group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>

              {/* WhatsApp direct banner */}
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-emerald-50 border border-[#C8C4BE] hover:border-[#FF7120] hover:bg-emerald-100 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span className="font-mono text-xs font-bold text-emerald-900">
                    Direct WhatsApp Dialogue
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-700 font-black group-hover:translate-x-1 transition-transform">
                  LAUNCH [↗]
                </span>
              </a>
            </CornerBrackets>
          </div>
        </div>
      </div>
    </section>
  );
}
