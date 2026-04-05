import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CountUpNumber from "@/components/shared/CountUpNumber";
import { EASE_SMOOTH, COUNT_UP_MS } from "@/constants/motion";

export default function Scale() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      {/* Warm light background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(30, 15%, 97%) 0%, hsl(210, 25%, 96%) 100%)",
        }}
      />
      {/* Subtle navy orb */}
      <div
        className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-70"
        style={{ background: "rgba(30, 100, 180, 0.08)" }}
      />

      {/* Oversized "8" watermark bleeding off left edge */}
      <div
        aria-hidden="true"
        className="absolute -start-[15%] md:-start-[8%] top-[8%] pointer-events-none font-display font-black leading-none select-none"
        style={{
          fontSize: "clamp(30rem, 55vw, 50rem)",
          color: "#0f2844",
          opacity: 0.03,
          letterSpacing: "-0.05em",
        }}
      >
        8
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          className="text-center text-xs font-semibold uppercase tracking-[0.3em] mb-6"
          style={{ color: "#1e5a8a" }}
        >
          {t("scale.eyebrow")}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE_SMOOTH }}
          className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 font-display tracking-tight mb-12 md:mb-16"
        >
          {t("scale.title")}
        </motion.h2>

        {/* Big metric */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.16, ease: EASE_SMOOTH }}
          className="text-center mb-6"
        >
          <div
            className="font-display font-black tracking-tight leading-none text-[clamp(5rem,15vw,10rem)]"
            style={{
              background: "linear-gradient(135deg, #0f2844 0%, #1e5a8a 50%, #3b82c4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <CountUpNumber target={t("scale.metric")} duration={COUNT_UP_MS} />
          </div>
        </motion.div>

        {/* Metric label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.24, ease: EASE_SMOOTH }}
          className="text-center text-base md:text-lg font-medium text-gray-600 max-w-xl mx-auto mb-12 md:mb-16"
        >
          {t("scale.metricLabel")}
        </motion.p>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.32, ease: EASE_SMOOTH }}
          className="text-center text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto"
        >
          {t("scale.body")}
        </motion.p>
      </div>
    </section>
  );
}
