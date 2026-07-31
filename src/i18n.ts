import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import ICU from 'i18next-icu';

const languages = ['es', 'en', 'fr', 'zh'];

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(ICU)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    supportedLngs: languages,
    ns: ['common', 'seo'],
    defaultNS: 'common',
    
    // Lazy load locales via HTTP backend
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'kinomori-lang',
    },
    
    interpolation: { 
      escapeValue: false,
    },
    
    // ICU pluralization
    pluralSeparator: '_',
    
    // React options
    react: {
      useSuspense: false,
    },
  });

// Preload default language for initial render
if (typeof window !== 'undefined') {
  const savedLang = localStorage.getItem('kinomori-lang');
  const browserLang = navigator.language.split('-')[0];
  let initialLang = 'es';
  if (savedLang && languages.includes(savedLang)) {
    initialLang = savedLang;
  } else if (languages.includes(browserLang)) {
    initialLang = browserLang;
  }
  
  // Preload initial language
  i18n.loadNamespaces(['common', 'seo']);
}

export default i18n;