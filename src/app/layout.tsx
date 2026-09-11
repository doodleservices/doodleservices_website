import type { Metadata } from "next";
import { Space_Mono, Inter, Chakra_Petch } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/common/CustomCursor";
import { siteConfig } from "@/resources/data/siteConfig";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.subheadline,
  keywords: [
    "Doodle Services",
    "Web Development",
    "App Development",
    "Web Design",
    "UI/UX",
    "2D Animation",
    "Video Editing",
    "Poster Creation",
    "SEO",
  ],
  icons: {
    icon: [
      { url: "/robot-icon.svg", type: "image/svg+xml" },
      { url: "/robot-icon.jpg", type: "image/jpeg", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/robot-icon.jpg",
    shortcut: "/robot-icon.svg",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.subheadline,
    images: [{ url: "/robot-logo.jpg", width: 1024, height: 1024, alt: "Doodle Services Robot" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.subheadline,
    images: ["/robot-logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${chakraPetch.variable} ${inter.variable}`}>
      <body className="tech-grid-bg min-h-screen text-[#111111] antialiased selection:bg-[#FF7120] selection:text-black cursor-none relative">
        {/* ChainGPT Structural Column Lines Overlay */}
        <div className="body-lines-wrap pointer-events-none" aria-hidden="true">
          <div className="body-line" />
          <div className="body-line" />
          <div className="body-line" />
          <div className="body-line" />
          <div className="body-line" />
        </div>

        {/* ChainGPT Blue Atmospheric Edge Glows */}
        <div className="side-glow-left" aria-hidden="true" />
        <div className="side-glow-right" aria-hidden="true" />

        {/* ChainGPT Fixed Right-Side Social Rail */}
        <aside
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center bg-[#E5E4E0]/95 backdrop-blur-md border-l border-y border-[#C8C4BE] py-3 px-2 gap-3.5 shadow-sm"
          aria-label="Social channels"
        >
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#111111] hover:text-[#FF7120] transition-colors p-1 group"
            title="Twitter / X"
            data-interactive="true"
          >
            <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="text-[#111111] hover:text-[#FF7120] transition-colors p-1 group"
            title="Telegram"
            data-interactive="true"
          >
            <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#111111] hover:text-[#FF7120] transition-colors p-1 group"
            title="GitHub"
            data-interactive="true"
          >
            <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#111111] hover:text-[#FF7120] transition-colors p-1 group"
            title="LinkedIn"
            data-interactive="true"
          >
            <svg className="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37h2.79V10.9H6.46M7.86 6.32a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
            </svg>
          </a>
        </aside>

        <CustomCursor />
        <Navbar />
        <main className="relative z-10 w-full overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
