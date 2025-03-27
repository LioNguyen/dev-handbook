import { useEffect, useRef, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const timmer = useRef<any | null>(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (debouncedValue === value) {
      return;
    }

    timmer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timmer.current) {
        clearTimeout(timmer.current);
      }
    };
  }, [value, delay, debouncedValue]);

  return debouncedValue;
}

export { useDebounce };
