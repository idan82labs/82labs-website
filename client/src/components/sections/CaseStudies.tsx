import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";

interface CaseStudy {
  client: string;
  industry: string;
  tagline: string;
  description: string;
  outcome: string;
  stack: string[];
  accent: "sky" | "violet" | "emerald";
}

const accentStyles = {
  sky: {
    dot: "bg-sky-400",
    glow: "rgba(56, 189, 248, 0.08)",
    border: "rgba(56, 189, 248, 0.25)",
    text: "text-sky-400",
  },
  violet: {
    dot: "bg-violet-400",
    glow: "rgba(167, 139, 250, 0.08)",
    border: "rgba(167, 139, 250, 0.25)",
    text: "text-violet-400",
  },
  emerald: {
    dot: "bg-emerald-400",
    glow: "rgba(52, 211, 153, 0.08)",
    border: "rgba(52, 211, 153, 0.25)",
    text: "text-emerald-400",
  },
};

export default function CaseStudies() {
  const { t } = useTranslation();
  const items = t("caseStudies.items", { returnObjects: true }) as CaseStudy[];

  return (
    <section id="case-studies" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 font-display tracking-tight">
            {t("caseStudies.sectionTitle")}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t("caseStudies.sectionSubtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((study, index) => {
            const style = accentStyles[study.accent];
            return (
              <motion.article
                key={study.client}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="group relative flex flex-col h-full p-8 lg:p-10 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${style.glow}, transparent 60%)` }}
                />

                {/* Top border accent */}
                <div
                  className={`absolute top-0 inset-x-0 h-[3px] ${style.dot} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Industry tag + arrow */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {study.industry}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </div>

                  {/* Client name */}
                  <div className="text-2xl font-extrabold text-gray-900 mb-2 font-display">
                    {study.client}
                  </div>

                  {/* Tagline */}
                  <div className="text-base font-semibold text-gray-700 mb-4 font-display">
                    {study.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                    {study.description}
                  </p>

                  {/* Outcome badge */}
                  <div className="mb-5">
                    <div
                      className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold border"
                      style={{
                        background: style.glow,
                        borderColor: style.border,
                      }}
                    >
                      <span className={style.text}>{study.outcome}</span>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-5 border-t border-gray-100">
                    {study.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium text-gray-500 px-2 py-0.5 rounded bg-gray-50 border border-gray-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
