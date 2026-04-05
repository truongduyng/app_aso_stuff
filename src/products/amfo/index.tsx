import React from "react";
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

const T = AMFO_THEME;

export const AMFO: ProductConfig = {
  id: "amfo",
  name: "Amfo",
  iconPath: "/products/amfo/app-icon.png",
  screenshotBase: "/products/amfo/screenshots",
  theme: AMFO_THEME,
  slides: {
    iphone: [
      {
        id: "calm",
        copy: {
          label: "AMBIENT SOUNDS",
          headline: <>Find<br /><span style={{ color: T.accent }}>your calm.</span></>,
          subtitle: <>50+ curated ambient sounds<br />for focus, sleep, and flow.</>,
        },
        Component: AmfoSlide1,
      },
      {
        id: "mix",
        copy: {
          label: "SOUND MIXER",
          headline: <>Layer sounds.<br /><span style={{ color: T.accent }}>Enter flow.</span></>,
          subtitle: <>Mix rain, café, and nature.<br />Every session, uniquely yours.</>,
        },
        Component: AmfoSlide2,
      },
      {
        id: "timer",
        copy: {
          label: "FOCUS TIMER",
          headline: <>Set a timer.<br /><span style={{ color: T.accent }}>Disappear.</span></>,
          subtitle: <>Built-in timer fades the UI<br />so nothing breaks your focus.</>,
        },
        Component: AmfoSlide3,
      },
      {
        id: "focus",
        copy: {
          label: "FOCUS MODE",
          headline: <>Silence<br /><span style={{ color: T.accent }}>the noise.</span></>,
          subtitle: <>Auto-hide controls during sessions.<br />Only the sound remains.</>,
        },
        Component: AmfoSlide4,
      },
    ],
  },
  featureGraphic: {
    tagline: "Amfo",
    subtitle: "50+ ambient sounds for focus, sleep, and flow.",
  },
  socialOg: {
    tagline: "Amfo — Find Your Calm",
    subtitle: "Curated ambient sounds and custom mixes for deep focus and restful sleep.",
  },
  metadata: {
    name: "Amfo",
    subtitle: "Ambient Sounds · Focus · Sleep",
    promoText: "50+ curated ambient sounds — mix rain, café, and nature for your perfect focus session.",
    shortDescription: "Ambient sounds and custom mixes for focus, sleep, and relaxation.",
    keywords: "ambient sounds,white noise,focus,sleep sounds,nature sounds,rain sounds,sound mixer,relaxation",
    description: "Amfo — curated ambient sounds for focus, sleep, and flow.\n\nSound Library: 50+ handpicked ambient sounds — rain, café, nature, city, and more.\n\nSound Mixer: Layer multiple sounds to create your perfect atmosphere. Every session, uniquely yours.\n\nFocus Timer: Built-in timer fades the UI so nothing breaks your focus.\n\nFocus Mode: Auto-hide controls during sessions. Only the sound remains.",
  },
};
