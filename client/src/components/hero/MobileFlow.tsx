import { useEffect, useRef, useState } from "react";

/**
 * Mobile hero flow visualization: 3-node agent reasoning loop.
 * Pure SVG + CSS, 0 KB bundle cost. Beam travels the rail; at the Reason node
 * (center), a dead-end arc radiates and fades, then the Reason ring blooms —
 * signalling "considered → rejected → resolved". Same metaphor as desktop.
 */
interface MobileFlowProps {
  isRTL?: boolean;
}

const stages = [
  { x: 40, l1: "Input", l2: "Webhooks · APIs", c: "#5bc0eb" },
  { x: 170, l1: "Reason", l2: "Plan · Act · Reflect", c: "#93c5e8" },
  { x: 300, l1: "Output", l2: "Apps · Alerts", c: "#5bc0eb" },
];

// Single wavy path used by rail, beam glow, and beam core
const RAIL_PATH = "M 20 34 Q 75 8, 105 34 T 190 34 T 275 34 T 320 34";

export default function MobileFlow({ isRTL = false }: MobileFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="md:hidden px-4 select-none"
      role="img"
      aria-label="Agent flow: Input, Reason, Output"
      style={{ direction: "ltr" }}
    >
      <svg
        viewBox="0 0 340 68"
        className="w-full h-auto overflow-visible"
        style={{ transform: isRTL ? "scaleX(-1)" : undefined }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mf-rail" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#5bc0eb" stopOpacity="0" />
            <stop offset="15%" stopColor="#5bc0eb" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#93c5e8" stopOpacity="1" />
            <stop offset="85%" stopColor="#5bc0eb" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5bc0eb" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Rail (static, dim) */}
        <path
          d={RAIL_PATH}
          stroke="url(#mf-rail)"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Beam soft-glow (duplicate stroke, no filter — cheap on mobile) */}
        <path
          d={RAIL_PATH}
          stroke="url(#mf-rail)"
          strokeOpacity="0.4"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="26 500"
          className={`mf-beam ${active ? "mf-run" : ""}`}
        />
        {/* Beam core (sharp) */}
        <path
          d={RAIL_PATH}
          stroke="url(#mf-rail)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="22 500"
          className={`mf-beam ${active ? "mf-run" : ""}`}
        />

        {/* Dead-end arc from Reason node — "considered alternative" */}
        <path
          d="M 170 34 Q 200 14, 230 10"
          stroke="#5bc0eb"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          className={`mf-arc ${active ? "mf-arc-run" : ""}`}
        />
        <circle
          cx="230"
          cy="10"
          r="2"
          fill="#5bc0eb"
          className={`mf-arc-dot ${active ? "mf-arc-run" : ""}`}
        />

        {/* Nodes */}
        {stages.map((s) => (
          <g key={s.l1}>
            <circle cx={s.x} cy="34" r="9" fill={s.c} fillOpacity="0.12" />
            <circle cx={s.x} cy="34" r="4.5" fill={s.c} />
            <circle cx={s.x} cy="34" r="2" fill="#0a1628" />
          </g>
        ))}

        {/* Bloom ring at Reason node — "decision resolved" */}
        <circle
          cx="170"
          cy="34"
          r="7"
          stroke="#5bc0eb"
          strokeWidth="0.8"
          fill="none"
          className={`mf-bloom ${active ? "mf-bloom-run" : ""}`}
        />
      </svg>

      {/* Labels row, counter-transformed in RTL so text stays readable */}
      <div
        className="grid grid-cols-3 -mt-1"
        style={{ transform: isRTL ? "scaleX(-1)" : undefined }}
      >
        {stages.map((s) => (
          <div
            key={s.l1}
            className="text-center"
            style={{ transform: isRTL ? "scaleX(-1)" : undefined }}
          >
            <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#c7dcef] leading-tight">
              {s.l1}
            </div>
            <div className="text-[9px] tracking-wide mt-0.5 text-[#6a93b8] leading-tight">
              {s.l2}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .mf-beam { stroke-dashoffset: 0; }
        .mf-run  { animation: mf-travel 2.4s linear infinite; }
        @keyframes mf-travel {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -522; }
        }

        .mf-arc { stroke-dasharray: 50; stroke-dashoffset: 50; opacity: 0; }
        .mf-arc-dot { opacity: 0; transform-origin: 230px 10px; }
        .mf-arc-run.mf-arc,
        .mf-arc-run.mf-arc-dot {
          animation-duration: 4.8s;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-iteration-count: infinite;
          animation-delay: 1.8s;
        }
        .mf-arc-run.mf-arc { animation-name: mf-arc-draw; }
        .mf-arc-run.mf-arc-dot { animation-name: mf-arc-dot; }
        @keyframes mf-arc-draw {
          0%   { stroke-dashoffset: 50; opacity: 0; }
          4%   { opacity: 0.55; }
          12%  { stroke-dashoffset: 0; opacity: 0.55; }
          25%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes mf-arc-dot {
          0%, 10%   { opacity: 0; transform: scale(0.4); }
          14%       { opacity: 0.9; transform: scale(1); }
          22%       { opacity: 0.9; transform: scale(1); }
          28%       { opacity: 0; transform: scale(0.4); }
          100%      { opacity: 0; transform: scale(0.4); }
        }

        .mf-bloom { opacity: 0; transform-origin: 170px 34px; }
        .mf-bloom-run {
          animation: mf-bloom-cycle 4.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.8s infinite;
        }
        @keyframes mf-bloom-cycle {
          0%, 28%   { opacity: 0; transform: scale(0.5); }
          32%       { opacity: 0.9; transform: scale(0.6); }
          40%       { opacity: 0; transform: scale(2.2); }
          100%      { opacity: 0; transform: scale(2.2); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mf-run { animation: none; stroke-dasharray: 0 0; }
          .mf-arc-run,
          .mf-bloom-run { animation: none; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
