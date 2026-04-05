import { useTranslation } from "react-i18next";

// Clean text-based placeholder logos
const clientLogos = [
  { id: 1, name: "Meridian", style: "tracking-[0.2em] uppercase" },
  { id: 2, name: "TechFlow", style: "font-bold italic" },
  { id: 3, name: "DataBridge", style: "tracking-wider" },
  { id: 4, name: "Nexora", style: "font-extrabold" },
  { id: 5, name: "CloudPeak", style: "tracking-[0.15em] uppercase text-[13px]" },
  { id: 6, name: "Primewave", style: "font-bold" },
  { id: 7, name: "Volterra", style: "tracking-widest uppercase text-[12px]" },
  { id: 8, name: "Synthex", style: "font-extrabold italic" },
];

export default function TrustedBy() {
  const { t } = useTranslation();

  return (
    <section style={{ background: "linear-gradient(180deg, #0d2240 0%, #0a1a30 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] mb-10" style={{ color: "rgba(255,255,255,0.3)" }}>
          {t("trustedBy.label")}
        </p>
        <div className="overflow-hidden">
          <div className="trusted-track">
            {[...Array(2)].map((_, repeatIndex) =>
              clientLogos.map((logo) => (
                <div
                  key={`${repeatIndex}-${logo.id}`}
                  className="flex items-center justify-center min-w-[140px] h-10 transition-opacity duration-500"
                  style={{ opacity: 0.25 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.25")}
                >
                  <span className={`text-white font-display text-base select-none ${logo.style}`}>
                    {logo.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
