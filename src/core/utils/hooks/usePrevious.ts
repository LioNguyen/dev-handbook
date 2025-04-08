import { useEffect, useRef } from "react";

/**
 * A hook that stores and returns the previous value of a variable.
 * Useful for comparing previous and current values in effects or renders.
 *
 * @param value The value to track
 * @param initialValue Optional initial "previous" value
 * @returns The previous value
 */
export function usePrevious<T>(value: T, initialValue?: T): T | undefined {
  // Create a ref that stores the previous value
  const ref = useRef<T | undefined>(initialValue);

  // Update the ref when the value changes
  // This happens after the render but before useEffect cleanup
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the previous value (which is null on first render)
  return ref.current;
}

// Usage examples:
//
// Example 1: Detecting direction of a counter
//
// function Counter() {
//   const [count, setCount] = useState(0);
//   const prevCount = usePrevious(count);
//   const direction = prevCount !== undefined && count > prevCount
//     ? 'increasing'
//     : prevCount !== undefined && count < prevCount
//       ? 'decreasing'
//       : 'unchanged';
//
//   return (
//     <div>
//       <p>Current count: {count}</p>
//       <p>Previous count: {prevCount ?? 'None'}</p>
//       <p>Direction: {direction}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <button onClick={() => setCount(count - 1)}>Decrement</button>
//     </div>
//   );
// }
//
// Example 2: Comparing prop changes
//
// function DataDisplay({ data }) {
//   const prevData = usePrevious(data);
//
//   useEffect(() => {
//     if (prevData && data.id !== prevData.id) {
//       // The data entity has changed, not just its properties
//       refetchRelatedData(data.id);
//     }
//   }, [data, prevData]);
//
//   return <div>{/* display data */}</div>;
// }
//
// Example 3: Animation based on value changes
//
// function AnimatedValue({ value }) {
//   const prevValue = usePrevious(value);
//   const [animationClass, setAnimationClass] = useState('');
//
//   useEffect(() => {
//     if (prevValue !== undefined && value > prevValue) {
//       setAnimationClass('increase-animation');
//     } else if (prevValue !== undefined && value < prevValue) {
//       setAnimationClass('decrease-animation');
//     }
//
//     const timer = setTimeout(() => setAnimationClass(''), 300);
//     return () => clearTimeout(timer);
//   }, [value, prevValue]);
//
//   return <div className={animationClass}>{value}</div>;
// }
