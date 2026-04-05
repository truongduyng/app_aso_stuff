"use client";

import React from "react";
import { OG_W, OG_H } from "@/lib/constants";
import { img } from "@/lib/images";
import { OrbGlow } from "@/components/ui";
import type { ThemeTokens } from "@/lib/types";

/**
 * Social OG Image — Open Graph / Twitter Card (1200×630).
 * Used as preview image when sharing links on social media.
 */
export function SocialOgImage({
  theme: T,
  iconPath,
  tagline,
  subtitle,
  productName,
}: {
  theme: ThemeTokens;
  iconPath: string;
  tagline: string;
  subtitle?: string;
  productName: string;
}) {
  return (
    <div
      style={{
        width: OG_W,
        height: OG_H,
        background: T.gradients.hero,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
      }}
    >
      {/* Decorative orbs */}
      <OrbGlow color={T.accentGlow} size={500} top="-25%" left="-8%" />
      <OrbGlow color={T.accentSoft} size={350} top="30%" right="-12%" />
      <OrbGlow color={T.accentGlow} size={250} bottom="-15%" left="50%" />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${T.accent}10 1px, transparent 0)`,
          backgroundSize: "36px 36px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent 10%, ${T.accent}, transparent 90%)`,
          opacity: 0.7,
          zIndex: 5,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: "0 60px",
          textAlign: "center",
        }}
      >
        {/* App icon */}
        <img
          src={img(iconPath)}
          alt=""
          style={{
            width: 120,
            height: 120,
            borderRadius: 28,
            flexShrink: 0,
            boxShadow: `0 8px 40px ${T.accentGlow}, 0 4px 16px rgba(0,0,0,0.3)`,
          }}
          draggable={false}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: T.fg,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          {tagline}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: T.fgMuted,
              lineHeight: 1.5,
              maxWidth: 700,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Product name pill */}
        <div
          style={{
            marginTop: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: T.accentSoft,
            border: `1px solid ${T.accent}33`,
            borderRadius: 20,
            padding: "6px 16px",
            fontSize: 14,
            fontWeight: 600,
            color: T.accent,
            letterSpacing: "0.04em",
          }}
        >
          {productName}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "20%",
          background: `linear-gradient(transparent, ${T.bg}66)`,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
