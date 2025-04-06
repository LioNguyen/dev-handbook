// src/core/i18n/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Import language resources
import enCommon from "./locales/en/common.json";
import enValidation from "./locales/en/validation.json";
import viCommon from "./locales/vi/common.json";
import viValidation from "./locales/vi/validation.json";

// Resource bundles for all languages and namespaces
const resources = {
  en: {
    common: enCommon,
    validation: enValidation,
  },
  vi: {
    common: viCommon,
    validation: viValidation,
  },
};

i18n
  // Load translations from backend (optional for dynamic loading)
  .use(Backend)
  // Detect user language (optional)
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language

    defaultNS: "common", // Default namespace
    fallbackNS: "common", // Fallback namespace

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Order and from where user language should be detected
      order: ["localStorage", "cookie", "navigator"],

      // Cache language selection in localStorage
      caches: ["localStorage"],
    },
  });

export default i18n;

// Utility function to change language
export const changeLanguage = (language: string) => {
  return i18n.changeLanguage(language);
};

// Type definitions for type-safe translations
export type TFunction = typeof i18n.t;
export type TranslationKey = string;
