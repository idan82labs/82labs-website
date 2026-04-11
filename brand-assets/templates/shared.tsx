/** Shared visual elements — abstract atmospheric depth.
 *  Rule: every element must be visible at 790px display width after JPEG compression.
 *  Minimum effective opacity for ANY visible element: 8%.
 */
import React from "react";
import { brand } from "../brand.config.js";

const { colors: c, logo } = brand;

export function Logo({ height = 40 }: { height?: number }) {
  const aspect = 2261 / 780;
  return (
    <svg viewBox={logo.viewBox} width={Math.round(height * aspect)} height={height} fill="none">
      <defs><mask id="logo-m"><rect x={logo.square.x} y={logo.square.y} width={logo.square.w} height={logo.square.h} rx={logo.square.rx} fill="white" /><g transform={logo.transform} fill="black"><path d={logo.path82} /></g></mask></defs>
      <rect x={logo.square.x} y={logo.square.y} width={logo.square.w} height={logo.square.h} rx={logo.square.rx} fill="#ffffff" mask="url(#logo-m)" />
      <g transform={logo.transform} fill="#ffffff"><path d={logo.pathLabs} /></g>
    </svg>
  );
}

export function LogoDark({ height = 40 }: { height?: number }) {
  const aspect = 2261 / 780;
  return (
    <svg viewBox={logo.viewBox} width={Math.round(height * aspect)} height={height} fill="none">
      <rect x={logo.square.x} y={logo.square.y} width={logo.square.w} height={logo.square.h} rx={logo.square.rx} fill="#0f2844" />
      <g transform={logo.transform} fill="#ffffff"><path d={logo.path82} /></g>
      <g transform={logo.transform} fill="#0f2844"><path d={logo.pathLabs} /></g>
    </svg>
  );
}

export function LogoMark({ size = 48, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <svg viewBox="0 0 780 780" width={size} height={size} fill="none">
      <defs><mask id={`m-${dark?"d":"l"}`}><rect x={logo.square.x} y={logo.square.y} width={logo.square.w} height={logo.square.h} rx={logo.square.rx} fill="white" /><g transform={logo.transform} fill="black"><path d={logo.path82} /></g></mask></defs>
      <rect x={logo.square.x} y={logo.square.y} width={logo.square.w} height={logo.square.h} rx={logo.square.rx} fill={dark ? "#0f2844" : "#fff"} mask={`url(#m-${dark?"d":"l"})`} />
    </svg>
  );
}

/** Cinematic dark background — abstract atmospheric depth.
 *  Lifted midtones, reduced blur, higher opacity orbs. */
export function DarkBg({ width, height, children }: { width: number; height: number; children?: React.ReactNode }) {
  const h = height;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "linear-gradient(150deg, #060d18 0%, #0b1e38 30%, #0e2440 45%, #102a4d 58%, #0e1830 78%, #070c16 100%)", fontFamily: "Plus Jakarta Sans, Inter, sans-serif", color: c.white, position: "relative", overflow: "hidden" }}>

      {/* Scan lines */}
      <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: "linear-gradient(rgba(91,192,235,0.05) 1px, transparent 1px)", backgroundSize: "1px 3px" }} />

      {/* Film grain — dense dot pattern faking organic noise */}
      <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.18, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "4px 4px, 6px 6px", backgroundPosition: "0 0, 2px 3px" }} />

      {/* L1: Primary aurora — VISIBLE, less blur */}
      <div style={{ display: "flex", position: "absolute", top: "-30%", left: "10%", width: h * 1.2, height: h * 1.2, borderRadius: "50%", background: "radial-gradient(ellipse at 40% 50%, rgba(45,110,210,0.45) 0%, rgba(25,70,160,0.18) 40%, transparent 65%)", filter: `blur(${Math.round(h * 0.12)}px)` }} />


      {/* L2: Cyan accent — bottom right */}
      <div style={{ display: "flex", position: "absolute", bottom: "-20%", right: "8%", width: h * 0.85, height: h * 0.85, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,192,235,0.30) 0%, rgba(60,150,210,0.10) 45%, transparent 65%)", filter: `blur(${Math.round(h * 0.10)}px)` }} />

      {/* L3: Violet/indigo — color variety */}
      <div style={{ display: "flex", position: "absolute", top: "5%", right: "22%", width: h * 0.6, height: h * 0.6, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,65,200,0.28) 0%, rgba(65,45,160,0.08) 45%, transparent 65%)", filter: `blur(${Math.round(h * 0.08)}px)` }} />

      {/* L4: Teal bridge — color richness */}
      <div style={{ display: "flex", position: "absolute", top: "35%", left: "42%", width: h * 0.5, height: h * 0.5, borderRadius: "50%", background: "radial-gradient(circle, rgba(50,200,190,0.22) 0%, transparent 55%)", filter: `blur(${Math.round(h * 0.09)}px)` }} />

      {/* L5: Large geometric ring — visible */}
      <div style={{ display: "flex", position: "absolute", top: "-35%", right: "-3%", width: h * 1.3, height: h * 1.3, borderRadius: "50%", border: "2px solid rgba(91,192,235,0.22)", background: "radial-gradient(circle, rgba(91,192,235,0.03) 0%, transparent 70%)" }} />

      {/* L6: Smaller ring */}
      <div style={{ display: "flex", position: "absolute", bottom: "-45%", left: "28%", width: h * 0.9, height: h * 0.9, borderRadius: "50%", border: "1.5px solid rgba(91,192,235,0.16)" }} />

      {/* Top edge */}
      <div style={{ display: "flex", position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent 10%, rgba(91,192,235,0.25) 50%, transparent 90%)" }} />

      {/* Bottom edge */}
      <div style={{ display: "flex", position: "absolute", bottom: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent 10%, rgba(91,192,235,0.12) 50%, transparent 90%)" }} />

      {children}
    </div>
  );
}

export function LightBg({ width, height, children }: { width: number; height: number; children?: React.ReactNode }) {
  const h = height;
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "linear-gradient(155deg, #f8fafb 0%, #eef3f8 40%, #f0f4f8 100%)", fontFamily: "Plus Jakarta Sans, Inter, sans-serif", color: "#0f2844", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06, backgroundImage: "linear-gradient(rgba(15,40,68,0.06) 1px, transparent 1px)", backgroundSize: "1px 3px" }} />
      <div style={{ display: "flex", position: "absolute", top: "-20%", right: "-10%", width: h * 1.2, height: h * 1.2, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,192,235,0.12) 0%, transparent 55%)", filter: `blur(${Math.round(h * 0.12)}px)` }} />
      {children}
    </div>
  );
}

export function AccentLine({ width = 48, thick = false }: { width?: number; thick?: boolean }) {
  return <div style={{ display: "flex", width, height: thick ? 4 : 2, borderRadius: 2, background: `linear-gradient(90deg, ${c.cyan}, ${c.cyanLight})`, boxShadow: `0 0 20px rgba(91,192,235,0.4), 0 0 4px rgba(91,192,235,0.6)` }} />;
}

export function GlowDot({ size = 6 }: { size?: number }) {
  return <div style={{ display: "flex", width: size, height: size, borderRadius: "50%", background: c.cyan, boxShadow: `0 0 12px ${c.cyan}` }} />;
}
