import { format, formatDistance, formatRelative, isValid, Locale, parse } from "date-fns";
import { enUS } from "date-fns/locale";

interface DateFormatOptions {
  locale?: Locale;
  format?: string;
}

/**
 * Format a date with a specified format string
 * @param date Date to format
 * @param formatStr Format string (default: 'yyyy-MM-dd')
 * @param options Additional formatting options
 */
export function formatDate(
  date: Date | number | string,
  formatStr = "yyyy-MM-dd",
  options: DateFormatOptions = {},
): string {
  const { locale = enUS } = options;
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (!isValid(dateObj)) {
    console.warn("Invalid date provided to formatDate:", date);
    return "";
  }

  return format(dateObj, formatStr, { locale });
}

/**
 * Format date as relative to current time (e.g., "5 minutes ago")
 * @param date Date to format
 * @param baseDate Date to calculate relative to (default: now)
 * @param options Additional formatting options
 */
export function formatRelativeTime(
  date: Date | number | string,
  baseDate: Date | number = new Date(),
  options: DateFormatOptions = {},
): string {
  const { locale = enUS } = options;
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (!isValid(dateObj)) {
    console.warn("Invalid date provided to formatRelativeTime:", date);
    return "";
  }

  return formatDistance(dateObj, baseDate, {
    addSuffix: true,
    locale,
  });
}

/**
 * Format a date relative to the given base date
 * @param date Date to format
 * @param baseDate Date to calculate relative to
 * @param options Additional formatting options
 */
export function formatDateRelative(
  date: Date | number | string,
  baseDate: Date | number,
  options: DateFormatOptions = {},
): string {
  const { locale = enUS } = options;
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (!isValid(dateObj)) {
    console.warn("Invalid date provided to formatDateRelative:", date);
    return "";
  }

  return formatRelative(dateObj, baseDate, { locale });
}

/**
 * Parse a string date with the given format
 * @param dateStr Date string to parse
 * @param formatStr Format the string is in
 * @param referenceDate Reference date
 * @param options Additional parsing options
 */
export function parseDate(
  dateStr: string,
  formatStr: string,
  referenceDate: Date = new Date(),
  options: DateFormatOptions = {},
): Date {
  const { locale = enUS } = options;

  return parse(dateStr, formatStr, referenceDate, { locale });
}

/**
 * Common date formats
 */
export const DATE_FORMATS = {
  SHORT: "MM/dd/yyyy",
  MEDIUM: "MMM d, yyyy",
  LONG: "MMMM d, yyyy",
  ISO: "yyyy-MM-dd",
  TIME: "HH:mm",
  TIME_WITH_SECONDS: "HH:mm:ss",
  DATETIME: "yyyy-MM-dd HH:mm",
  DATETIME_WITH_SECONDS: "yyyy-MM-dd HH:mm:ss",
  RELATIVE: "relative",
};
