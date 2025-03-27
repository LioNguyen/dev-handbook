/**
 * Save data to localStorage
 * @param key - The key under which the data will be stored
 * @param value - The data to store, can be any serializable value
 */
function setLocalStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

/**
 * Retrieve data from localStorage
 * @param key - The key of the stored data
 * @returns The parsed data or null if not found or error occurs
 */
function getLocalStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key);

    if (!serializedValue || serializedValue === "undefined") {
      return null;
    }

    // Try to parse JSON
    try {
      return JSON.parse(serializedValue) as T;
    } catch {
      // Return as string if JSON parsing fails
      return serializedValue as T;
    }
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
}

/**
 * Remove data from localStorage
 * @param key - The key to remove from localStorage
 */
function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
}

/**
 * Clear all data from localStorage
 */
function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

export { clearLocalStorage, getLocalStorage, removeLocalStorage, setLocalStorage };
