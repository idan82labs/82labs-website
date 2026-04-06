import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface ClosingCTAProps {
  onContactClick: () => void;
}

export default function ClosingCTA({ onContactClick }: ClosingCTAProps) {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: "linear-gradient(135deg, #091624, #0f2844, #0d2240)" }}>
      {/* Gradient orbs */}
      <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ background: "rgba(30, 100, 180, 0.12)" }} />
      <div className="absolute bottom-[-15%] right-[10%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(56, 140, 210, 0.08)" }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <AnimatedSection className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 font-display leading-tight tracking-tight">
          {t("closingCta.title")}
        </h2>
        <p className="text-lg mb-12 max-w-xl mx-auto leading-relaxed" style={{ color: "#94a3b8" }}>
          {t("closingCta.subtitle")}
        </p>
        <Button
          onClick={onContactClick}
          className="glow-cta text-base px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5"
        >
          {t("closingCta.cta")}
        </Button>

        <p className="mt-8 text-sm" style={{ color: "#94a3b8" }}>
          {t("closingCta.pricingHint")}
        </p>
      </AnimatedSection>
    </section>
  );
}
