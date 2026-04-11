import { useTranslation } from "react-i18next";
import { useReveal } from "@/hooks/useReveal";
import mizrahiLogo from "@assets/logos/mizrahi.png";
import rafaelLogo from "@assets/logos/rafael.png";
import terminalxLogo from "@assets/logos/terminalx.png";
import anekLogo from "@assets/logos/anek.png";
import itcLogo from "@assets/logos/itc.png";
import googleReichmanLogo from "@assets/logos/google-reichman.png";
import scdLogo from "@assets/logos/scd.png";
import plasanLogo from "@assets/logos/plasan.png";
import kostikaLogo from "@assets/logos/kostika.png";

const logos = [
  { name: "Rafael", src: rafaelLogo, width: "w-28 md:w-32" },
  { name: "Plasan", src: plasanLogo, width: "w-28 md:w-32" },
  { name: "SCD", src: scdLogo, width: "w-16 md:w-20" },
  { name: "Mizrahi Tefahot", src: mizrahiLogo, width: "w-28 md:w-32" },
  { name: "TerminalX", src: terminalxLogo, width: "w-28 md:w-32" },
  { name: "Kostika", src: kostikaLogo, width: "w-24 md:w-28" },
  { name: "Anek Capital", src: anekLogo, width: "w-24 md:w-28" },
  { name: "ITC", src: itcLogo, width: "w-10 md:w-12" },
  { name: "Google × Reichman", src: googleReichmanLogo, width: "w-36 md:w-40" },
];

export default function TrustedBy() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="bg-white">
      <div ref={ref} className="reveal-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] mb-10 text-gray-400">
          {t("trustedBy.label")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20 md:gap-y-10">
          {logos.map((logo, i) => (
            <div
              key={logo.name}
              className={`${logo.width} flex items-center justify-center grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-500 logo-reveal`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                width={128}
                height={40}
                className="w-full h-auto max-h-10 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
