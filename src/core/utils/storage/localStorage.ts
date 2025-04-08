/**
 * Get an item from localStorage with proper type casting
 * @param key The localStorage key
 * @returns The value or null if not found
 */
export function getItem<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return null;
  }
}

/**
 * Set an item in localStorage with serialization
 * @param key The localStorage key
 * @param value The value to store
 */
export function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
}

/**
 * Remove an item from localStorage
 * @param key The localStorage key
 */
export function removeItem(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
  }
}

/**
 * Clear all items from localStorage
 */
export function clearLocalStorage(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

/**
 * Get all keys from localStorage
 * @returns Array of localStorage keys
 */
export function getAllKeys(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return Object.keys(window.localStorage);
  } catch (error) {
    console.error("Error getting localStorage keys:", error);
    return [];
  }
}

/**
 * Check if a key exists in localStorage
 * @param key The localStorage key
 * @returns Boolean indicating if key exists
 */
export function hasItem(key: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Error checking for item ${key} in localStorage:`, error);
    return false;
  }
}
