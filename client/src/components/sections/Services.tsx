import { useTranslation } from "react-i18next";
import { ChevronRight, Check, Layers, GitBranch, BookOpen } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "@/components/shared/AnimatedSection";

interface ServicesProps {
  onServiceClick: (serviceId: string) => void;
}

const services = [
  { id: "fullstack", Icon: Layers },
  { id: "automation", Icon: GitBranch },
  { id: "lectures", Icon: BookOpen },
];

export default function Services({ onServiceClick }: ServicesProps) {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: "#0c1e36" }}>
      {/* Ambient background glow */}
      <div className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none" style={{ background: "rgba(30, 100, 180, 0.06)" }} />
      <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(56, 130, 200, 0.05)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 font-display tracking-tight">
            {t("services.sectionTitle")}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("services.sectionSubtitle")}
          </p>
        </AnimatedSection>

        <AnimatedSection stagger className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const titleKey = `services.${service.id}.title` as const;
            const descKey = `services.${service.id}.description` as const;
            const learnKey = `services.${service.id}.learnMore` as const;

            return (
              <AnimatedItem key={service.id}>
                <div
                  className="group relative rounded-2xl p-8 lg:p-10 h-full cursor-pointer transition-all duration-500 hover:-translate-y-1 border border-white/[0.06] group-hover:border-[#5bc0eb]/30 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)" }}
                  onClick={() => onServiceClick(service.id)}
                >
                  {/* Cyan accent on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(91,192,235,0.06), transparent 65%)" }} />

                  {/* Top cyan hairline */}
                  <div className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, #5bc0eb, transparent)" }} />

                  {/* Icon badge */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-8"
                    style={{
                      background: "rgba(91, 192, 235, 0.08)",
                      border: "1px solid rgba(91, 192, 235, 0.2)",
                    }}
                  >
                    <service.Icon
                      size={44}
                      strokeWidth={1.75}
                      style={{ color: "#5bc0eb" }}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 font-display">
                    {t(titleKey)}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-6 text-sm lg:text-base">
                    {t(descKey)}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {(t(`services.${service.id}.features`, { returnObjects: true }) as string[]).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} style={{ color: "#5bc0eb" }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                    {t(learnKey)}
                    <ChevronRight className="w-4 h-4 ms-1 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                  </div>
                </div>
              </AnimatedItem>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
