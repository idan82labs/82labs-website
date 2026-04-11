/** Ultra-wide banners — minimal: headline + circle cluster + atmosphere */
import React from "react";
import { brand } from "../brand.config.js";
import { DarkBg, Logo, LogoMark, GlowDot } from "./shared.js";

const { colors: c } = brand;

interface BannerProps { width: number; height: number; text?: string; }

export function Banner({ width, height, text }: BannerProps) {
  const s = Math.max(height / 400, width / 1600);
  const isCompact = height < 250;
  const isMediumWide = !isCompact && (width / height) >= 2 && (width / height) < 3.5;
  const headline = text || brand.tagline;

  // Compact: company banners
  if (isCompact) {
    return (
      <DarkBg width={width} height={height}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", position: "relative" }}>
          <div style={{ display: "flex", fontSize: Math.round(18 * s), fontWeight: 800, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.95)", textShadow: "0 0 40px rgba(91,192,235,0.12)" }}>{headline}</div>
        </div>
      </DarkBg>
    );
  }

  // Medium-wide: Facebook cover — headline only, centered
  if (isMediumWide) {
    return (
      <DarkBg width={width} height={height}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", position: "relative" }}>
          <div style={{ display: "flex", fontSize: Math.round(36 * s), fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "rgba(255,255,255,0.95)", textShadow: "0 0 40px rgba(91,192,235,0.12)", textAlign: "center" }}>{headline}</div>
        </div>
      </DarkBg>
    );
  }

  // Ultra-wide: headline left, circle cluster right
  return (
    <DarkBg width={width} height={height}>
      {/* Circle cluster — right, vertically centered, fully concentric */}
      <div style={{ display: "flex", position: "absolute", top: "50%", right: "6%", width: Math.round(height * 0.95), height: Math.round(height * 0.95), transform: "translateY(-50%)" }}>
        <div style={{ display: "flex", position: "absolute", top: "50%", left: "50%", width: Math.round(height * 0.90), height: Math.round(height * 0.90), borderRadius: "50%", border: "1.5px solid rgba(91,192,235,0.20)", transform: "translate(-50%,-50%)" }} />
        <div style={{ display: "flex", position: "absolute", top: "50%", left: "50%", width: Math.round(height * 0.60), height: Math.round(height * 0.60), borderRadius: "50%", border: "1px solid rgba(91,192,235,0.12)", transform: "translate(-50%,-50%)" }} />
        <div style={{ display: "flex", position: "absolute", top: "50%", left: "50%", width: Math.round(height * 0.35), height: Math.round(height * 0.35), borderRadius: "50%", border: "0.5px solid rgba(91,192,235,0.08)", transform: "translate(-50%,-50%)" }} />
        {/* Full logo centered in the circles — large, ghosted like the original 82 mark */}
        <div style={{ display: "flex", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.15 }}>
          <Logo height={Math.round(height * 0.17)} />
        </div>
      </div>

      {/* Headline — left, vertically centered */}
      <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%", padding: `0 ${Math.round(64 * s)}px 0 ${Math.round(88 * s)}px`, position: "relative" }}>
        <div style={{
          display: "flex",
          fontSize: Math.round(46 * s),
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "rgba(255,255,255,0.95)",
          textShadow: "0 0 40px rgba(91,192,235,0.12)",
          maxWidth: "55%",
        }}>
          {headline}
        </div>
      </div>
    </DarkBg>
  );
}
