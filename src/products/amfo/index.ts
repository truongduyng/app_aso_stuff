import type { ProductConfig, ThemeTokens } from "@/lib/types";
import { AmfoSlide1, AmfoSlide2, AmfoSlide3, AmfoSlide4 } from "./slides";

export const AMFO_THEME: ThemeTokens = {
  bg: "#09090F",
  bgAlt: "#0F0F1A",
  fg: "#F0EEFF",
  fgMuted: "#9090B0",
  accent: "#A78BFA",
  accentGlow: "rgba(167,139,250,0.35)",
  accentSoft: "rgba(167,139,250,0.12)",
  surface: "rgba(139,92,246,0.06)",
  gradients: {
    dark: "linear-gradient(180deg, #09090F 0%, #100F1C 50%, #09090F 100%)",
    warm: "linear-gradient(180deg, #0C0B18 0%, #130F24 40%, #0C0B18 100%)",
    accent: "linear-gradient(135deg, #09090F 0%, #12102A 50%, #09090F 100%)",
    deep: "linear-gradient(180deg, #07070D 0%, #0D0C1A 50%, #07070D 100%)",
    hero: "linear-gradient(180deg, #0B0A16 0%, #110E22 35%, #09090F 100%)",
  },
};

export const AMFO: ProductConfig = {
  id: "amfo",
  name: "Amfo",
  iconPath: "/products/amfo/app-icon.png",
  screenshotBase: "/products/amfo/screenshots",
  theme: AMFO_THEME,
  slides: {
    iphone: [
      { id: "calm",  label: "Sound Library", Component: AmfoSlide1 },
      { id: "mix",   label: "Sound Mixer",   Component: AmfoSlide2 },
      { id: "timer", label: "Focus Timer",   Component: AmfoSlide3 },
      { id: "focus", label: "Focus Mode",    Component: AmfoSlide4 },
    ],
  },
};
