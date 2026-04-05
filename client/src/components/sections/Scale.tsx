import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CountUpNumber from "@/components/shared/CountUpNumber";

const metricKeys = ["projects", "industries", "satisfaction", "uptime"] as const;

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

      {/* Oversized Fraunces "8" watermark bleeding off left edge */}
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
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.3em] mb-6"
          style={{ color: "#1e5a8a" }}
        >
          {t("scale.eyebrow")}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 font-display tracking-tight mb-12 md:mb-16"
        >
          {t("scale.title")}
        </motion.h2>

        {/* Big metric */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            <CountUpNumber target={t("scale.metric")} duration={1800} />
          </div>
        </motion.div>

        {/* Metric label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-base md:text-lg font-medium text-gray-600 max-w-xl mx-auto mb-12 md:mb-16"
        >
          {t("scale.metricLabel")}
        </motion.p>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-center text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-28 md:mb-40"
        >
          {t("scale.body")}
        </motion.p>

        {/* Metric strip — hairline dividers, no cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ background: "rgba(15, 40, 68, 0.1)" }}
        >
          {metricKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className="bg-white/40 backdrop-blur-sm px-6 py-7 md:py-8 text-center"
            >
              <div
                className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-2"
                style={{ color: "#0f2844" }}
              >
                <CountUpNumber target={t(`whyUs.metrics.${key}.number`)} duration={1400} />
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                {t(`whyUs.metrics.${key}.label`)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
