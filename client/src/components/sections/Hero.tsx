import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import MobileFlow from "@/components/hero/MobileFlow";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "he";

  const scrollToWork = () => {
    const el = document.getElementById("case-studies");
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <section
      className="hero-section relative pt-32 pb-24 md:pt-44 md:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a1628 0%, #0f2844 40%, #132d4f 70%, #0d2240 100%)" }}
    >
      {/* Gradient orbs — CSS-only, contained to avoid paint storms */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ contain: "strict" }}>
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-orb-3" />
      </div>

      {/* Grid pattern — low cost */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="hero-fade-in hero-fade-in-1 inline-block mb-6">
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)", color: "#7db8e0" }}
          >
            {t("hero.badge", "AI-Powered Solutions for Modern Business")}
          </span>
        </div>

        <h1 className="hero-fade-in hero-fade-in-2 text-4xl md:text-6xl lg:text-[5rem] font-extrabold text-white mb-6 font-display leading-[1.05] tracking-[-0.02em]">
          {t("hero.title1")}
          <br />
          <span className="hero-gradient-text" style={{ color: "#7db8e0" }}>
            {t("hero.title2")}
          </span>
        </h1>

        <p
          className="hero-fade-in hero-fade-in-3 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "#94a3b8" }}
        >
          {t("hero.subtitle")}
        </p>

        <div className="hero-fade-in hero-fade-in-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onContactClick}
            className="text-base px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            {t("hero.cta")}
          </Button>
          <Button
            onClick={scrollToWork}
            variant="outline"
            className="text-base px-8 py-4 bg-transparent text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            {t("hero.ctaSecondary")}
          </Button>
        </div>

        <p
          className="hero-fade-in hero-fade-in-5 mt-10 text-[13px] md:text-sm tracking-wide max-w-3xl mx-auto leading-relaxed"
          style={{ color: "#7c99b8" }}
        >
          {t("hero.proof")}
        </p>
      </div>

      {/* Signature workflow visualization — CSS-only */}
      <div className="hero-fade-in hero-fade-in-6 relative z-10 mt-16 md:mt-28 max-w-4xl mx-auto pointer-events-none" aria-hidden="true">
        {/* MOBILE: wavy pipeline with traveling light beam */}
        <MobileFlow isRTL={isRTL} />

        {/* DESKTOP: 3-node agent reasoning loop */}
        <div className="hidden md:block">
          <svg viewBox="0 0 800 170" className="w-full h-auto" fill="none">
            <defs>
              <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5bc0eb" stopOpacity="0" />
                <stop offset="15%" stopColor="#5bc0eb" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#93c5e8" stopOpacity="1" />
                <stop offset="85%" stopColor="#5bc0eb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#5bc0eb" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Main rail: Input → Reason → Output, straight */}
            <path
              d="M 120 85 L 680 85"
              stroke="url(#flowLine)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
              className="hero-flow-path"
            />

            {/* Dead-end arcs radiating from Reason to labeled terminus dots */}
            <g aria-hidden="true">
              {/* Upper dead-end: cache miss */}
              <path
                d="M 400 85 Q 470 40, 540 32"
                stroke="#5bc0eb"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                className="hero-ghost-arc hero-ghost-arc-1"
              />
              <circle
                cx="540"
                cy="32"
                r="2.5"
                fill="#5bc0eb"
                className="hero-ghost-dot hero-ghost-dot-1"
              />
              <text
                x="550"
                y="35"
                className="hero-ghost-label hero-ghost-label-1"
                fill="#6a93b8"
                fontSize="9"
                fontWeight="500"
                letterSpacing="0.12em"
              >
                CACHE MISS
              </text>

              {/* Lower dead-end: low confidence */}
              <path
                d="M 400 85 Q 470 130, 540 138"
                stroke="#5bc0eb"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                className="hero-ghost-arc hero-ghost-arc-2"
              />
              <circle
                cx="540"
                cy="138"
                r="2.5"
                fill="#5bc0eb"
                className="hero-ghost-dot hero-ghost-dot-2"
              />
              <text
                x="550"
                y="141"
                className="hero-ghost-label hero-ghost-label-2"
                fill="#6a93b8"
                fontSize="9"
                fontWeight="500"
                letterSpacing="0.12em"
              >
                LOW CONFIDENCE
              </text>
            </g>

            {/* Three nodes: Input · Reason · Output */}
            {[
              { cx: 120, cy: 85, color: "#5bc0eb", delay: "1.0s", r: 6 },
              { cx: 400, cy: 85, color: "#93c5e8", delay: "1.3s", r: 10 },
              { cx: 680, cy: 85, color: "#5bc0eb", delay: "1.6s", r: 6 },
            ].map((node, i) => (
              <g key={i} className="hero-node" style={{ animationDelay: node.delay, transformOrigin: `${node.cx}px ${node.cy}px` }}>
                <circle cx={node.cx} cy={node.cy} r={node.r + 6} fill={node.color} fillOpacity="0.15" />
                <circle cx={node.cx} cy={node.cy} r={node.r} fill={node.color} />
                <circle cx={node.cx} cy={node.cy} r={node.r - 2} fill="#0a1628" />
              </g>
            ))}

            {/* Bloom ring AT Reason node — "decision resolved" */}
            <circle
              cx="400"
              cy="85"
              r="10"
              stroke="#5bc0eb"
              strokeWidth="1"
              fill="none"
              className="hero-bloom-ring"
              aria-hidden="true"
            />
          </svg>

          <div className="flex justify-between px-[108px] mt-1 text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#5bc0eb" }}>
            <span>Input</span>
            <span>Reason</span>
            <span>Output</span>
          </div>
        </div>
      </div>
    </section>
  );
}
