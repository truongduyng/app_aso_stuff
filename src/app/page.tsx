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
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);

  const product = PRODUCTS.find((p) => p.id === productId)!;
  const T = product.theme;

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
      multiProduct: PRODUCTS.length > 1,
      device: activeDevice,
      onProgress: (done, total) => setProgress({ done, total }),
    });

    setExporting(false);
    setProgress(null);
  }, [selectedSize, exporting, slides, product.id, activeDevice, sizes]);

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
        {/* Left: product dropdown trigger (icon + name acts as the button) */}
        <div ref={productMenuRef} style={{ position: "relative" }}>
          {/* Trigger */}
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
            {/* Chevron */}
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
                    onClick={() => { setProductId(p.id); setProductMenuOpen(false); }}
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
            multiProduct={PRODUCTS.length > 1}
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
