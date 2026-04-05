import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';

// Initialise with English only; Hebrew is loaded on demand (below)
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: typeof window !== 'undefined' && window.location.pathname.startsWith('/he') ? 'he' : 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// If the user lands on /he, dynamically fetch Hebrew translations
if (typeof window !== 'undefined' && window.location.pathname.startsWith('/he')) {
  import('./he.json').then((mod) => {
    i18n.addResourceBundle('he', 'translation', mod.default, true, true);
    if (i18n.language !== 'he') i18n.changeLanguage('he');
  });
}

// Lazy loader for runtime language switches
export async function loadLanguage(lng: 'en' | 'he') {
  if (i18n.hasResourceBundle(lng, 'translation')) return;
  if (lng === 'he') {
    const mod = await import('./he.json');
    i18n.addResourceBundle('he', 'translation', mod.default, true, true);
  }
}

export default i18n;
