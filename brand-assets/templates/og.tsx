/** Open Graph / link preview images */
import React from "react";
import { brand } from "../brand.config.js";
import { DarkBg, Logo, AccentLine, GlowDot } from "./shared.js";

const { colors: c } = brand;

interface OgProps { width: number; height: number; text?: string; }

export function Og({ width, height, text }: OgProps) {
  const s = height / 630;

  return (
    <DarkBg width={width} height={height}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", height: "100%", padding: Math.round(60 * s), gap: Math.round(50 * s), position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: Math.round(20 * s), flexShrink: 0 }}>
          <Logo height={Math.round(44 * s)} />
          <AccentLine width={Math.round(50 * s)} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: Math.round(14 * s) }}>
          <div style={{ display: "flex", fontSize: Math.round(42 * s), fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{text || brand.tagline}</div>
          <div style={{ display: "flex", fontSize: Math.round(18 * s), color: c.textMuted, lineHeight: 1.5 }}>{brand.subtitle}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: Math.round(8 * s) }}>
            <GlowDot />
            <div style={{ display: "flex", fontSize: Math.round(14 * s), color: c.cyanMuted, letterSpacing: "0.06em", fontWeight: 500 }}>{brand.url}</div>
          </div>
        </div>
      </div>
    </DarkBg>
  );
}
