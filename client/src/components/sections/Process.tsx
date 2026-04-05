import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { EASE_SMOOTH } from "@/constants/motion";

const steps = [
  { key: "discover" },
  { key: "build" },
  { key: "launch" },
] as const;

const ACCENT = "#5bc0eb";
const ACCENT_DARK = "#1e5a8a";

export default function Process() {
  const { t } = useTranslation();
  const dotTrackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [dotActive, setDotActive] = useState(false);

  // Pause the traveling dot when the section scrolls off-screen.
  useEffect(() => {
    if (!dotTrackRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setDotActive(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(dotTrackRef.current);
    return () => io.disconnect();
  }, []);

  // Scroll-linked cyan glow that sweeps through the grid as the user scrolls
  // through the section — "lights up" the grid, previews the next section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowTop = useTransform(scrollYProgress, [0, 1], ["-40%", "110%"]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0, 1, 1, 0]
  );
  const bottomFadeOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white process-section"
    >
      {/* Base grid pattern background (static, faint) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#0f2844 1px, transparent 1px), linear-gradient(90deg, #0f2844 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}
      />

      {/* Scroll-linked cyan glow — sweeps through the grid, lights up cells */}
      <motion.div
        className="absolute inset-x-0 pointer-events-none process-glow"
        style={{
          top: glowTop,
          opacity: glowOpacity,
          height: "55%",
          background:
            "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(91,192,235,0.14) 0%, rgba(91,192,235,0.06) 35%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Brighter cyan grid overlay that follows the glow — actually lights up cells */}
      <motion.div
        className="absolute inset-x-0 pointer-events-none process-grid-bright"
        style={{
          top: glowTop,
          opacity: glowOpacity,
          height: "55%",
          backgroundImage:
            "linear-gradient(#5bc0eb 1px, transparent 1px), linear-gradient(90deg, #5bc0eb 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: "center center",
          mixBlendMode: "multiply",
          maskImage:
            "radial-gradient(ellipse 70% 100% at 50% 50%, black 0%, rgba(0,0,0,0.4) 40%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 100% at 50% 50%, black 0%, rgba(0,0,0,0.4) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade-to-navy bridge — previews the dark ClosingCTA transition */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
        style={{
          opacity: bottomFadeOpacity,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(15,40,68,0.04) 60%, rgba(15,40,68,0.08) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 font-display tracking-tight">
            {t("process.sectionTitle")}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t("process.sectionSubtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Dashed connecting line — desktop only, behind cards */}
          <div
            ref={dotTrackRef}
            className="hidden md:block absolute top-[88px] start-[16.66%] end-[16.66%] h-px border-t border-dashed"
            style={{ borderColor: "rgba(15, 40, 68, 0.2)" }}
            aria-hidden="true"
          >
            {/* Traveling progress dot — reinforces Discover → Build → Launch */}
            <span
              className={`process-dot${dotActive ? " process-dot-active" : ""}`}
              aria-hidden="true"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: EASE_SMOOTH
                }}
                className="relative group text-center"
              >
                {/* Massive serif numeral */}
                <div
                  className="font-display font-black text-[7rem] md:text-[8rem] leading-none tracking-tight mb-4 transition-transform duration-500 group-hover:-translate-y-1"
                  style={{ color: ACCENT, opacity: 0.22 }}
                >
                  {t(`process.steps.${step.key}.number`)}
                </div>

                <h3
                  className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 font-display"
                  style={{ color: ACCENT_DARK }}
                >
                  {t(`process.steps.${step.key}.title`)}
                </h3>

                <p className="text-gray-600 leading-relaxed text-base max-w-xs mx-auto">
                  {t(`process.steps.${step.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
