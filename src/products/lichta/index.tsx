import React from "react";
import type { ProductConfig, ThemeTokens } from "@/lib/types";
import {
  LichtaSlide1, LichtaSlide2, LichtaSlide3, LichtaSlide4,
  LichtaSlide5, LichtaSlide6, LichtaSlide7,
  LichtaAndroid1, LichtaAndroid2, LichtaAndroid3, LichtaAndroid4,
  LichtaAndroid5, LichtaAndroid6, LichtaAndroid7,
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

const T = LICHTA_THEME;

export const LICHTA: ProductConfig = {
  id: "lichta",
  name: "Lịch Ta",
  iconPath: "/products/lichta/app-icon.png",
  screenshotBase: "/products/lichta",
  theme: LICHTA_THEME,
  slides: {
    iphone: [
      {
        id: "hero",
        copy: {
          label: "LỊCH ÂM VIỆT NAM",
          headline: <>Ngày hôm nay<br /><span style={{ color: T.accent }}>trong tầm tay.</span></>,
          subtitle: <>Âm lịch, Can Chi, Tiết Khí,<br />Hoàng Đạo — tất cả ở một chỗ.</>,
        },
        Component: LichtaSlide1,
      },
      {
        id: "events",
        copy: {
          label: "SỰ KIỆN ÂM LỊCH",
          headline: <>Không bao giờ<br /><span style={{ color: T.accent }}>bỏ lỡ giỗ.</span></>,
          subtitle: <>Giỗ chạp, sinh nhật, ngày cưới<br />theo âm lịch — nhắc tự động.</>,
        },
        Component: LichtaSlide2,
      },
      {
        id: "calendar",
        copy: {
          label: "LỊCH ÂM CHI TIẾT",
          headline: <>Can Chi,<br /><span style={{ color: T.accent }}>Hoàng Đạo.</span></>,
          subtitle: <>Tiết khí, Thần Sát, giờ Hoàng Đạo<br />hiển thị ngay khi chọn ngày.</>,
        },
        Component: LichtaSlide3,
      },
      {
        id: "ai",
        copy: {
          label: "THẦY LỊCH TA AI",
          headline: <>Hỏi Thầy<br /><span style={{ color: T.accent }}>bất cứ lúc nào.</span></>,
          subtitle: <>Tử vi, phong thủy, phong tục<br />Việt Nam — AI trả lời ngay.</>,
        },
        Component: LichtaSlide4,
      },
      {
        id: "themes",
        copy: {
          label: "GIAO DIỆN CÁ NHÂN",
          headline: <>Màu sắc<br /><span style={{ color: T.accent }}>theo ý bạn.</span></>,
          subtitle: <>Hình nền thành phố Việt Nam,<br />màu chủ đạo tùy chỉnh thoải mái.</>,
        },
        Component: LichtaSlide5,
      },
      {
        id: "wisdom",
        copy: {
          label: "TỬ VI — PHONG THỦY",
          headline: <>Vận mệnh.<br /><span style={{ color: T.accent }}>Rõ từng ngày.</span></>,
          subtitle: <>Chat với AI về tình duyên, công việc,<br />sức khỏe — theo lá số của bạn.</>,
        },
        Component: LichtaSlide6,
      },
      {
        id: "widgets",
        copy: {
          label: "",
          headline: <>Widget đẹp<br /><span style={{ color: T.accent }}>mỗi ngày.</span></>,
          subtitle: <>Thêm widget vào màn hình chính,<br />xem lịch âm ngay không cần mở app.</>,
        },
        Component: LichtaSlide7,
      },
    ],
    android: [
      {
        id: "hero",
        copy: {
          label: "LỊCH ÂM VIỆT NAM",
          headline: <>Ngày hôm nay<br /><span style={{ color: T.accent }}>trong tầm tay.</span></>,
          subtitle: <>Âm lịch, Can Chi, Tiết Khí,<br />Hoàng Đạo — tất cả ở một chỗ.</>,
        },
        Component: LichtaAndroid1,
      },
      {
        id: "events",
        copy: {
          label: "SỰ KIỆN ÂM LỊCH",
          headline: <>Không bao giờ<br /><span style={{ color: T.accent }}>bỏ lỡ giỗ.</span></>,
          subtitle: <>Giỗ chạp, sinh nhật, ngày cưới<br />theo âm lịch — nhắc tự động.</>,
        },
        Component: LichtaAndroid2,
      },
      {
        id: "calendar",
        copy: {
          label: "LỊCH ÂM CHI TIẾT",
          headline: <>Can Chi,<br /><span style={{ color: T.accent }}>Hoàng Đạo.</span></>,
          subtitle: <>Tiết khí, Thần Sát, giờ Hoàng Đạo<br />hiển thị ngay khi chọn ngày.</>,
        },
        Component: LichtaAndroid3,
      },
      {
        id: "ai",
        copy: {
          label: "THẦY LỊCH TA AI",
          headline: <>Hỏi Thầy<br /><span style={{ color: T.accent }}>bất cứ lúc nào.</span></>,
          subtitle: <>Tử vi, phong thủy, phong tục<br />Việt Nam — AI trả lời ngay.</>,
        },
        Component: LichtaAndroid4,
      },
      {
        id: "themes",
        copy: {
          label: "GIAO DIỆN CÁ NHÂN",
          headline: <>Màu sắc<br /><span style={{ color: T.accent }}>theo ý bạn.</span></>,
          subtitle: <>Hình nền thành phố Việt Nam,<br />màu chủ đạo tùy chỉnh thoải mái.</>,
        },
        Component: LichtaAndroid5,
      },
      {
        id: "wisdom",
        copy: {
          label: "TỬ VI — PHONG THỦY",
          headline: <>Vận mệnh.<br /><span style={{ color: T.accent }}>Rõ từng ngày.</span></>,
          subtitle: <>Chat với AI về tình duyên, công việc,<br />sức khỏe — theo lá số của bạn.</>,
        },
        Component: LichtaAndroid6,
      },
      {
        id: "widgets",
        copy: {
          label: "",
          headline: <>Widget đẹp<br /><span style={{ color: T.accent }}>mỗi ngày.</span></>,
          subtitle: <>Thêm widget vào màn hình chính,<br />xem lịch âm ngay không cần mở app.</>,
        },
        Component: LichtaAndroid7,
      },
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
