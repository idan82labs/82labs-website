import { motion } from "framer-motion";
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
      className="relative pt-32 pb-24 md:pt-44 md:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a1628 0%, #0f2844 40%, #132d4f 70%, #0d2240 100%)" }}
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[5%] left-[10%] w-[700px] h-[700px] rounded-full blur-[160px]" style={{ background: "rgba(30, 100, 180, 0.15)" }} />
        <div className="absolute bottom-[0%] right-[5%] w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: "rgba(56, 130, 200, 0.1)" }} />
        <div className="absolute top-[50%] right-[25%] w-[300px] h-[300px] rounded-full blur-[100px]" style={{ background: "rgba(80, 160, 220, 0.08)" }} />
      </div>

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mb-6"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)", color: "#7db8e0" }}>
            {t("hero.badge", "AI-Powered Solutions for Modern Business")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-6xl lg:text-[5rem] font-extrabold text-white mb-6 font-display leading-[1.05] tracking-[-0.02em]"
        >
          {t("hero.title1")}
          <br />
          <span className="hero-gradient-text" style={{ color: "#7db8e0" }}>
            {t("hero.title2")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "#94a3b8" }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
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
        </motion.div>
      </div>

      {/* Signature workflow visualization */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 mt-20 md:mt-28 max-w-4xl mx-auto pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 800 120" className="w-full h-auto" fill="none">
          <defs>
            <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="20%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#34d399" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connecting line */}
          <motion.path
            d="M 40 60 Q 180 20, 260 60 T 460 60 T 660 60 T 760 60"
            stroke="url(#flowLine)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
          />

          {/* Workflow nodes */}
          {[
            { cx: 40, cy: 60, color: "#38bdf8", delay: 1.2, r: 6 },
            { cx: 260, cy: 60, color: "#7dd3fc", delay: 1.5, r: 8 },
            { cx: 460, cy: 60, color: "#a78bfa", delay: 1.8, r: 10 },
            { cx: 660, cy: 60, color: "#6ee7b7", delay: 2.1, r: 8 },
            { cx: 760, cy: 60, color: "#34d399", delay: 2.4, r: 6 },
          ].map((node, i) => (
            <g key={i}>
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r + 6}
                fill={node.color}
                fillOpacity="0.15"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: node.delay }}
              />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill={node.color}
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: node.delay }}
              />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r - 2}
                fill="#0a1628"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: node.delay + 0.2 }}
              />
            </g>
          ))}

          {/* Animated data pulse */}
          <motion.circle
            r="3"
            fill="#ffffff"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, delay: 3, repeat: Infinity, repeatDelay: 1 }}
          >
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              begin="3s"
              path="M 40 60 Q 180 20, 260 60 T 460 60 T 660 60 T 760 60"
            />
          </motion.circle>
        </svg>

        <div className="flex justify-between px-10 mt-2 text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#7db8e0" }}>
          <span>Input</span>
          <span>Transform</span>
          <span>AI</span>
          <span>Route</span>
          <span>Output</span>
        </div>
      </motion.div>
    </section>
  );
}
