import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { loadLanguage } from "@/i18n/config";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "light" | "dark";
}

export default function LanguageSwitcher({ className = "", variant = "light" }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [, setLocation] = useLocation();
  const isHebrew = i18n.language === "he";

  const toggle = async () => {
    if (isHebrew) {
      i18n.changeLanguage("en");
      setLocation("/");
    } else {
      await loadLanguage("he");
      i18n.changeLanguage("he");
      setLocation("/he");
    }
  };

  const styles = variant === "dark"
    ? "text-white/80 border-white/20 hover:bg-white/10 hover:text-white hover:border-white/30"
    : "text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900";

  return (
    <button
      onClick={toggle}
      className={`text-sm font-medium px-3 py-1.5 rounded-md border transition-colors duration-200 ${styles} ${className}`}
      aria-label={isHebrew ? "Switch to English" : "Switch to Hebrew"}
    >
      {isHebrew ? "EN" : "עב"}
    </button>
  );
}
