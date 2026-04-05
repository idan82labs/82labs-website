import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import Logo from "@assets/Logo.png";

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
              <img
                src={Logo}
                alt="82 Labs"
                width={80}
                height={32}
                className="h-8 w-auto transition-all duration-300 hover:scale-105"
                style={{
                  filter: hasScrolled ? "none" : "brightness(0) invert(1)",
                }}
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
            <LanguageSwitcher variant={hasScrolled ? "light" : "dark"} />
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
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded focus-visible:outline-none focus-visible:ring-2 ${
                hasScrolled
                  ? "text-gray-700 focus-visible:ring-gray-900"
                  : "text-white focus-visible:ring-white"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-gray-100 py-4 animate-in slide-in-from-top duration-200 bg-white rounded-b-xl"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(link.id, e)}
                  className="block w-full text-start py-3 px-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3">
                <Button
                  onClick={() => {
                    onContactClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="minimal-button minimal-button-primary w-full"
                >
                  {t("nav.requestDemo")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
