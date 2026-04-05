"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { IPHONE_SIZES, IPHONE_W, IPHONE_H, ANDROID_W, ANDROID_H, ANDROID_SIZES } from "@/lib/constants";
import { preloadImages, getImagePathsForProduct, img } from "@/lib/images";
import { exportSingle, exportAllToZip } from "@/lib/export";
import { ScreenshotPreview } from "@/components/ui";
import { PRODUCTS } from "@/products";

export default function ScreenshotsPage() {
  const offscreenRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState(0); // -1 = all sizes
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [ready, setReady] = useState(false);
  const [device, setDevice] = useState<"iphone" | "android">("iphone");

  const product = PRODUCTS.find((p) => p.id === productId)!;
  const T = product.theme;
  const multiProduct = PRODUCTS.length > 1;

  const hasAndroid = Boolean(product.slides.android?.length);
  const activeDevice = hasAndroid ? device : "iphone";
  const slides = (activeDevice === "android" ? product.slides.android : product.slides.iphone) ?? [];
  const sizes = activeDevice === "android" ? ANDROID_SIZES : IPHONE_SIZES;
  const canvasW = activeDevice === "android" ? ANDROID_W : IPHONE_W;
  const canvasH = activeDevice === "android" ? ANDROID_H : IPHONE_H;

  // Preload images whenever the active product changes
  useEffect(() => {
    setReady(false);
    preloadImages(getImagePathsForProduct(product)).then(() => setReady(true));
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset selected size when device changes
  useEffect(() => {
    setSelectedSize(0);
  }, [activeDevice]);

  const exportAll = useCallback(async () => {
    if (!offscreenRef.current || exporting) return;
    setExporting(true);
    setProgress({ done: 0, total: slides.length });

    // Determine which sizes to export
    const exportSizes = selectedSize === -1
      ? [...sizes]                     // all sizes
      : [sizes[selectedSize]];         // selected size only

    await exportAllToZip({
      container: offscreenRef.current,
      slides,
      sizes: exportSizes,
      productId: product.id,
      multiProduct,
      device: activeDevice,
      onProgress: (done, total) => setProgress({ done, total }),
    });

    setExporting(false);
    setProgress(null);
  }, [selectedSize, exporting, slides, product.id, multiProduct, activeDevice, sizes]);

  if (!ready) {
    return (
      <div style={{ minHeight: "100vh", background: "#09090B", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A8A94", fontSize: 16, fontFamily: "inherit" }}>
        Loading images…
      </div>
    );
  }

  const tabBtn = (d: "iphone" | "android", label: string) => (
    <button
      key={d}
      onClick={() => setDevice(d)}
      style={{
        background: activeDevice === d ? T.accent : "rgba(255,255,255,0.06)",
        color: activeDevice === d ? "#fff" : T.fgMuted,
        border: "none", borderRadius: 6, padding: "6px 14px",
        fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
        boxShadow: activeDevice === d ? `0 2px 10px ${T.accentGlow}` : "none",
      }}
    >
      {label}
    </button>
  );

  const exportBtnLabel = () => {
    if (progress) return `Exporting ${progress.done}/${progress.total}…`;
    return "Export ZIP";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#09090B", color: T.fg, fontFamily: "inherit", overflowX: "hidden" }}>

      {/* ── Toolbar ───────────────────────────────────────── */}
      <div
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(9,9,11,0.85)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "14px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          flexWrap: "wrap",
        }}
      >
        {/* Left: product selector + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {multiProduct && (
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              style={{ background: "rgba(255,255,255,0.06)", color: T.fg, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", fontSize: 13, fontWeight: 700, cursor: "pointer", outline: "none" }}
            >
              {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          )}
          <img src={img(product.iconPath)} alt={product.name} style={{ width: 32, height: 32, borderRadius: 8 }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>{product.name} — Screenshots</span>
        </div>

        {/* Center: device tabs (only shown when product has Android slides) */}
        {hasAndroid && (
          <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.04)", padding: 4, borderRadius: 8 }}>
            {tabBtn("iphone", "iPhone")}
            {tabBtn("android", "Android")}
          </div>
        )}

        {/* Right: size picker + export */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Size selector — includes "All sizes" option */}
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(Number(e.target.value))}
            disabled={exporting}
            style={{ background: "rgba(255,255,255,0.06)", color: T.fg, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", fontSize: 13, fontWeight: 500, cursor: exporting ? "wait" : "pointer", outline: "none", opacity: exporting ? 0.5 : 1 }}
          >
            {sizes.map((s, i) => (
              <option key={i} value={i}>{activeDevice === "iphone" ? "iPhone" : "Android"} {s.label} — {s.w}×{s.h}</option>
            ))}
            {sizes.length > 1 && (
              <option value={-1}>All sizes</option>
            )}
          </select>

          {/* ZIP export button with progress bar */}
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
            {/* Progress fill bar */}
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
      </div>

      {/* ── Preview Grid ──────────────────────────────────── */}
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
            key={`${product.id}-${activeDevice}-${slide.id}`}
            index={i}
            label={slide.label}
            exportRef={offscreenRef}
            theme={T}
            productId={product.id}
            multiProduct={multiProduct}
            device={activeDevice}
            selectedSize={selectedSize}
          >
            <slide.Component theme={T} base={product.screenshotBase} />
          </ScreenshotPreview>
        ))}
      </div>

      {/* ── Hint ─────────────────────────────────────────── */}
      <div style={{ textAlign: "center", padding: "12px 0 32px", fontSize: 13, color: T.fgMuted }}>
        Click any screenshot to export individually · &quot;Export ZIP&quot; bundles all into one file
      </div>

      {/* ── Offscreen Export Container ────────────────────── */}
      <div ref={offscreenRef} style={{ position: "absolute", left: -9999, top: 0, fontFamily: "inherit" }}>
        {slides.map((slide) => (
          <div
            key={`export-${product.id}-${activeDevice}-${slide.id}`}
            style={{ width: canvasW, height: canvasH, position: "absolute", left: -9999, fontFamily: "inherit" }}
          >
            <slide.Component theme={T} base={product.screenshotBase} />
          </div>
        ))}
      </div>

    </div>
  );
}
