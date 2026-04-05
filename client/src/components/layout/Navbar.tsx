import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import LogoSvg from "@/components/shared/LogoSvg";

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open + close on Escape
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: t("nav.services"), id: "services" },
    { label: t("nav.work"), id: "case-studies" },
    { label: t("nav.process"), id: "process" },
    { label: t("nav.industries"), id: "industries" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        hasScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-200"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a
              href="#main"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="82Labs home"
              className="inline-block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white"
            >
              <LogoSvg
                variant={hasScrolled ? "light" : "dark"}
                className="h-8 w-auto transition-transform duration-300 hover:scale-105"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center justify-center space-x-8 rtl:space-x-reverse flex-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(link.id, e)}
                className={`transition-colors duration-200 font-medium text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                  hasScrolled
                    ? "text-gray-600 hover:text-gray-900 focus-visible:ring-gray-900"
                    : "text-white/80 hover:text-white focus-visible:ring-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop-only: language switcher + CTA */}
            <div className="hidden md:block">
              <LanguageSwitcher variant={hasScrolled ? "light" : "dark"} />
            </div>
            <Button
              onClick={onContactClick}
              className={`hidden md:block text-sm px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                hasScrolled
                  ? "minimal-button minimal-button-primary"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              {t("nav.requestDemo")}
            </Button>
            {/* Mobile-only: hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                hasScrolled
                  ? "text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-900"
                  : "text-white hover:bg-white/10 focus-visible:ring-white"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer — full viewport height below navbar */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`md:hidden fixed top-16 inset-x-0 bottom-0 z-40 transition-all duration-500 ease-out ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(15, 40, 68, 0.98) 0%, rgba(10, 22, 40, 0.99) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div className="flex flex-col h-full px-6 pt-8 pb-8 overflow-y-auto mobile-menu">
          {/* Top: Live clock */}
          <LiveClock visible={isMobileMenuOpen} />

          {/* Nav links with staircase offset */}
          <nav className="flex-1 flex flex-col justify-center" aria-label="Mobile navigation">
            {navLinks.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(link.id, e)}
                className="group flex items-baseline justify-between py-3 text-white/90 hover:text-white transition-colors"
                style={{
                  paddingInlineStart: `${i * 10}px`,
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-24px)",
                  transition: `opacity 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.12 + i * 0.07}s, transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.12 + i * 0.07}s`,
                }}
              >
                <span
                  className="font-display font-semibold tracking-tight leading-[1.05]"
                  style={{ fontSize: "clamp(2.25rem, 9vw, 3rem)" }}
                >
                  {link.label}
                </span>
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 group-hover:text-[#5bc0eb] transition-colors"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>

          {/* Signature flow beam at bottom */}
          <div aria-hidden="true" className="mb-6 opacity-60" style={{ direction: "ltr" }}>
            <svg viewBox="0 0 320 20" className="w-full h-auto">
              <defs>
                <linearGradient id="drawer-beam" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#5bc0eb" stopOpacity="0" />
                  <stop offset="50%" stopColor="#5bc0eb" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5bc0eb" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 10 10 Q 70 2, 110 10 T 210 10 T 310 10"
                stroke="url(#drawer-beam)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                className={isMobileMenuOpen ? "drawer-beam-run" : ""}
                strokeDasharray="18 400"
              />
            </svg>
            <style>{`
              .drawer-beam-run {
                animation: drawer-beam-travel 2.8s linear infinite;
              }
              @keyframes drawer-beam-travel {
                from { stroke-dashoffset: 0; }
                to   { stroke-dashoffset: -418; }
              }
              @media (prefers-reduced-motion: reduce) {
                .drawer-beam-run { animation: none; }
              }
            `}</style>
          </div>

          {/* Footer: language + CTA */}
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-t border-white/[0.08]">
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-[0.25em]">
                Language
              </span>
              <LanguageSwitcher variant="dark" />
            </div>
            <Button
              onClick={() => {
                onContactClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-base py-6 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              {t("nav.requestDemo")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

/** Live Tel Aviv clock shown at the top of the mobile drawer. */
function LiveClock({ visible }: { visible: boolean }) {
  const [time, setTime] = useState(getTelAvivTime());
  useEffect(() => {
    if (!visible) return;
    setTime(getTelAvivTime());
    const interval = setInterval(() => setTime(getTelAvivTime()), 30_000);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div
      className="flex items-center justify-between mb-10 text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
      }}
    >
      <span>Tel Aviv</span>
      <span className="flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#5bc0eb", boxShadow: "0 0 8px #5bc0eb" }}
          aria-hidden="true"
        />
        {time}
      </span>
    </div>
  );
}

function getTelAvivTime(): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jerusalem",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "—";
  }
}
