"use client";

import React from "react";
import {
  CenteredSlide,
  SideSlide,
  PhoneFrame,
  Rings,
  DotGrid,
  AccentLine,
  dims,
  type SlideProps,
} from "@/components/slide-layouts";
import { GridPattern } from "@/components/ui";

/* ─────────────────────────────────────────────────────────────────
   AMFO SLIDES - layout/visual only, all copy comes from props.copy
───────────────────────────────────────────────────────────────── */

/* ── Slide 1: Hero - Sound Library ─────────────────────── */
export function AmfoSlide1({ theme: T, base, copy }: SlideProps) {
  return (
    <CenteredSlide
      theme={T} base={base}
      gradient={T.gradients.hero}
      orbs={[
        { size: 900, top: "-10%", left: "-20%", color: "rgba(139,92,246,0.18)" },
        { size: 600, top: "40%", right: "-30%", color: "rgba(99,102,241,0.12)" },
        { size: 400, top: "60%", left: "-10%", color: "rgba(167,139,250,0.10)" },
      ]}
      decoration={<DotGrid color="rgba(139,92,246,0.05)" gap="48px" />}
      label={copy.label}
      headline={copy.headline}
      subtitle={copy.subtitle}
      screenshot="sc1.png" alt="Sound library"
      phoneWidth="83%"
    />
  );
}

/* ── Slide 2: Mix - Layer Sounds ────────────────────────── */
export function AmfoSlide2({ theme: T, base, copy }: SlideProps) {
  return (
    <SideSlide
      theme={T} base={base}
      gradient={T.gradients.accent}
      orbs={[
        { size: 800, top: "5%", right: "-25%", color: "rgba(139,92,246,0.22)" },
        { size: 500, top: "45%", left: "-20%", color: "rgba(99,102,241,0.14)" },
      ]}
      label={copy.label}
      headline={copy.headline}
      subtitle={copy.subtitle}
      phones={<>
        <div style={{ position: "absolute", bottom: 0, left: "-4%", transform: "translateY(10%) rotate(-3deg)", width: "76%", zIndex: 2, opacity: 0.4, filter: "brightness(0.65)" }}>
          <PhoneFrame platform="iphone" src={`${base}/sc1.png`} alt="Sound list background" />
        </div>
        <div style={{ position: "absolute", bottom: 0, right: "-4%", transform: "translateY(8%)", width: "83%", zIndex: 3 }}>
          <PhoneFrame platform="iphone" src={`${base}/sc1.png`} alt="Active mix" />
        </div>
      </>}
    />
  );
}

/* ── Slide 3: Timer ─────────────────────────────────────── */
export function AmfoSlide3({ theme: T, base, copy }: SlideProps) {
  return (
    <CenteredSlide
      theme={T} base={base}
      gradient={T.gradients.deep}
      orbs={[
        { size: 1100, top: "15%", left: "5%", color: "rgba(139,92,246,0.20)" },
        { size: 500, top: "-5%", right: "-15%", color: "rgba(99,102,241,0.10)" },
      ]}
      decoration={<Rings sizes={[600, 800, 1000]} color="rgba(139,92,246,0.06)" fadeStep={0.015} />}
      label={copy.label}
      headline={copy.headline}
      subtitle={copy.subtitle}
      screenshot="sc2.png" alt="Focus timer"
      captionMt={0.08}
      phoneWidth="83%" phoneTy="3%"
    />
  );
}

/* ── Slide 4: Focus Mode ────────────────────────────────── */
export function AmfoSlide4({ theme: T, base, copy }: SlideProps) {
  const { W } = dims("iphone");
  return (
    <CenteredSlide
      theme={T} base={base}
      gradient={T.gradients.warm}
      orbs={[
        { size: 800, top: "8%", left: "25%", color: "rgba(139,92,246,0.16)" },
        { size: 500, top: "-5%", right: "-15%", color: "rgba(167,139,250,0.10)" },
        { size: 400, bottom: "10%", left: "-10%", color: "rgba(99,102,241,0.08)" },
      ]}
      decoration={<GridPattern opacity={0.03} />}
      label={copy.label}
      headline={copy.headline}
      subtitle={copy.subtitle}
      screenshot="sc3.png" alt="Focus mode settings"
      phoneWidth="82%" phoneTy="3%"
      fadeH="6%"
      extras={<AccentLine canvasW={W} accentColor={T.accent} opacity={0.5} />}
    />
  );
}
