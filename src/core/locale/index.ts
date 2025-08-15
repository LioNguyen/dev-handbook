import en from './en'
import es from './es'

export const locales = {
  en,
  es,
} as const

// Type for all translation keys (using string values instead of literal types)
export type TranslationKeys = Record<string, unknown>

// Type for supported locales
export type SupportedLocale = keyof typeof locales

// Get locale data
export function getLocaleData(
  locale: SupportedLocale
): Record<string, unknown> {
  return locales[locale] || locales.en
}

// Export individual locales
export { en, es }
export default locales
