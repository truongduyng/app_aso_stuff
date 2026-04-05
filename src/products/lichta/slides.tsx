"use client";

import React from "react";
import {
  CenteredSlide,
  SideSlide,
  PhoneFrame,
  DotGrid,
  Rings,
  AccentLine,
  dims,
  type SlideProps,
  type Platform,
} from "@/components/slide-layouts";

/* ─────────────────────────────────────────────────────────────────
   LỊCH TA SLIDES
   Each slide defined once; iPhone + Android exports are derived
───────────────────────────────────────────────────────────────── */

/* ── Slide 1: Hero — Hôm Nay ─────────────────────────────── */
function Slide1({ theme: T, base, platform }: SlideProps & { platform: Platform }) {
  const isIP = platform === "iphone";
  return (
    <CenteredSlide
      theme={T} base={base} platform={platform}
      gradient={T.gradients.hero}
      orbs={[
        { size: 1000, top: "-15%", left: "-20%", color: "rgba(232,50,26,0.18)" },
        { size: 700, top: "30%", right: "-30%", color: "rgba(232,50,26,0.10)" },
      ]}
      decoration={<DotGrid color="rgba(232,50,26,0.06)" gap={isIP ? "52px" : "44px"} />}
      label="LỊCH ÂM VIỆT NAM"
      headline={<>Ngày hôm nay<br /><span style={{ color: T.accent }}>trong tầm tay.</span></>}
      subtitle={<>Âm lịch, Can Chi, Tiết Khí,<br />Hoàng Đạo — tất cả ở một chỗ.</>}
      screenshot="sc1.png" alt="Màn hình chính Lịch Ta"
    />
  );
}
export const LichtaSlide1 = (p: SlideProps) => <Slide1 {...p} platform="iphone" />;
export const LichtaAndroid1 = (p: SlideProps) => <Slide1 {...p} platform="android" />;

/* ── Slide 2: Sự Kiện ────────────────────────────────────── */
function Slide2({ theme: T, base, platform }: SlideProps & { platform: Platform }) {
  const isIP = platform === "iphone";
  const bpw = isIP ? "76%" : "50%";
  const fpw = isIP ? "83%" : "58%";
  const bty = isIP ? "4%" : "3%";
  const fty = isIP ? "4%" : "2%";

  return (
    <SideSlide
      theme={T} base={base} platform={platform}
      gradient={T.gradients.warm}
      orbs={[
        { size: 800, top: "5%", right: "-20%", color: "rgba(232,50,26,0.20)" },
        { size: 500, top: "50%", left: "-15%", color: "rgba(232,50,26,0.10)" },
      ]}
      label="SỰ KIỆN ÂM LỊCH"
      headline={<>Không bao giờ<br /><span style={{ color: T.accent }}>bỏ lỡ giỗ.</span></>}
      subtitle={<>Giỗ chạp, sinh nhật, ngày cưới<br />theo âm lịch — nhắc tự động.</>}
      phones={<>
        <div style={{ position: "absolute", bottom: 0, left: isIP ? "-4%" : "-3%", transform: `translateY(${bty}) rotate(-3deg)`, width: bpw, zIndex: 2, opacity: 0.35, filter: "brightness(0.65)" }}>
          <PhoneFrame platform={platform} src={`${base}/sc1.png`} alt="" />
        </div>
        <div style={{ position: "absolute", bottom: 0, right: isIP ? "-4%" : "-3%", transform: `translateY(${fty})`, width: fpw, zIndex: 3 }}>
          <PhoneFrame platform={platform} src={`${base}/sc2.png`} alt="Danh sách sự kiện" />
        </div>
      </>}
    />
  );
}
export const LichtaSlide2 = (p: SlideProps) => <Slide2 {...p} platform="iphone" />;
export const LichtaAndroid2 = (p: SlideProps) => <Slide2 {...p} platform="android" />;

/* ── Slide 3: Lịch Âm Chi Tiết ───────────────────────────── */
function Slide3({ theme: T, base, platform }: SlideProps & { platform: Platform }) {
  const isIP = platform === "iphone";
  return (
    <CenteredSlide
      theme={T} base={base} platform={platform}
      gradient={T.gradients.accent}
      orbs={[
        { size: 900, top: "-10%", left: "-25%", color: "rgba(232,50,26,0.20)" },
        { size: 600, top: "45%", right: "-20%", color: "rgba(232,50,26,0.10)" },
      ]}
      decoration={<Rings sizes={isIP ? [700, 900, 1100] : [560, 720, 880]} color="rgba(232,50,26,0.07)" />}
      label="LỊCH ÂM CHI TIẾT"
      headline={<>Can Chi,<br /><span style={{ color: T.accent }}>Hoàng Đạo.</span></>}
      subtitle={<>Tiết khí, Thần Sát, giờ Hoàng Đạo<br />hiển thị ngay khi chọn ngày.</>}
      screenshot="sc3.png" alt="Lịch âm chi tiết"
      captionMt={isIP ? 0.08 : 0.06}
      phoneTy={isIP ? "4%" : "2%"}
    />
  );
}
export const LichtaSlide3 = (p: SlideProps) => <Slide3 {...p} platform="iphone" />;
export const LichtaAndroid3 = (p: SlideProps) => <Slide3 {...p} platform="android" />;

/* ── Slide 4: Thầy Lịch Ta AI ────────────────────────────── */
function Slide4({ theme: T, base, platform }: SlideProps & { platform: Platform }) {
  const isIP = platform === "iphone";
  return (
    <CenteredSlide
      theme={T} base={base} platform={platform}
      gradient={T.gradients.deep}
      orbs={[
        { size: 1100, top: "15%", left: "5%", color: "rgba(232,50,26,0.22)" },
        { size: 500, top: "-5%", right: "-15%", color: "rgba(232,50,26,0.10)" },
      ]}
      decoration={<DotGrid color="rgba(232,50,26,0.055)" gap={isIP ? "44px" : "40px"} />}
      label="THẦY LỊCH TA AI"
      headline={<>Hỏi Thầy<br /><span style={{ color: T.accent }}>bất cứ lúc nào.</span></>}
      subtitle={<>Tử vi, phong thủy, phong tục<br />Việt Nam — AI trả lời ngay.</>}
      screenshot="sc5.png" alt="Thầy Lịch Ta AI"
      captionMt={isIP ? 0.08 : 0.06}
      phoneTy={isIP ? "4%" : "2%"}
    />
  );
}
export const LichtaSlide4 = (p: SlideProps) => <Slide4 {...p} platform="iphone" />;
export const LichtaAndroid4 = (p: SlideProps) => <Slide4 {...p} platform="android" />;

/* ── Slide 5: Giao Diện ──────────────────────────────────── */
function Slide5({ theme: T, base, platform }: SlideProps & { platform: Platform }) {
  const isIP = platform === "iphone";
  return (
    <SideSlide
      theme={T} base={base} platform={platform}
      gradient={T.gradients.warm}
      orbs={[
        { size: 800, top: "3%", right: "-25%", color: "rgba(232,50,26,0.18)" },
        { size: 500, top: "55%", left: "-18%", color: "rgba(232,50,26,0.10)" },
      ]}
      label="GIAO DIỆN CÁ NHÂN"
      headline={<>Màu sắc<br /><span style={{ color: T.accent }}>theo ý bạn.</span></>}
      subtitle={<>Hình nền thành phố Việt Nam,<br />màu chủ đạo tùy chỉnh thoải mái.</>}
      subtitleMaxW={isIP ? 0.65 : 0.62}
      phones={<>
        <div style={{ position: "absolute", bottom: 0, left: isIP ? "-4%" : "-3%", transform: `translateY(${isIP ? "4%" : "2%"}) rotate(-3deg)`, width: isIP ? "74%" : "50%", zIndex: 2, opacity: 0.35, filter: "brightness(0.65)" }}>
          <PhoneFrame platform={platform} src={`${base}/sc4.png`} alt="" />
        </div>
        <div style={{ position: "absolute", bottom: 0, right: isIP ? "-4%" : "-3%", transform: `translateY(${isIP ? "4%" : "2%"})`, width: isIP ? "80%" : "58%", zIndex: 3 }}>
          <PhoneFrame platform={platform} src={`${base}/sc4.png`} alt="Tùy chỉnh giao diện" />
        </div>
      </>}
    />
  );
}
export const LichtaSlide5 = (p: SlideProps) => <Slide5 {...p} platform="iphone" />;
export const LichtaAndroid5 = (p: SlideProps) => <Slide5 {...p} platform="android" />;

/* ── Slide 6: Tử Vi — Phong Thủy ─────────────────────────── */
function Slide6({ theme: T, base, platform }: SlideProps & { platform: Platform }) {
  const isIP = platform === "iphone";
  const { W } = dims(platform);
  return (
    <CenteredSlide
      theme={T} base={base} platform={platform}
      gradient={T.gradients.hero}
      orbs={[
        { size: 800, top: "8%", left: "20%", color: "rgba(232,50,26,0.16)" },
        { size: 500, top: "-5%", right: "-15%", color: "rgba(232,50,26,0.08)" },
        { size: 400, bottom: "10%", left: "-10%", color: "rgba(232,50,26,0.08)" },
      ]}
      label="TỬ VI — PHONG THỦY"
      headline={<>Vận mệnh.<br /><span style={{ color: T.accent }}>Rõ từng ngày.</span></>}
      subtitle={<>Chat với AI về tình duyên, công việc,<br />sức khỏe — theo lá số của bạn.</>}
      screenshot="sc6.png" alt="Trò chuyện Thầy AI"
      captionMt={isIP ? 0.08 : 0.06}
      phoneWidth={isIP ? "82%" : "58%"}
      phoneTy={isIP ? "4%" : "2%"}
      fadeH="6%"
      extras={<AccentLine canvasW={W} accentColor={T.accent} />}
    />
  );
}
export const LichtaSlide6 = (p: SlideProps) => <Slide6 {...p} platform="iphone" />;
export const LichtaAndroid6 = (p: SlideProps) => <Slide6 {...p} platform="android" />;

/* ── Slide 7: Widget ──────────────────────────────────────── */
function Slide7({ theme: T, base, platform }: SlideProps & { platform: Platform }) {
  const isIP = platform === "iphone";
  return (
    <CenteredSlide
      theme={T} base={base} platform={platform}
      gradient={T.gradients.dark}
      orbs={[
        { size: 900, top: "-10%", right: "-20%", color: "rgba(232,50,26,0.18)" },
        { size: 600, top: "50%", left: "-20%", color: "rgba(232,50,26,0.10)" },
      ]}
      decoration={<DotGrid color="rgba(232,50,26,0.06)" gap={isIP ? "52px" : "44px"} />}
      label=""
      headline={<>Widget đẹp<br /><span style={{ color: T.accent }}>mỗi ngày.</span></>}
      subtitle={<>Thêm widget vào màn hình chính,<br />xem lịch âm ngay không cần mở app.</>}
      screenshot="sc7.png" alt="Widget màn hình chính Lịch Ta"
    />
  );
}
export const LichtaSlide7 = (p: SlideProps) => <Slide7 {...p} platform="iphone" />;
export const LichtaAndroid7 = (p: SlideProps) => <Slide7 {...p} platform="android" />;
