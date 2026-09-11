"use client";

import React, { useState } from "react";
import CornerBrackets from "@/components/common/CornerBrackets";
import Button from "@/components/common/Button";
import { servicesData } from "@/resources/data/services.data";
import { siteConfig } from "@/resources/data/siteConfig";
import { Send, CheckCircle2, AlertCircle, Mail, ExternalLink } from "lucide-react";

export default function QuoteForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Web Development",
    "Web Designing",
  ]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "$2,000 - $5,000",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState("");

  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      setSelectedServices(selectedServices.filter((s) => s !== title));
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  const constructMailtoUrl = () => {
    const subject = `[Project Proposal] ${formData.name ? formData.name : "New Client"} - ${selectedServices.length > 0 ? selectedServices.join(", ") : "General Inquiry"}`;
    const bodyLines = [
      "Hello Doodle Services Team,",
      "",
      "Here are the details for my project proposal:",
      "",
      "----------------------------------------",
      "CLIENT & CONTACT SPECIFICATIONS",
      "----------------------------------------",
      `• Client Name: ${formData.name || "N/A"}`,
      `• Email: ${formData.email || "N/A"}`,
      `• Phone / WhatsApp: ${formData.phone || "Not provided"}`,
      `• Estimated Sprint Budget: ${formData.budget || "Not specified"}`,
      `• Disciplines Selected: ${selectedServices.length > 0 ? selectedServices.join(", ") : "None specified"}`,
      "",
      "----------------------------------------",
      "PROJECT VISION & DELIVERABLE OBJECTIVES",
      "----------------------------------------",
      formData.details || "N/A",
      "",
      "----------------------------------------",
      "Transmitted via Doodle Services Portal",
    ];

    const body = bodyLines.join("\n");
    return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const generatedMailto = constructMailtoUrl();
    setMailtoUrl(generatedMailto);

    // Redirect user to their email client with all input data pre-filled
    window.location.href = generatedMailto;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  if (submitted) {
    return (
      <CornerBrackets className="p-8 md:p-12 bg-white text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C8C4BE]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-mono text-2xl font-bold uppercase text-[#111111] mb-2">
          TRANSMISSION RECEIVED // DISCOVERY QUEUED
        </h3>
        <p className="text-sm text-[#55524E] max-w-md mx-auto mb-4">
          Thank you, <span className="font-semibold">{formData.name}</span>. Your proposal data has been compiled and redirected to your email client to send to{" "}
          <span className="font-mono text-[#FF7120] font-bold">
            {siteConfig.contactEmail}
          </span>
          .
        </p>

        {mailtoUrl && (
          <div className="mb-6">
            <a
              href={mailtoUrl}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#FF7120] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>RE-OPEN IN EMAIL CLIENT</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <p className="text-[11px] text-[#777] font-mono mt-2">
              If your email application did not launch automatically, click the button above.
            </p>
          </div>
        )}

        <button
          onClick={() => setSubmitted(false)}
          className="font-mono text-xs text-[#FF7120] uppercase hover:underline cursor-pointer font-bold"
        >
          [SUBMIT ANOTHER TRANSMISSION]
        </button>
      </CornerBrackets>
    );
  }

  return (
    <CornerBrackets className="p-6 md:p-10 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Services Selector */}
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-[#111111] font-bold mb-3">
            // SELECT INTERESTED DISCIPLINES (MULTI-SELECT)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {servicesData.map((s) => {
              const isSelected = selectedServices.includes(s.title);
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => toggleService(s.title)}
                  className={`p-2.5 text-left border text-xs font-mono transition-all cursor-pointer select-none flex items-center justify-between ${
                    isSelected
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-[#F7F5F2] text-[#444] border-[#C8C4BE] hover:border-[#FF7120]"
                  }`}
                >
                  <span className="truncate">{s.title}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 bg-[#FF7120] rounded-full shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-[#555] mb-1.5 font-semibold">
              YOUR NAME *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Vance"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FBF9F7] border border-[#C8C4BE] text-sm text-[#111111] font-sans focus:outline-none focus:border-[#FF7120] transition-colors"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-[#555] mb-1.5 font-semibold">
              BUSINESS EMAIL *
            </label>
            <input
              type="email"
              required
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FBF9F7] border border-[#C8C4BE] text-sm text-[#111111] font-sans focus:outline-none focus:border-[#FF7120] transition-colors"
            />
          </div>
        </div>

        {/* Step 3: Phone & Budget Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-[#555] mb-1.5 font-semibold">
              PHONE / WHATSAPP (OPTIONAL)
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FBF9F7] border border-[#C8C4BE] text-sm text-[#111111] font-sans focus:outline-none focus:border-[#FF7120] transition-colors"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-[#555] mb-1.5 font-semibold">
              ESTIMATED SPRINT BUDGET
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FBF9F7] border border-[#C8C4BE] text-sm text-[#111111] font-mono focus:outline-none focus:border-[#FF7120] transition-colors"
            >
              <option value="<$2,000">&lt; $2,000 (Single Discipline Sprint)</option>
              <option value="$2,000 - $5,000">$2,000 - $5,000 (Starter Package)</option>
              <option value="$5,000 - $15,000">$5,000 - $15,000 (Growth Package)</option>
              <option value="$15,000+">$15,000+ (Full Studio Enterprise)</option>
            </select>
          </div>
        </div>

        {/* Step 4: Details */}
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-[#555] mb-1.5 font-semibold">
            PROJECT VISION & DELIVERABLE OBJECTIVES *
          </label>
          <textarea
            rows={4}
            required
            placeholder="Tell us about your brand, current challenges, timeline targets, or reference sites..."
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-[#FBF9F7] border border-[#C8C4BE] text-sm text-[#111111] font-sans focus:outline-none focus:border-[#FF7120] transition-colors"
          />
        </div>

        {/* Trust & Submit */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#C8C4BE]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#777]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>RESPONSE WITHIN 24 HOURS GUARANTEED</span>
          </div>

          <Button type="submit" size="md" variant="primary" icon={true}>
            {loading ? "TRANSMITTING..." : "SUBMIT PROJECT PROPOSAL"}
          </Button>
        </div>
      </form>
    </CornerBrackets>
  );
}
