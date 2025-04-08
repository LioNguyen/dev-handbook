import { useEffect, useState } from "react";

/**
 * A hook that delays updating a value until a specified amount of time has passed
 * without further changes. Useful for search inputs, form validations, etc.
 *
 * @param value The value to debounce
 * @param delay The delay time in milliseconds (default: 500ms)
 * @param immediate If true, returns initial value immediately (default: false)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay = 500, immediate = false): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(immediate ? value : (undefined as unknown as T));

  useEffect(() => {
    // Set up the timeout to update the debounced value after the delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if the value changes before the delay has passed
    // or if the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage examples:
//
// Example 1: Debounced search
//
// function SearchComponent() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const debouncedSearchTerm = useDebounce(searchTerm, 300);
//
//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       performSearch(debouncedSearchTerm);
//     }
//   }, [debouncedSearchTerm]);
//
//   return (
//     <input
//       type="text"
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       placeholder="Search..."
//     />
//   );
// }
//
// Example 2: Debounced form validation
//
// function FormField() {
//   const [value, setValue] = useState('');
//   const [error, setError] = useState('');
//   const debouncedValue = useDebounce(value, 500);
//
//   useEffect(() => {
//     if (debouncedValue) {
//       validateField(debouncedValue).then(setError);
//     }
//   }, [debouncedValue]);
//
//   return (
//     <>
//       <input
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       />
//       {error && <div className="error">{error}</div>}
//     </>
//   );
// }
