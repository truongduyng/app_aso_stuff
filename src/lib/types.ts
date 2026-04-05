export type ThemeTokens = {
  bg: string;
  bgAlt: string;
  fg: string;
  fgMuted: string;
  accent: string;
  accentGlow: string;
  accentSoft: string;
  surface: string;
  gradients: {
    dark: string;
    warm: string;
    accent: string;
    deep: string;
    hero: string;
  };
};

export type SlideDef = {
  id: string;
  label: string;
  Component: React.FC<{ theme: ThemeTokens; base: string }>;
};

/** Asset categories the generator produces */
export type AssetCategory = "screenshots" | "feature-graphic" | "social-og" | "metadata";

/** Store metadata fields with character limits */
export type MetadataField = {
  id: string;
  label: string;
  platform: "apple" | "google" | "both";
  maxLength: number;
  multiline: boolean;
  placeholder: string;
  value: string;
};

/** Product-level metadata defaults */
export type MetadataConfig = {
  subtitle: string;           // Apple — 30 chars
  promoText: string;          // Apple — 170 chars
  shortDescription: string;   // Google — 80 chars
  description: string;        // Both — 4000 chars
  keywords: string;           // Apple — 100 chars
};

export type ProductConfig = {
  id: string;
  name: string;
  iconPath: string;
  screenshotBase: string;
  mockupPath?: string;
  theme: ThemeTokens;
  slides: {
    iphone: SlideDef[];
    android?: SlideDef[];
  };
  /** Feature Graphic slide (1024×500 Google Play banner) */
  featureGraphic?: {
    tagline: string;
    subtitle?: string;
  };
  /** OG / Social preview card (1200×630) */
  socialOg?: {
    tagline: string;
    subtitle?: string;
  };
  /** Store metadata defaults */
  metadata?: MetadataConfig;
};
