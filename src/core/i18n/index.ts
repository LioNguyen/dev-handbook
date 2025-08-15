import { createContext, useContext } from 'react'
import type { SupportedLocale } from '@/core/config'

// Translation key type
export type TranslationKey = string

// Translation function type
export type TranslationFunction = (
  key: TranslationKey,
  params?: Record<string, string | number>
) => string

// I18n context type
export interface I18nContextType {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
  t: TranslationFunction
  isRTL: boolean
}

// Create i18n context
export const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Hook to use i18n
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

// Translation utility
export function interpolate(
  template: string,
  params: Record<string, string | number>
): string {
  return Object.entries(params).reduce(
    (result, [key, value]) =>
      result.replace(new RegExp(`{{${key}}}`, 'g'), String(value)),
    template
  )
}

// Pluralization helper
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  if (count === 1) return singular
  return plural || `${singular}s`
}

// RTL language detection
export function isRTLLanguage(locale: string): boolean {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'yi']
  return rtlLanguages.includes(locale.split('-')[0])
}

// Number formatting with locale
export function formatNumber(
  value: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value)
}

// Date formatting with locale
export function formatDate(
  date: Date | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}
