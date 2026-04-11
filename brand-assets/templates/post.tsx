/** Posts: square, landscape, portrait, slides — cinematic Palantir vibe */
import React from "react";
import { brand } from "../brand.config.js";
import { DarkBg, Logo, LogoMark, AccentLine, GlowDot } from "./shared.js";

const { colors: c } = brand;

interface PostProps {
  width: number;
  height: number;
  text?: string;
}

export function Post({ width, height, text }: PostProps) {
  const s = Math.min(width, height) / 1080;
  const pad = Math.round(56 * s);
  const isWide = width / height > 1.3;
  const headline = text || brand.tagline;

  return (
    <DarkBg width={width} height={height}>
      {/* Diagonal accent line */}
      <div style={{ display: "flex", position: "absolute", top: 0, right: "25%", width: 1, height: "40%", background: `linear-gradient(180deg, ${c.cyan}10, transparent)`, transform: "rotate(15deg)", transformOrigin: "top center" }} />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: pad, position: "relative" }}>
        {/* Top: logo + accent */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Logo height={Math.round(30 * s)} />
          <div style={{ display: "flex", alignItems: "center", gap: Math.round(6 * s) }}>
            <div style={{ display: "flex", width: Math.round(20 * s), height: 1, background: `${c.cyan}30` }} />
            <div style={{ display: "flex", width: 4, height: 4, borderRadius: "50%", background: `${c.cyan}40` }} />
          </div>
        </div>

        {/* Center: headline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: isWide ? "flex-start" : "center", gap: Math.round(16 * s), paddingLeft: isWide ? Math.round(10 * s) : 0 }}>
          <AccentLine width={Math.round(48 * s)} />
          <div style={{ display: "flex", fontSize: Math.round(isWide ? 48 : 52 * s), fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, textAlign: isWide ? "left" : "center", maxWidth: isWide ? "65%" : "90%" }}>
            {headline}
          </div>
          <div style={{ display: "flex", fontSize: Math.round(16 * s), color: c.textMuted, letterSpacing: "0.01em", lineHeight: 1.5, textAlign: isWide ? "left" : "center", maxWidth: isWide ? "55%" : "80%" }}>
            {brand.subtitle}
          </div>
        </div>

        {/* Bottom: URL + mark */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "center", gap: Math.round(8 * s) }}>
            <GlowDot />
            <div style={{ display: "flex", fontSize: Math.round(12 * s), color: c.cyanMuted, letterSpacing: "0.06em", fontWeight: 500 }}>
              {brand.url}
            </div>
          </div>
          <LogoMark size={Math.round(24 * s)} />
        </div>
      </div>

      {/* "82" watermark */}
      <div style={{ display: "flex", position: "absolute", bottom: Math.round(-30 * s), right: Math.round(isWide ? 80 : 20 * s), fontSize: Math.round(isWide ? 200 : 280 * s), fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.8, color: c.white, opacity: 0.015 }}>82</div>
    </DarkBg>
  );
}
