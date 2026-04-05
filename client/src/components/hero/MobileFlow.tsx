import { useEffect, useRef, useState } from "react";

/**
 * Mobile hero flow visualization: wavy SVG path with a traveling light beam.
 * Pure SVG + CSS, 0 KB bundle cost. The beam is a short dashed stroke whose
 * stroke-dashoffset is animated infinitely, tracing the rail path.
 */
interface MobileFlowProps {
  isRTL?: boolean;
}

const stages = [
  { x: 40, l1: "Ingest", l2: "Webhooks · APIs", c: "#5bc0eb" },
  { x: 170, l1: "Automate", l2: "Agents · SDKs · Logic", c: "#7db8e0" },
  { x: 300, l1: "Ship", l2: "Apps · Alerts", c: "#5bc0eb" },
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
      aria-label="Pipeline: Ingest to Automate to Ship"
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
          <filter id="mf-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
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

        {/* Beam glow (blurred) */}
        <path
          d={RAIL_PATH}
          stroke="url(#mf-rail)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="26 500"
          filter="url(#mf-glow)"
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

        {/* Nodes */}
        {stages.map((s) => (
          <g key={s.l1}>
            <circle cx={s.x} cy="34" r="9" fill={s.c} fillOpacity="0.12" />
            <circle cx={s.x} cy="34" r="4.5" fill={s.c} />
            <circle cx={s.x} cy="34" r="2" fill="#0a1628" />
          </g>
        ))}

        {/* Converge bloom at Ship node — "resolved" signal */}
        <circle
          cx="300"
          cy="34"
          r="5"
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
        .mf-run  { animation: mf-travel 2.5s linear infinite; }
        @keyframes mf-travel {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -522; }
        }
        .mf-bloom { opacity: 0; transform-origin: 300px 34px; }
        .mf-bloom-run { animation: mf-bloom-cycle 2.5s ease-out infinite; animation-delay: 1.3s; }
        @keyframes mf-bloom-cycle {
          0%   { opacity: 0; transform: scale(0.5); }
          22%  { opacity: 0.85; transform: scale(0.65); }
          62%  { opacity: 0; transform: scale(2.4); }
          100% { opacity: 0; transform: scale(2.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mf-run { animation: none; stroke-dasharray: 0 0; }
          .mf-bloom-run { animation: none; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
