import type { ProductConfig, ThemeTokens } from "@/lib/types";
import { HoneSlide1, HoneSlide2, HoneSlide3, HoneSlide4, HoneSlide5 } from "./slides";

export const HONE_THEME: ThemeTokens = {
  bg: "#0A0A0C",
  bgAlt: "#111114",
  fg: "#F8F8F2",
  fgMuted: "#8A8A94",
  accent: "#F97316",
  accentGlow: "rgba(249,115,22,0.35)",
  accentSoft: "rgba(249,115,22,0.12)",
  surface: "rgba(255,255,255,0.04)",
  gradients: {
    dark: "linear-gradient(180deg, #0A0A0C 0%, #12120F 50%, #0A0A0C 100%)",
    warm: "linear-gradient(180deg, #0F0D0A 0%, #1A150E 40%, #0F0D0A 100%)",
    accent: "linear-gradient(135deg, #0A0A0C 0%, #1A120A 50%, #0A0A0C 100%)",
    deep: "linear-gradient(180deg, #08080A 0%, #0F0E10 50%, #08080A 100%)",
    hero: "linear-gradient(180deg, #0E0C08 0%, #141008 35%, #0A0A0C 100%)",
  },
};

export const HONE: ProductConfig = {
  id: "hone",
  name: "Hone",
  iconPath: "/products/hone/app-icon.png",
  screenshotBase: "/products/hone/screenshots",
  theme: HONE_THEME,
  slides: {
    iphone: [
      { id: "hero", label: "Hero", Component: HoneSlide1 },
      { id: "journal", label: "AI Sensei", Component: HoneSlide2 },
      { id: "protocol", label: "Daily Protocol", Component: HoneSlide3 },
      { id: "progress", label: "Progress", Component: HoneSlide4 },
      { id: "journey", label: "Journey", Component: HoneSlide5 },
    ],
  },
  featureGraphic: {
    tagline: "Hone",
    subtitle: "Sharpen your edge. Every day.",
  },
  socialOg: {
    tagline: "Hone — Sharpen Your Edge",
    subtitle: "Daily protocols, AI coaching, and progress tracking for peak performance.",
  },
  metadata: {
    name: "Hone",
    subtitle: "Daily Protocols · AI Coach",
    promoText: "Meet your AI Sensei — personalized daily protocols to sharpen body, mind, and spirit.",
    shortDescription: "Daily protocols and AI coaching for peak performance and personal growth.",
    keywords: "daily protocol,ai coach,habit tracker,self improvement,biohacking,wellness,journal",
    description: "Hone — your daily edge. Personalized protocols, AI coaching, and progress tracking designed for people who refuse to plateau.\n\nDaily Protocols: Science-backed routines for body, mind, and spirit. Tailored to your goals.\n\nAI Sensei: Your personal coach. Ask anything about performance, recovery, nutrition — get instant guidance.\n\nProgress Tracking: See your streak, track your growth, and never lose momentum.\n\nJourney: A visual timeline of your transformation. Every step counts.",
  },
};
