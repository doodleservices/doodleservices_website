export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  technologies: string[];
  iconName: string;
  tag: string;
  featured?: boolean;
}

export interface MetricItem {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  description: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface ProjectMatrixItem {
  metric: string;
  value: string;
  context?: string;
}

export interface ProjectServiceBreakdown {
  serviceId: string;
  serviceTitle: string;
  role: string;
  summary: string;
  deliverables: string[];
}

export interface ProjectScreenshot {
  url: string;
  title: string;
  caption: string;
  tag?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  clientLocation?: string;
  category: string;
  image: string;
  description: string;
  deliverables: string[];
  metrics: string;
  link?: string;
  liveUrl?: string;
  demoLiveUrl?: string;
  techStack?: string[];
  matrix?: ProjectMatrixItem[];
  internationalAppeal?: string;
  screenshots?: ProjectScreenshot[];
  servicesBreakdown?: ProjectServiceBreakdown[];
  relatedServices?: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarInitials: string;
  serviceReceived: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  avatarInitials: string;
  bio: string;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  recommended?: boolean;
  bestFor: string;
  priceNote: string;
  description: string;
  features: string[];
  turnaround: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface NavLink {
  label: string;
  href: string;
}
