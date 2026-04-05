import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import Logo from "@assets/Logo.png";

interface FooterProps {
  onPrivacyClick: () => void;
  onContactClick: () => void;
}

export default function Footer({ onPrivacyClick, onContactClick }: FooterProps) {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <img src={Logo} alt="82 Labs" className="h-7 mb-4" />
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {t("footer.builtWith")}
            </p>
            <LanguageSwitcher />
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t("footer.services")}
            </h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection("services")} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t("footer.fullstack")}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t("footer.automation")}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t("footer.training")}
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t("footer.company")}
            </h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection("why-us")} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t("footer.about")}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("industries")} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t("footer.industries")}
                </button>
              </li>
              <li>
                <button onClick={onPrivacyClick} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t("footer.privacy")}
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t("footer.connect")}
            </h3>
            <ul className="space-y-3">
              <li>
                <button onClick={onContactClick} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  {t("footer.contact")}
                </button>
              </li>
              <li>
                <a href="https://linkedin.com/company/82labs" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/idan82labs" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
