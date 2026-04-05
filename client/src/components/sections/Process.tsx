import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Search, Hammer, Rocket } from "lucide-react";

const steps = [
  { key: "discover", Icon: Search, accent: "sky" },
  { key: "build", Icon: Hammer, accent: "violet" },
  { key: "launch", Icon: Rocket, accent: "emerald" },
] as const;

const accentColors: Record<string, { bg: string; ring: string; iconTint: string }> = {
  sky: { bg: "#38bdf8", ring: "rgba(56, 189, 248, 0.15)", iconTint: "#0284c7" },
  violet: { bg: "#a78bfa", ring: "rgba(167, 139, 250, 0.15)", iconTint: "#7c3aed" },
  emerald: { bg: "#34d399", ring: "rgba(52, 211, 153, 0.15)", iconTint: "#059669" },
};

export default function Process() {
  const { t } = useTranslation();

  return (
    <section id="process" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#0f2844 1px, transparent 1px), linear-gradient(90deg, #0f2844 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
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
            className="hidden md:block absolute top-[88px] start-[16.66%] end-[16.66%] h-px border-t border-dashed"
            style={{ borderColor: "rgba(15, 40, 68, 0.2)" }}
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 relative">
            {steps.map((step, index) => {
              const { Icon } = step;
              const colors = accentColors[step.accent];
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.18,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="relative group"
                >
                  {/* Number + Icon container */}
                  <div className="flex flex-col items-center mb-6">
                    <div
                      className="relative w-24 h-24 rounded-2xl flex items-center justify-center bg-white transition-all duration-500 group-hover:-translate-y-1"
                      style={{
                        boxShadow: "0 4px 24px rgba(15, 40, 68, 0.08), 0 0 0 1px rgba(15, 40, 68, 0.08)"
                      }}
                    >
                      <Icon className="w-10 h-10" strokeWidth={1.5} style={{ color: colors.iconTint }} />
                      {/* Step number badge with accent color */}
                      <div
                        className="absolute -top-2 -end-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display text-white"
                        style={{ background: colors.iconTint, boxShadow: `0 0 0 4px ${colors.ring}` }}
                      >
                        {t(`process.steps.${step.key}.number`)}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 font-display text-center">
                    {t(`process.steps.${step.key}.title`)}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-base text-center max-w-xs mx-auto">
                    {t(`process.steps.${step.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
