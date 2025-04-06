// src/core/i18n/index.ts
import i18n, { changeLanguage, type TFunction, type TranslationKey } from "./i18n";
import { useLanguageSwitcher } from "./useLanguageSwitcher";

export {
  changeLanguage,
  i18n,
  useLanguageSwitcher,
  // Types
  type TFunction,
  type TranslationKey,
};

// Initialize i18n
export default i18n;
