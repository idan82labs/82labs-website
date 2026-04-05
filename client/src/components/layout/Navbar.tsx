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
        className={`md:hidden fixed top-16 inset-x-0 bottom-0 z-40 transition-all duration-300 ease-out ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 22, 40, 0.98) 0%, rgba(15, 40, 68, 0.98) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex flex-col h-full px-6 pt-6 pb-10 overflow-y-auto mobile-menu">
          {/* Nav links */}
          <nav className="flex-1" aria-label="Mobile navigation">
            {navLinks.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(link.id, e)}
                className="flex items-baseline justify-between py-5 border-b border-white/[0.08] text-white/90 hover:text-white transition-colors group"
                style={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-8px)",
                  transition: `opacity 0.4s ease ${0.08 + i * 0.05}s, transform 0.4s ease ${0.08 + i * 0.05}s`,
                }}
              >
                <span className="text-2xl font-semibold font-display tracking-tight">
                  {link.label}
                </span>
                <span
                  className="text-xs font-mono text-white/30 group-hover:text-white/60 transition-colors"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>

          {/* Footer: language + CTA */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between py-4 border-t border-white/[0.08]">
              <span className="text-xs font-medium text-white/40 uppercase tracking-[0.2em]">
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
