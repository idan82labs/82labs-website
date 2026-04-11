/** Vertical stories: IG/LinkedIn/FB stories, reel covers (9:16) */
import React from "react";
import { brand } from "../brand.config.js";
import { DarkBg, Logo, AccentLine, GlowDot } from "./shared.js";

const { colors: c } = brand;

interface StoryProps { width: number; height: number; text?: string; }

export function Story({ width, height, text }: StoryProps) {
  const s = width / 1080;
  const pad = Math.round(48 * s);

  return (
    <DarkBg width={width} height={height}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: pad, paddingTop: Math.round(80 * s), paddingBottom: Math.round(80 * s), position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center" }}><Logo height={Math.round(36 * s)} /></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: Math.round(20 * s) }}>
          <AccentLine width={Math.round(60 * s)} />
          <div style={{ display: "flex", fontSize: Math.round(64 * s), fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, textAlign: "center", maxWidth: "85%" }}>{text || brand.tagline}</div>
          <div style={{ display: "flex", fontSize: Math.round(24 * s), color: "#9dc0d8", textAlign: "center", lineHeight: 1.5, maxWidth: "80%", letterSpacing: "0.06em" }}>{brand.subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
          <GlowDot />
          <div style={{ display: "flex", fontSize: Math.round(14 * s), color: c.cyanMuted, letterSpacing: "0.08em", fontWeight: 500 }}>{brand.url}</div>
        </div>
      </div>
    </DarkBg>
  );
}
