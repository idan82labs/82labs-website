import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const { t } = useTranslation();

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
      </div>

      {/* Signature workflow visualization — CSS-only */}
      <div className="hero-fade-in hero-fade-in-5 relative z-10 mt-16 md:mt-28 max-w-4xl mx-auto pointer-events-none" aria-hidden="true">
        {/* MOBILE: 3-stage horizontal pipeline */}
        <div className="md:hidden px-4">
          <div className="relative grid grid-cols-3 gap-0">
            {/* Flow line (gradient base) */}
            <div
              className="absolute left-[16.66%] right-[16.66%] top-[14px] h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.7) 15%, rgba(167,139,250,0.9) 50%, rgba(52,211,153,0.7) 85%, rgba(52,211,153,0) 100%)",
              }}
            />
            {/* Flow line (sliding dashes overlay) */}
            <div
              className="hero-flow-mobile-dash absolute left-[16.66%] right-[16.66%] top-[14px] h-px pointer-events-none"
            />
            {[
              { l1: "Ingest", l2: "Webhooks · APIs", color: "#38bdf8", delay: "0.2s" },
              { l1: "Automate", l2: "n8n · AI · Logic", color: "#a78bfa", delay: "0.35s" },
              { l1: "Ship", l2: "Apps · Alerts", color: "#34d399", delay: "0.5s" },
            ].map((n, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="hero-node-mobile relative w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    animationDelay: n.delay,
                    background: `${n.color}22`,
                    boxShadow: `0 0 18px ${n.color}44`,
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: n.color, boxShadow: `0 0 8px ${n.color}` }}
                  />
                </div>
                <div className="mt-3 text-center">
                  <div
                    className="text-[11px] uppercase tracking-[0.14em] font-semibold leading-tight"
                    style={{ color: "#c7dcef" }}
                  >
                    {n.l1}
                  </div>
                  <div
                    className="text-[9px] tracking-wide mt-0.5 leading-tight"
                    style={{ color: "#6a93b8" }}
                  >
                    {n.l2}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP: 5-stage SVG wave */}
        <div className="hidden md:block">
          <svg viewBox="0 0 800 120" className="w-full h-auto" fill="none">
            <defs>
              <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="20%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#34d399" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Connecting line */}
            <path
              d="M 40 60 Q 180 20, 260 60 T 460 60 T 660 60 T 760 60"
              stroke="url(#flowLine)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
              className="hero-flow-path"
            />

            {/* Workflow nodes */}
            {[
              { cx: 40, cy: 60, color: "#38bdf8", delay: "1.2s", r: 6 },
              { cx: 260, cy: 60, color: "#7dd3fc", delay: "1.5s", r: 8 },
              { cx: 460, cy: 60, color: "#a78bfa", delay: "1.8s", r: 10 },
              { cx: 660, cy: 60, color: "#6ee7b7", delay: "2.1s", r: 8 },
              { cx: 760, cy: 60, color: "#34d399", delay: "2.4s", r: 6 },
            ].map((node, i) => (
              <g key={i} className="hero-node" style={{ animationDelay: node.delay, transformOrigin: `${node.cx}px ${node.cy}px` }}>
                <circle cx={node.cx} cy={node.cy} r={node.r + 6} fill={node.color} fillOpacity="0.15" />
                <circle cx={node.cx} cy={node.cy} r={node.r} fill={node.color} />
                <circle cx={node.cx} cy={node.cy} r={node.r - 2} fill="#0a1628" />
              </g>
            ))}
          </svg>

          <div className="flex justify-between px-10 mt-2 text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#7db8e0" }}>
            <span>Input</span>
            <span>Transform</span>
            <span>AI</span>
            <span>Route</span>
            <span>Output</span>
          </div>
        </div>
      </div>
    </section>
  );
}
