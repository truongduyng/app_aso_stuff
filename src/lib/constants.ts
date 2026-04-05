/* Canvas dimensions — design at the largest required resolution */
export const IPHONE_W = 1320;
export const IPHONE_H = 2868;

export const IPHONE_SIZES = [
  { label: '6.9"', w: 1320, h: 2868 },
  { label: '6.5"', w: 1284, h: 2778 },
  { label: '6.3"', w: 1206, h: 2622 },
  { label: '6.1"', w: 1125, h: 2436 },
] as const;

/* Android phone canvas dimensions */
export const ANDROID_W = 1080;
export const ANDROID_H = 1920;

export const ANDROID_SIZES = [
  { label: 'Android Phone', w: 1080, h: 1920 },
] as const;

/* iPhone mockup measurements */
export const MK_W = 1022;
export const MK_H = 2082;
export const SC_L = (52 / MK_W) * 100;
export const SC_T = (46 / MK_H) * 100;
export const SC_W = (918 / MK_W) * 100;
export const SC_H = (1990 / MK_H) * 100;
export const SC_RX = (126 / 918) * 100;
export const SC_RY = (126 / 1990) * 100;
