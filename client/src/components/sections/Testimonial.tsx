import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
}

export default function Testimonial() {
  const { t } = useTranslation();
  const items = t("testimonials.items", { returnObjects: true }) as TestimonialItem[];

  return (
    <section style={{ background: "linear-gradient(180deg, #0d2240 0%, #0a1a30 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-medium uppercase tracking-[0.25em] mb-12"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {t("testimonials.sectionLabel")}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="relative flex flex-col h-full p-8 rounded-2xl border border-white/[0.08] transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {/* Quote mark decoration */}
              <div
                className="absolute top-4 start-6 text-6xl font-display font-black leading-none select-none pointer-events-none"
                style={{ color: "rgba(125, 184, 224, 0.12)" }}
                aria-hidden="true"
              >
                "
              </div>

              <blockquote className="relative z-10 flex-1">
                <p className="text-base md:text-lg font-medium text-white/90 leading-relaxed mb-6 pt-4">
                  {item.quote}
                </p>
              </blockquote>

              <figcaption className="relative z-10 pt-4 border-t border-white/[0.08]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {item.author}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "#7db8e0" }}>
                      {item.role} · {item.company}
                    </div>
                  </div>
                  <div
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border whitespace-nowrap"
                    style={{
                      background: "rgba(125, 184, 224, 0.08)",
                      borderColor: "rgba(125, 184, 224, 0.2)",
                      color: "#93c5e8"
                    }}
                  >
                    {item.metric}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
