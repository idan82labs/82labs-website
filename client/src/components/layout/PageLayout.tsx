import { type ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { loadLanguage } from "@/i18n/config";

interface PageLayoutProps {
  children: ReactNode;
  lang?: "en" | "he";
}

const metaByLang = {
  en: {
    title: "82Labs — AI agents & fullstack studio | We automate the messy parts",
    description:
      "82Labs builds AI-agent automation and fullstack systems in code — Claude, OpenAI, LangChain, Python. We turn complex business workflows into systems that run themselves. Based in Israel.",
  },
  he: {
    title: "82Labs — סוכני AI ופולסטאק | אנחנו הופכים תהליכים מסובכים לפשוטים",
    description:
      "82Labs בונה אוטומציית סוכני AI ומערכות פולסטאק בקוד — Claude, OpenAI, LangChain, Python. הופכים תהליכים עסקיים מורכבים למערכות שרצות לבד.",
  },
};

export default function PageLayout({ children, lang = "en" }: PageLayoutProps) {
  const { i18n } = useTranslation();
  const isRtl = lang === "he";

  useEffect(() => {
    let cancelled = false;
    if (i18n.language !== lang) {
      loadLanguage(lang).then(() => {
        if (!cancelled) i18n.changeLanguage(lang);
      });
    }
    // Update document-level attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    // Update title + description
    document.title = metaByLang[lang].title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute("content", metaByLang[lang].description);
    return () => { cancelled = true; };
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
