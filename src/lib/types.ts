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
};
