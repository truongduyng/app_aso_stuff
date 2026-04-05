import type { ProductConfig, ThemeTokens } from "@/lib/types";
import {
  LichtaSlide1,
  LichtaSlide2,
  LichtaSlide3,
  LichtaSlide4,
  LichtaSlide5,
  LichtaSlide6,
  LichtaSlide7,
  LichtaAndroid1,
  LichtaAndroid2,
  LichtaAndroid3,
  LichtaAndroid4,
  LichtaAndroid5,
  LichtaAndroid6,
  LichtaAndroid7,
} from "./slides";

export const LICHTA_THEME: ThemeTokens = {
  bg: "#1A0A06",
  bgAlt: "#230E08",
  fg: "#FFF5EF",
  fgMuted: "#C4957A",
  accent: "#E8321A",
  accentGlow: "rgba(232,50,26,0.38)",
  accentSoft: "rgba(232,50,26,0.13)",
  surface: "rgba(232,50,26,0.07)",
  gradients: {
    dark: "linear-gradient(180deg, #1A0A06 0%, #200D08 50%, #1A0A06 100%)",
    warm: "linear-gradient(180deg, #180C07 0%, #261208 40%, #180C07 100%)",
    accent: "linear-gradient(135deg, #1A0A06 0%, #2A1008 50%, #1A0A06 100%)",
    deep: "linear-gradient(180deg, #120805 0%, #1C0C07 50%, #120805 100%)",
    hero: "linear-gradient(180deg, #1D0C07 0%, #2A1108 35%, #1A0A06 100%)",
  },
};

export const LICHTA: ProductConfig = {
  id: "lichta",
  name: "Lịch Ta",
  iconPath: "/products/lichta/app-icon.png",
  screenshotBase: "/products/lichta",
  theme: LICHTA_THEME,
  slides: {
    iphone: [
      { id: "hero", label: "Hôm Nay", Component: LichtaSlide1 },
      { id: "events", label: "Sự Kiện", Component: LichtaSlide2 },
      { id: "calendar", label: "Lịch Âm", Component: LichtaSlide3 },
      { id: "ai", label: "Thầy AI", Component: LichtaSlide4 },
      { id: "themes", label: "Giao Diện", Component: LichtaSlide5 },
      { id: "wisdom", label: "Tử Vi", Component: LichtaSlide6 },
      { id: "widgets", label: "Widget", Component: LichtaSlide7 },
    ],
    android: [
      { id: "hero", label: "Hôm Nay", Component: LichtaAndroid1 },
      { id: "events", label: "Sự Kiện", Component: LichtaAndroid2 },
      { id: "calendar", label: "Lịch Âm", Component: LichtaAndroid3 },
      { id: "ai", label: "Thầy AI", Component: LichtaAndroid4 },
      { id: "themes", label: "Giao Diện", Component: LichtaAndroid5 },
      { id: "wisdom", label: "Tử Vi", Component: LichtaAndroid6 },
      { id: "widgets", label: "Widget", Component: LichtaAndroid7 },
    ],
  },
  featureGraphic: {
    tagline: "Lịch Ta",
    subtitle: "Lịch âm, Can Chi, Tiết Khí — tất cả ở một chỗ.",
  },
  socialOg: {
    tagline: "Lịch Ta — Lịch Âm Việt Nam",
    subtitle: "Âm lịch, Can Chi, Hoàng Đạo, Tử Vi AI và hơn thế nữa.",
  },
  metadata: {
    name: "Lịch Ta",
    subtitle: "Lịch Âm · Can Chi · Hoàng Đạo",
    promoText: "Hỏi Thầy AI về tử vi, phong thủy, phong tục Việt Nam — trả lời ngay trong app!",
    shortDescription: "Lịch âm Việt Nam với Can Chi, Tiết Khí, Hoàng Đạo và Thầy AI tử vi.",
    keywords: "lịch âm,lịch ta,can chi,tiết khí,hoàng đạo,tử vi,phong thủy,âm lịch,lịch việt nam",
    description: "Lịch Ta — ứng dụng lịch âm Việt Nam đẹp nhất, với đầy đủ thông tin Can Chi, Tiết Khí, giờ Hoàng Đạo và Thầy AI tử vi.\n\nXem ngày hôm nay: Âm lịch, Can Chi, Tiết Khí, Thần Sát — tất cả hiển thị rõ ràng.\n\nSự kiện âm lịch: Không bao giờ bỏ lỡ giỗ chạp, sinh nhật, ngày cưới theo âm lịch. Nhắc nhở tự động.\n\nThầy AI: Hỏi bất cứ điều gì về tử vi, phong thủy, phong tục Việt Nam — AI trả lời ngay.\n\nGiao diện đẹp: Hình nền thành phố Việt Nam, màu chủ đạo tùy chỉnh.\n\nWidget: Thêm widget vào màn hình chính, xem lịch âm ngay không cần mở app.",
  },
};
