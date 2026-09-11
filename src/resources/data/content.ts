/**
 * ============================================================
 * DOODLE SERVICES — SECTION-WISE JSON CONTENT LOADER
 * ============================================================
 * All website text is now separated section-by-section in:
 *   public/site-content/
 *
 * To update ANY section on the website, edit its individual file:
 *   - public/site-content/siteConfig.json
 *   - public/site-content/navbar.json
 *   - public/site-content/hero.json
 *   - public/site-content/manifesto.json
 *   - public/site-content/hud.json
 *   - public/site-content/metrics.json
 *   - public/site-content/services.json
 *   - public/site-content/process.json
 *   - public/site-content/portfolio.json
 *   - public/site-content/pricing.json
 *   - public/site-content/testimonials.json
 *   - public/site-content/team.json
 *   - public/site-content/faq.json
 *   - public/site-content/contact.json
 *   - public/site-content/footer.json
 * ============================================================
 */

import siteConfigJson from "../../../public/site-content/siteConfig.json";
import navbarJson from "../../../public/site-content/navbar.json";
import footerJson from "../../../public/site-content/footer.json";
import heroJson from "../../../public/site-content/hero.json";
import manifestoJson from "../../../public/site-content/manifesto.json";
import hudJson from "../../../public/site-content/hud.json";
import metricsJson from "../../../public/site-content/metrics.json";
import servicesJson from "../../../public/site-content/services.json";
import processJson from "../../../public/site-content/process.json";
import portfolioJson from "../../../public/site-content/portfolio.json";
import pricingJson from "../../../public/site-content/pricing.json";
import testimonialsJson from "../../../public/site-content/testimonials.json";
import teamJson from "../../../public/site-content/team.json";
import faqJson from "../../../public/site-content/faq.json";
import contactJson from "../../../public/site-content/contact.json";

import type {
  ServiceItem,
  MetricItem,
  ProcessStep,
  ProjectItem,
  TestimonialItem,
  TeamMember,
  PricingTier,
  FaqItem,
  NavLink,
} from "@/types";

export const siteConfig = siteConfigJson as typeof siteConfigJson & {
  navLinks: NavLink[];
};

export const navbarContent    = navbarJson;
export const footerContent    = footerJson;
export const heroContent      = heroJson;
export const contactContent   = contactJson;
export const manifestoContent = manifestoJson;
export const hudContent       = hudJson;

export const metricsData: MetricItem[]            = metricsJson      as MetricItem[];
export const servicesData: ServiceItem[]          = servicesJson     as ServiceItem[];
export const processData: ProcessStep[]           = processJson      as ProcessStep[];
export const portfolioData: ProjectItem[]         = portfolioJson    as ProjectItem[];
export const pricingData: PricingTier[]           = pricingJson      as PricingTier[];
export const testimonialsData: TestimonialItem[]  = testimonialsJson as TestimonialItem[];
export const teamData: TeamMember[]               = teamJson         as TeamMember[];
export const faqData: FaqItem[]                   = faqJson          as FaqItem[];
