import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface CaseStudy {
  client: string;
  industry: string;
  tagline: string;
  description: string;
  outcome: string;
  stack: string[];
  accent: "sky" | "violet" | "emerald";
}

const accentColor: Record<CaseStudy["accent"], string> = {
  sky: "#5bc0eb",
  violet: "#1e5a8a",
  emerald: "#0f2844",
};

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
          className="mb-20 md:mb-28 max-w-3xl"
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

        {/* Editorial list */}
        <div className="space-y-20 md:space-y-28">
          {items.map((study, index) => {
            const color = accentColor[study.accent];
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
                {/* Row 1: Number + company name */}
                <div className="flex items-baseline gap-6 md:gap-10 mb-6 md:mb-8">
                  <span
                    className="font-display font-black leading-none text-[clamp(3rem,7vw,6rem)] flex-shrink-0"
                    style={{ color, opacity: 0.18 }}
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-extrabold tracking-tight text-gray-900 leading-[0.95] text-[clamp(2.5rem,6vw,5rem)]">
                      {study.client}
                    </h3>
                    <p className="mt-3 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                      {study.industry}
                    </p>
                  </div>
                </div>

                {/* Row 2: Tagline as editorial quote */}
                <p className="font-display font-medium text-gray-800 leading-[1.25] text-[clamp(1.5rem,3vw,2.25rem)] mb-10 md:mb-12 max-w-4xl">
                  {study.tagline}
                </p>

                {/* Row 3: Description + sidebar */}
                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                  <p className="md:col-span-7 text-base md:text-lg text-gray-600 leading-relaxed">
                    {study.description}
                  </p>
                  <div className="md:col-span-5 md:border-s-2 md:ps-8 space-y-6" style={{ borderColor: `${color}22` }}>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-2">
                        {t("caseStudies.outcomeLabel", "Outcome")}
                      </p>
                      <p
                        className="font-display font-bold text-2xl md:text-3xl tracking-tight"
                        style={{ color }}
                      >
                        {study.outcome}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-2">
                        {t("caseStudies.stackLabel", "Stack")}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {study.stack.join("  ·  ")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {!isLast && (
                  <div
                    className="mt-20 md:mt-28 h-px w-full"
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
