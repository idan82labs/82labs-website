import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface CaseStudy {
  client: string;
  industry: string;
  tagline: string;
  description: string;
  metric: string;
  metricLabel: string;
  stack: string[];
  accent: "sky" | "violet" | "emerald";
}

const ACCENT = "#5bc0eb";

export default function CaseStudies() {
  const { t } = useTranslation();
  const items = t("caseStudies.items", { returnObjects: true }) as CaseStudy[];

  return (
    <section
      id="case-studies"
      className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-24 md:mb-32 max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 mb-5">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-5 font-display tracking-tight leading-[1.05]">
            {t("caseStudies.sectionTitle")}
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            {t("caseStudies.sectionSubtitle")}
          </p>
        </motion.div>

        {/* Editorial entries */}
        <div className="space-y-24 md:space-y-32">
          {items.map((study, index) => {
            const isLast = index === items.length - 1;
            return (
              <motion.article
                key={study.client}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative"
              >
                {/* Asymmetric header: number + company on left, hero metric on right */}
                <div className="grid grid-cols-12 gap-6 md:gap-8 items-start mb-10 md:mb-12">
                  {/* Left: number + client + industry (cols 7) */}
                  <div className="col-span-12 md:col-span-7">
                    <div className="flex items-baseline gap-5 md:gap-8">
                      <span
                        className="font-display font-black leading-none text-[clamp(2.75rem,6vw,5rem)] flex-shrink-0"
                        style={{ color: ACCENT, opacity: 0.22 }}
                        aria-hidden="true"
                      >
                        0{index + 1}
                      </span>
                      <div className="min-w-0 flex-1 pt-1">
                        <h3 className="font-display font-extrabold tracking-tight text-gray-900 leading-[0.95] text-[clamp(2.25rem,5.5vw,4.5rem)]">
                          {study.client}
                        </h3>
                        <p className="mt-3 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                          {study.industry}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: hero metric (cols 5) */}
                  <div className="col-span-12 md:col-span-5 md:text-end md:ps-8">
                    <div
                      className="font-display font-black leading-[0.9] text-[clamp(3.5rem,8vw,7rem)] tracking-tight"
                      style={{ color: ACCENT }}
                    >
                      {study.metric}
                    </div>
                    <p className="mt-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 max-w-[15rem] md:ms-auto">
                      {study.metricLabel}
                    </p>
                  </div>
                </div>

                {/* Editorial lede with hairline rule */}
                <div className="mb-10 md:mb-12 max-w-4xl">
                  <div
                    className="w-16 h-px mb-6"
                    style={{ background: ACCENT }}
                    aria-hidden="true"
                  />
                  <p className="font-display font-medium italic text-gray-900 leading-[1.2] text-[clamp(1.5rem,3.4vw,2.5rem)]">
                    {study.tagline}
                  </p>
                </div>

                {/* Description + Stack */}
                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                  <p className="md:col-span-7 text-base md:text-lg text-gray-600 leading-relaxed">
                    {study.description}
                  </p>
                  <div className="md:col-span-5 md:ps-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-3">
                      {t("caseStudies.stackLabel", "Stack")}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-gray-500">
                      {study.stack.map((tech, i) => (
                        <span key={tech} className="inline-flex items-center gap-3">
                          <span>{tech}</span>
                          {i < study.stack.length - 1 && (
                            <span className="text-gray-300">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {!isLast && (
                  <div
                    className="mt-24 md:mt-32 h-px w-full"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(15,40,68,0.12), transparent)",
                    }}
                    aria-hidden="true"
                  />
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
