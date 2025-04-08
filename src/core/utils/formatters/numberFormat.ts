/**
 * Format a number as currency
 * @param value Number to format
 * @param currency Currency code (default: USD)
 * @param locale Locale for formatting (default: en-US)
 */
export function formatCurrency(value: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number with thousands separators
 * @param value Number to format
 * @param decimalPlaces Number of decimal places
 * @param locale Locale for formatting
 */
export function formatNumber(value: number, decimalPlaces = 0, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
}

/**
 * Format a number as percentage
 * @param value Number to format (0-1 range)
 * @param decimalPlaces Number of decimal places
 * @param locale Locale for formatting
 */
export function formatPercent(value: number, decimalPlaces = 0, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
}

/**
 * Format a number as compact (e.g., 1.2K, 5.3M)
 * @param value Number to format
 * @param locale Locale for formatting
 */
export function formatCompact(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}

/**
 * Format a filesize in bytes to human readable format
 * @param bytes Size in bytes
 * @param decimalPlaces Number of decimal places
 */
export function formatFileSize(bytes: number, decimalPlaces = 2): string {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPlaces))} ${sizes[i]}`;
}
