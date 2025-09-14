import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enTranslation from "./public/locales/en/Translation.json";
import hiTranslation from "./public/locales/hi/Translation.json";
import mrTranslation from "./public/locales/mr/Translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    hi: {
      translation: hiTranslation,
    },
    mr: {
      translation: mrTranslation,
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { 
    escapeValue: false 
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
