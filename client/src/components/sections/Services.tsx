import { useTranslation } from "react-i18next";
import { ChevronRight, Code2, Zap, GraduationCap, Check } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "@/components/shared/AnimatedSection";

interface ServicesProps {
  onServiceClick: (serviceId: string) => void;
}

const services = [
  {
    id: "fullstack",
    icon: Code2,
    accent: "from-sky-400 to-blue-600",
    accentLight: "bg-sky-500/10",
    iconColor: "text-sky-400",
    borderHover: "group-hover:border-sky-500/30",
  },
  {
    id: "automation",
    icon: Zap,
    accent: "from-violet-400 to-fuchsia-500",
    accentLight: "bg-violet-500/10",
    iconColor: "text-violet-300",
    borderHover: "group-hover:border-violet-500/30",
  },
  {
    id: "lectures",
    icon: GraduationCap,
    accent: "from-emerald-400 to-teal-500",
    accentLight: "bg-emerald-500/10",
    iconColor: "text-emerald-300",
    borderHover: "group-hover:border-emerald-500/30",
  },
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
            const Icon = service.icon;
            const titleKey = `services.${service.id}.title` as const;
            const descKey = `services.${service.id}.description` as const;
            const learnKey = `services.${service.id}.learnMore` as const;

            return (
              <AnimatedItem key={service.id}>
                <div
                  className={`group relative rounded-2xl p-8 lg:p-10 h-full cursor-pointer transition-all duration-500 hover:-translate-y-1.5 border border-white/[0.06] ${service.borderHover} overflow-hidden`}
                  style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)" }}
                  onClick={() => onServiceClick(service.id)}
                >
                  {/* Subtle gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 rounded-2xl`} />

                  {/* Top gradient line accent */}
                  <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

                  <div className={`w-12 h-12 rounded-xl ${service.accentLight} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-6 h-6 ${service.iconColor}`} />
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
                        <Check className={`w-4 h-4 flex-shrink-0 ${service.iconColor}`} strokeWidth={2.5} />
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
