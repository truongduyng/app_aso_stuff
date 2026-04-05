"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  IPHONE_SIZES, IPHONE_W, IPHONE_H,
  ANDROID_W, ANDROID_H, ANDROID_SIZES,
  FG_W, FG_H, FG_SIZES,
  OG_W, OG_H, OG_SIZES,
} from "@/lib/constants";
import { preloadImages, getImagePathsForProduct, img } from "@/lib/images";
import { exportSingle, exportAllToZip } from "@/lib/export";
import { ScreenshotPreview } from "@/components/ui";
import { FeatureGraphic } from "@/components/feature-graphic";
import { SocialOgImage } from "@/components/social-og";
import { MetadataPanel } from "@/components/metadata-panel";
import { PRODUCTS } from "@/products";
import type { AssetCategory, MetadataConfig } from "@/lib/types";

type DeviceType = "iphone" | "android" | "feature-graphic" | "social-og";

function getCanvasDims(device: DeviceType) {
  switch (device) {
    case "android":         return { w: ANDROID_W, h: ANDROID_H };
    case "feature-graphic": return { w: FG_W,      h: FG_H };
    case "social-og":       return { w: OG_W,      h: OG_H };
    default:                return { w: IPHONE_W,  h: IPHONE_H };
  }
}

const ASSET_TABS: { id: AssetCategory; label: string; icon: React.ReactNode }[] = [
  {
    id: "screenshots",
    label: "Screenshots",
    icon: (
      <svg width={15} height={15} viewBox="0 0 15 15" fill="none">
        <rect x="1" y="2" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth={1.3} />
        <rect x="5" y="2" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth={1.3} />
      </svg>
    ),
  },
  {
    id: "feature-graphic",
    label: "Feature Graphic",
    icon: (
      <svg width={15} height={15} viewBox="0 0 15 15" fill="none">
        <rect x="1" y="3.5" width="13" height="8" rx="1.5" stroke="currentColor" strokeWidth={1.3} />
        <circle cx="5" cy="7" r="1.5" stroke="currentColor" strokeWidth={1.2} />
        <path d="M8 10l2-3 3 3" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "social-og",
    label: "Social OG",
    icon: (
      <svg width={15} height={15} viewBox="0 0 15 15" fill="none">
        <rect x="1" y="3" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth={1.3} />
        <path d="M4 7h7M4 9.5h4" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "metadata",
    label: "Metadata",
    icon: (
      <svg width={15} height={15} viewBox="0 0 15 15" fill="none">
        <path d="M3 3h9M3 6h7M3 9h5M3 12h8" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ScreenshotsPage() {
  const offscreenRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [productId, setProductId] = useState(() => {
    if (typeof window === "undefined") return PRODUCTS[0].id;
    const saved = localStorage.getItem("selectedProductId");
    return PRODUCTS.find((p) => p.id === saved) ? saved! : PRODUCTS[0].id;
  });
  const [ready, setReady] = useState(false);
  const [device, setDevice] = useState<"iphone" | "android">("iphone");
  const [assetCategory, setAssetCategory] = useState<AssetCategory>("screenshots");
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);

  // Per-product metadata state
  const [metadataMap, setMetadataMap] = useState<Record<string, MetadataConfig>>(() => {
    const map: Record<string, MetadataConfig> = {};
    for (const p of PRODUCTS) {
      map[p.id] = p.metadata ?? {
        subtitle: "",
        promoText: "",
        shortDescription: "",
        description: "",
        keywords: "",
      };
    }
    return map;
  });

  const product = PRODUCTS.find((p) => p.id === productId)!;
  const T = product.theme;

  const hasAndroid = Boolean(product.slides.android?.length);

  // Determine active device type for rendering
  const activeDeviceType: DeviceType = (() => {
    if (assetCategory === "feature-graphic") return "feature-graphic";
    if (assetCategory === "social-og") return "social-og";
    return hasAndroid ? device : "iphone";
  })();

  const slides = assetCategory === "screenshots"
    ? (activeDeviceType === "android" ? product.slides.android : product.slides.iphone) ?? []
    : [];

  const sizes = (() => {
    switch (activeDeviceType) {
      case "android":         return ANDROID_SIZES;
      case "feature-graphic": return FG_SIZES;
      case "social-og":       return OG_SIZES;
      default:                return IPHONE_SIZES;
    }
  })();

  const { w: canvasW, h: canvasH } = getCanvasDims(activeDeviceType);

  // Preload images whenever the active product changes
  useEffect(() => {
    setReady(false);
    preloadImages(getImagePathsForProduct(product)).then(() => setReady(true));
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close product menu when clicking outside
  useEffect(() => {
    if (!productMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (productMenuRef.current && !productMenuRef.current.contains(e.target as Node)) {
        setProductMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [productMenuOpen]);

  // Reset selected size when device/category changes
  useEffect(() => {
    setSelectedSize(0);
  }, [activeDeviceType, assetCategory]);

  const exportAll = useCallback(async () => {
    if (!offscreenRef.current || exporting) return;

    if (assetCategory === "feature-graphic" || assetCategory === "social-og") {
      // Single-canvas export
      setExporting(true);
      setProgress({ done: 0, total: 1 });
      const label = assetCategory === "feature-graphic" ? "feature-graphic" : "social-og";
      await exportSingle(
        offscreenRef.current,
        0,
        label,
        sizes[0],
        product.id,
        PRODUCTS.length > 1,
        activeDeviceType
      );
      setProgress({ done: 1, total: 1 });
      setExporting(false);
      setProgress(null);
      return;
    }

    setExporting(true);
    setProgress({ done: 0, total: slides.length });

    const exportSizes = selectedSize === -1
      ? [...sizes]
      : [sizes[selectedSize]];

    await exportAllToZip({
      container: offscreenRef.current,
      slides,
      sizes: exportSizes,
      productId: product.id,
      multiProduct: PRODUCTS.length > 1,
      device: activeDeviceType,
      onProgress: (done, total) => setProgress({ done, total }),
    });

    setExporting(false);
    setProgress(null);
  }, [selectedSize, exporting, slides, product.id, activeDeviceType, sizes, assetCategory]);

  if (!ready) {
    return (
      <div style={{ minHeight: "100vh", background: "#09090B", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A8A94", fontSize: 16, fontFamily: "inherit" }}>
        Loading images…
      </div>
    );
  }

  const deviceTabBtn = (d: "iphone" | "android", label: string) => (
    <button
      key={d}
      onClick={() => setDevice(d)}
      style={{
        background: device === d ? T.accent : "rgba(255,255,255,0.06)",
        color: device === d ? "#fff" : T.fgMuted,
        border: "none", borderRadius: 6, padding: "6px 14px",
        fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
        boxShadow: device === d ? `0 2px 10px ${T.accentGlow}` : "none",
      }}
    >
      {label}
    </button>
  );

  const exportBtnLabel = () => {
    if (progress) return `Exporting ${progress.done}/${progress.total}…`;
    if (assetCategory === "feature-graphic") return "Export PNG";
    if (assetCategory === "social-og") return "Export PNG";
    return "Export ZIP";
  };

  const showExportControls = assetCategory !== "metadata";
  const showDeviceTabs = assetCategory === "screenshots" && hasAndroid;
  const showSizeSelector = assetCategory === "screenshots";

  return (
    <div style={{ minHeight: "100vh", background: "#09090B", color: T.fg, fontFamily: "inherit", overflowX: "hidden" }}>

      {/* ── Toolbar ───────────────────────────────────────── */}
      <div
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(9,9,11,0.85)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 24px",
          display: "flex", flexDirection: "column", gap: 12,
        }}
      >
        {/* Row 1: Product selector + device tabs + export */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          {/* Left: product dropdown trigger */}
          <div ref={productMenuRef} style={{ position: "relative" }}>
            <button
              onClick={() => setProductMenuOpen((o) => !o)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                background: productMenuOpen ? "rgba(255,255,255,0.08)" : "transparent",
                border: "1px solid",
                borderColor: productMenuOpen ? "rgba(255,255,255,0.14)" : "transparent",
                borderRadius: 10, padding: "6px 10px 6px 6px",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              <img
                src={img(product.iconPath)}
                alt={product.name}
                style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <span style={{ fontWeight: 700, fontSize: 16, color: T.fg, whiteSpace: "nowrap" }}>
                {product.name}
              </span>
              <svg
                width={14} height={14}
                viewBox="0 0 14 14" fill="none"
                style={{ marginLeft: 2, opacity: 0.5, flexShrink: 0, transform: productMenuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              >
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {productMenuOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 200,
                background: "rgba(24,24,28,0.97)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                padding: 6, minWidth: 220,
                boxShadow: "0 16px 60px rgba(0,0,0,0.6)",
                display: "flex", flexDirection: "column", gap: 2,
              }}>
                {PRODUCTS.map((p) => {
                  const active = p.id === productId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => { setProductId(p.id); localStorage.setItem("selectedProductId", p.id); setProductMenuOpen(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        background: active ? "rgba(255,255,255,0.08)" : "transparent",
                        border: "none", borderRadius: 8, padding: "8px 10px",
                        cursor: "pointer", transition: "background 0.12s", width: "100%", textAlign: "left",
                      }}
                      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                    >
                      <img
                        src={img(p.iconPath)}
                        alt={p.name}
                        style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0 }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <span style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: active ? T.fg : "#9999a8", flex: 1 }}>
                        {p.name}
                      </span>
                      {active && (
                        <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                          <path d="M3 7l3 3 5-5" stroke={T.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Center: device tabs */}
          {showDeviceTabs && (
            <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.04)", padding: 4, borderRadius: 8 }}>
              {deviceTabBtn("iphone", "iPhone")}
              {deviceTabBtn("android", "Android")}
            </div>
          )}

          {/* Right: export controls */}
          {showExportControls && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {showSizeSelector && (
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(Number(e.target.value))}
                  disabled={exporting}
                  style={{ background: "rgba(255,255,255,0.06)", color: T.fg, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", fontSize: 13, fontWeight: 500, cursor: exporting ? "wait" : "pointer", outline: "none", opacity: exporting ? 0.5 : 1 }}
                >
                  {sizes.map((s, i) => (
                    <option key={i} value={i}>{activeDeviceType === "iphone" ? "iPhone" : "Android"} {s.label} — {s.w}×{s.h}</option>
                  ))}
                  {sizes.length > 1 && (
                    <option value={-1}>All sizes</option>
                  )}
                </select>
              )}

              <button
                onClick={exportAll}
                disabled={exporting}
                style={{
                  position: "relative", overflow: "hidden",
                  background: exporting ? T.accentSoft : `linear-gradient(135deg, ${T.accent}, ${T.accent}dd)`,
                  color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px",
                  fontSize: 14, fontWeight: 600, minWidth: 140,
                  cursor: exporting ? "wait" : "pointer", transition: "all 0.2s",
                  boxShadow: exporting ? "none" : `0 4px 20px ${T.accentGlow}`,
                }}
              >
                {progress && (
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0,
                    width: `${(progress.done / progress.total) * 100}%`,
                    background: "rgba(255,255,255,0.15)",
                    transition: "width 0.2s ease",
                    pointerEvents: "none",
                  }} />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>
                  {exportBtnLabel()}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Row 2: Asset category tabs */}
        <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
          {ASSET_TABS.map((tab) => {
            const active = assetCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAssetCategory(tab.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: active ? "rgba(255,255,255,0.08)" : "transparent",
                  border: "1px solid",
                  borderColor: active ? "rgba(255,255,255,0.12)" : "transparent",
                  borderRadius: 8, padding: "6px 14px",
                  fontSize: 13, fontWeight: active ? 600 : 500,
                  color: active ? T.fg : T.fgMuted,
                  cursor: "pointer", transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content Area ───────────────────────────────────── */}

      {/* Screenshots grid */}
      {assetCategory === "screenshots" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24, padding: "32px 24px",
              maxWidth: 1600, margin: "0 auto",
            }}
          >
            {slides.map((slide, i) => (
              <ScreenshotPreview
                key={`${product.id}-${activeDeviceType}-${slide.id}`}
                index={i}
                label={slide.label}
                exportRef={offscreenRef}
                theme={T}
                productId={product.id}
                multiProduct={PRODUCTS.length > 1}
                device={activeDeviceType}
                selectedSize={selectedSize}
              >
                <slide.Component theme={T} base={product.screenshotBase} />
              </ScreenshotPreview>
            ))}
          </div>

          {/* Offscreen export container */}
          <div ref={offscreenRef} style={{ position: "absolute", left: -9999, top: 0, fontFamily: "inherit" }}>
            {slides.map((slide) => (
              <div
                key={`export-${product.id}-${activeDeviceType}-${slide.id}`}
                style={{ width: canvasW, height: canvasH, position: "absolute", left: -9999, fontFamily: "inherit" }}
              >
                <slide.Component theme={T} base={product.screenshotBase} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Feature Graphic */}
      {assetCategory === "feature-graphic" && (
        <>
          <div style={{ padding: "32px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <ScreenshotPreview
              index={0}
              label="Feature Graphic"
              exportRef={offscreenRef}
              theme={T}
              productId={product.id}
              multiProduct={PRODUCTS.length > 1}
              device="feature-graphic"
              selectedSize={0}
            >
              <FeatureGraphic
                theme={T}
                iconPath={product.iconPath}
                tagline={product.featureGraphic?.tagline ?? product.name}
                subtitle={product.featureGraphic?.subtitle}
              />
            </ScreenshotPreview>
          </div>

          {/* Offscreen export */}
          <div ref={offscreenRef} style={{ position: "absolute", left: -9999, top: 0, fontFamily: "inherit" }}>
            <div style={{ width: FG_W, height: FG_H, position: "absolute", left: -9999, fontFamily: "inherit" }}>
              <FeatureGraphic
                theme={T}
                iconPath={product.iconPath}
                tagline={product.featureGraphic?.tagline ?? product.name}
                subtitle={product.featureGraphic?.subtitle}
              />
            </div>
          </div>
        </>
      )}

      {/* Social OG Image */}
      {assetCategory === "social-og" && (
        <>
          <div style={{ padding: "32px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <ScreenshotPreview
              index={0}
              label="Social OG"
              exportRef={offscreenRef}
              theme={T}
              productId={product.id}
              multiProduct={PRODUCTS.length > 1}
              device="social-og"
              selectedSize={0}
            >
              <SocialOgImage
                theme={T}
                iconPath={product.iconPath}
                tagline={product.socialOg?.tagline ?? product.name}
                subtitle={product.socialOg?.subtitle}
                productName={product.name}
              />
            </ScreenshotPreview>
          </div>

          {/* Offscreen export */}
          <div ref={offscreenRef} style={{ position: "absolute", left: -9999, top: 0, fontFamily: "inherit" }}>
            <div style={{ width: OG_W, height: OG_H, position: "absolute", left: -9999, fontFamily: "inherit" }}>
              <SocialOgImage
                theme={T}
                iconPath={product.iconPath}
                tagline={product.socialOg?.tagline ?? product.name}
                subtitle={product.socialOg?.subtitle}
                productName={product.name}
              />
            </div>
          </div>
        </>
      )}

      {/* Metadata editor */}
      {assetCategory === "metadata" && (
        <MetadataPanel
          theme={T}
          metadata={metadataMap[product.id]}
          onUpdate={(updated) =>
            setMetadataMap((prev) => ({ ...prev, [product.id]: updated }))
          }
        />
      )}

    </div>
  );
}
