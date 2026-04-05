import { type ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PageLayoutProps {
  children: ReactNode;
  lang?: "en" | "he";
}

const metaByLang = {
  en: {
    title: "82Labs — We automate the messy parts | n8n & fullstack studio",
    description:
      "Official n8n Partners. 82Labs builds intelligent automation and fullstack systems that turn complex business workflows into systems that run themselves. Based in Israel.",
  },
  he: {
    title: "82Labs — אנחנו הופכים תהליכים מסובכים לפשוטים | אוטומציה ופולסטאק",
    description:
      "שותפים רשמיים של n8n. בונים מערכות אוטומציה ופולסטאק שהופכות תהליכים עסקיים מורכבים למערכות שרצות לבד.",
  },
};

export default function PageLayout({ children, lang = "en" }: PageLayoutProps) {
  const { i18n } = useTranslation();
  const isRtl = lang === "he";

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    // Update document-level attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    // Update title + description
    document.title = metaByLang[lang].title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute("content", metaByLang[lang].description);
  }, [lang, isRtl, i18n]);

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
