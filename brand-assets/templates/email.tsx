/** Email headers — clean, works in light variant */
import React from "react";
import { brand } from "../brand.config.js";
import { LightBg, LogoDark, GlowDot } from "./shared.js";

const { colors: c } = brand;

interface EmailProps { width: number; height: number; text?: string; }

export function Email({ width, height, text }: EmailProps) {
  return (
    <LightBg width={width} height={height}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", padding: "20px 30px", gap: 20, position: "relative" }}>
        <LogoDark height={24} />
        {text && (
          <>
            <div style={{ display: "flex", width: 1, height: 20, background: "rgba(15,40,68,0.12)" }} />
            <div style={{ display: "flex", fontSize: 13, color: "#4a6a8a", fontWeight: 500, letterSpacing: "0.02em" }}>{text}</div>
          </>
        )}
      </div>
    </LightBg>
  );
}
