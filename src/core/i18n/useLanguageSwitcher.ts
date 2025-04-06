import { useCallback } from "react";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  name: string;
}

export const useLanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const availableLanguages: Language[] = [
    { code: "en", name: t("language.english") },
    { code: "vi", name: t("language.vietnamese") },
  ];

  const currentLanguage = i18n.language;

  const changeLanguage = useCallback(
    (code: string) => {
      i18n.changeLanguage(code);
    },
    [i18n],
  );

  return {
    currentLanguage,
    availableLanguages,
    changeLanguage,
  };
};
