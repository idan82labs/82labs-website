import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CountUpNumber from "@/components/shared/CountUpNumber";

const metricKeys = ["projects", "industries", "satisfaction", "uptime"] as const;

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section id="why-us" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #f7f8fa, #f0f4f8, #f5f7fa)" }} />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(30, 100, 180, 0.06)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 font-display tracking-tight">
            {t("whyUs.sectionTitle")}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t("whyUs.sectionSubtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {metricKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border shadow-sm hover:shadow-md transition-all duration-300" style={{ borderColor: "rgba(15, 40, 68, 0.08)" }}>
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display mb-3" style={{ background: "linear-gradient(135deg, #0f2844, #1e5a8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <CountUpNumber target={t(`whyUs.metrics.${key}.number`)} />
                </div>
                <div className="text-sm md:text-base text-gray-500 font-medium">
                  {t(`whyUs.metrics.${key}.label`)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
