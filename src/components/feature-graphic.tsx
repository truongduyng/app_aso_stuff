"use client";

import React from "react";
import { FG_W, FG_H } from "@/lib/constants";
import { img } from "@/lib/images";
import { OrbGlow } from "@/components/ui";
import type { ThemeTokens } from "@/lib/types";

/**
 * Feature Graphic - Google Play Store header banner (1024×500).
 * Renders a branded landscape canvas with app icon, tagline, and gradient.
 */
export function FeatureGraphic({
  theme: T,
  iconPath,
  tagline,
  subtitle,
}: {
  theme: ThemeTokens;
  iconPath: string;
  tagline: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        width: FG_W,
        height: FG_H,
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
      <OrbGlow color={T.accentGlow} size={500} top="-30%" left="-10%" />
      <OrbGlow color={T.accentSoft} size={400} top="20%" right="-15%" />
      <OrbGlow color={T.accentGlow} size={300} bottom="-20%" left="40%" />

      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${T.accent}12 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Accent line top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${T.accent}, transparent)`,
          opacity: 0.6,
          zIndex: 5,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 48,
          padding: "0 80px",
        }}
      >
        {/* App icon */}
        <img
          src={img(iconPath)}
          alt=""
          style={{
            width: 180,
            height: 180,
            borderRadius: 40,
            flexShrink: 0,
            boxShadow: `0 12px 60px ${T.accentGlow}, 0 4px 20px rgba(0,0,0,0.4)`,
          }}
          draggable={false}
        />

        {/* Text */}
        <div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: T.fg,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {tagline}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 26,
                fontWeight: 400,
                color: T.fgMuted,
                lineHeight: 1.5,
                marginTop: 14,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "25%",
          background: `linear-gradient(transparent, ${T.bg}88)`,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
