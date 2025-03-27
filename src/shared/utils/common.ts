import { format, isValid, parseISO } from "date-fns";
import { toNumber, isNaN, mapValues, isEmpty, keyBy } from "lodash";
import { z } from "zod";

// ========== Type Definitions ==========
interface IDataItem {
  id: number | null;
  name: string | null;
  value?: any;
}

interface IConvertedObject {
  [key: string]: any;
  keyBy?: string;
}

interface INumberFormatOptions {
  decimals?: number;
  thousandSeparator?: string;
  decimalSeparator?: string;
}

interface IParseSchemaReturn<T = any> {
  schema: z.ZodType<T>;
  message: string;
}

// ========== Date Utilities ==========
/**
 * Format a date string according to specified format
 * @param {string} date - Date string to format
 * @param {string} [dateFormat] - Output format (defaults to "yyyy-MM-dd")
 * @returns {string} Formatted date string
 * @example
 * formatDateTime("2024-02-26") // "2024-02-26"
 * formatDateTime("2024-02-26", "dd/MM/yyyy") // "26/02/2024"
 */
function formatDateTime(date: string, dateFormat?: string) {
  try {
    // Try to parse the string as an ISO date
    const parsedDate = parseISO(date);

    // If parsing failed or produced an invalid date, return the original string
    if (!isValid(parsedDate)) {
      return date;
    }

    // Check if the result is a valid date
    return format(parsedDate, dateFormat || "yyyy-MM-dd");
  } catch (error) {
    console.error(error);
    // If any error occurs during parsing or formatting, return the original string
    return date;
  }
}

/**
 * Parse various date formats into Date object
 * @param {Date | string | undefined} value - Input date
 * @returns {Date | undefined} Parsed Date object or undefined if invalid
 * @example
 * parseDate("2024-02-26") // Date object
 * parseDate("invalid") // undefined
 */
function parseDate(value: Date | string | undefined): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return isValid(value) ? value : undefined;

  try {
    // Try ISO string parsing first
    const date = parseISO(value);
    if (isValid(date)) return date;

    // Fallback to direct Date creation
    const normalDate = new Date(value);
    return isValid(normalDate) ? normalDate : undefined;
  } catch {
    return undefined;
  }
}

// ========== Number Utilities ==========
/**
 * Format a number with custom separators and decimal places
 * @param {number} value - Number to format
 * @param {INumberFormatOptions} [options] - Formatting options
 * @returns {string} Formatted number string
 * @example
 * formatNumber(1234.5678) // "1,235"
 * formatNumber(1234.5678, { decimals: 2 }) // "1,234.57"
 */
const formatNumber = (value: number, options?: INumberFormatOptions): string => {
  const { decimals = 0, thousandSeparator = ",", decimalSeparator = "." } = options || {};

  const parts = value.toFixed(decimals).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

  return parts.join(decimalSeparator);
};

/**
 * Format any value for display, with number formatting support
 * @param {string | number | null | undefined} val - Value to format
 * @param {INumberFormatOptions} [numberFormat] - Number formatting options
 * @returns {string} Formatted string
 */
const formatValue = (val: string | number | null | undefined, numberFormat?: INumberFormatOptions): string => {
  if (val === null || val === undefined) return "";
  if (typeof val === "number" && numberFormat) {
    return formatNumber(val, numberFormat);
  }
  return String(val);
};

/**
 * Converts and validates an input to a numeric ID
 * @param {string|number} input - The input to convert and validate
 * @returns {number|undefined} - Returns the valid numeric ID or undefined if invalid
 */
const parseNumericId = (input: number | string) => {
  // Return undefined for null, undefined or empty string
  if (input === null || input === undefined || input === "") {
    return undefined;
  }

  // Convert to number if it's a string
  const numericId = typeof input === "string" ? toNumber(input) : input;

  // If it's a valid number (not NaN), return the number, otherwise undefined
  return !isNaN(numericId) ? numericId : undefined;
};

// ========== String Utilities ==========
/**
 * Truncate text and add ellipsis if needed
 * @param {string | null | undefined} text - Text to truncate
 * @param {number} [charCount=8] - Maximum characters to show
 * @returns {string} Truncated text
 * @example
 * truncateText("Hello World", 5) // "Hello..."
 */
const truncateText = (text: string | null | undefined, charCount: number = 8): string => {
  if (!text) return "";
  if (text.length <= charCount) return text;
  return `${text.slice(0, charCount).trim()}...`;
};

// ========== Data Transformation ==========
/**
 * Convert array of objects to keyed object
 * @param {IDataItem[]} array - Array of data items
 * @param {string} [keyBy="id"] - Property to use as key
 * @returns {IConvertedObject | null} Converted object or null if empty
 * @example
 * convertArrayToObject([{ id: 1, name: "test", value: "data" }])
 * { "1": "data" }
 */
function convertArrayToObject(array: IDataItem[], key = "id"): IConvertedObject | null {
  const result = mapValues(
    keyBy(
      array.filter(item => item.id != null && item.name != null),
      key,
    ),
    "value",
  );

  return isEmpty(result) ? null : result;
}

// ========== Schema Utilities ==========
/**
 * Parse Zod schema into array of validation rules
 * @template T Schema type
 * @param {z.ZodType<T>} schema - Zod schema to parse
 * @returns {IParseSchemaReturn<T>[]} Array of validation rules
 */
const parseSchemaToArray = <T>(schema: z.ZodType<T>): IParseSchemaReturn<T>[] => {
  const checks = (schema as any)._def.checks;
  return checks
    .map((check: any) => {
      // Handle minimum length validation
      if (check.kind === "min") {
        return {
          schema: z.string().min(check.value),
          message: check.message,
        };
      }
      // Handle regex pattern validation
      if (check.kind === "regex") {
        return {
          schema: z.string().regex(check.regex),
          message: check.message,
        };
      }
    })
    .filter(Boolean);
};

// ========== Exports ==========
export {
  // Date utils
  formatDateTime,
  parseDate,

  // Number utils
  formatNumber,
  formatValue,
  parseNumericId,

  // String utils
  truncateText,

  // Data transformation
  convertArrayToObject,

  // Schema utils
  parseSchemaToArray,
};

export type { INumberFormatOptions, IParseSchemaReturn };
