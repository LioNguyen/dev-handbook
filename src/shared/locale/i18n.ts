import i18n, { TOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import authEn from "./en/auth.json";
import auditEn from "./en/audit.json";
import commonEn from "./en/common.json";
import fieldEn from "./en/field.json";
import licenseEn from "./en/license.json";
import productEn from "./en/product.json";
import settingEn from "./en/setting.json";
import userEn from "./en/user.json";

import authKr from "./kr/auth.json";
import auditKr from "./kr/audit.json";
import commonKr from "./kr/common.json";
import fieldKr from "./kr/field.json";
import licenseKr from "./kr/license.json";
import productKr from "./kr/product.json";
import settingKr from "./kr/setting.json";
import userKr from "./kr/user.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  ns: ["auth", "audit", "common", "field", "license", "product", "user", "setting"],
  defaultNS: "common",
  resources: {
    en: {
      auth: authEn,
      audit: auditEn,
      common: commonEn,
      field: fieldEn,
      license: licenseEn,
      product: productEn,
      setting: settingEn,
      user: userEn,
    },
    kr: {
      auth: authKr,
      audit: auditKr,
      common: commonKr,
      field: fieldKr,
      license: licenseKr,
      product: productKr,
      setting: settingKr,
      user: userKr,
    },
  },
});

interface IGetTranslation {
  key: string;
  keyOptions?: TOptions;
  defaultKey: string;
  defaultKeyOptions?: TOptions;
}

/**
 * Retrieves translated string for given key with fallback value
 * @param key - The key to translate
 * @param keyOptions - The key options to translate
 * @param defaultKey - Optional default key if translation is not found
 * @param defaultKeyOptions - Optional default key options if translation is not found
 * @returns Translated string or default value
 */
const getTranslation = ({ defaultKey, defaultKeyOptions, key, keyOptions }: IGetTranslation): string => {
  // Check if the key exists in translations
  const exists = i18n.exists(key, keyOptions);

  if (exists) {
    return i18n.t(key, keyOptions);
  }

  return i18n.t(defaultKey, defaultKeyOptions);
};

export default i18n;
export { getTranslation };
