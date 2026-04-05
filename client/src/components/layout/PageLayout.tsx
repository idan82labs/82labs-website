import { type ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PageLayoutProps {
  children: ReactNode;
  lang?: "en" | "he";
}

export default function PageLayout({ children, lang = "en" }: PageLayoutProps) {
  const { i18n } = useTranslation();
  const isRtl = lang === "he";

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      lang={lang}
      className={`min-h-screen bg-white ${isRtl ? "font-heebo" : "font-sans"}`}
    >
      {children}
    </div>
  );
}
