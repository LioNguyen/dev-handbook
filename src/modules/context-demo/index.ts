/**
 * Context API State Management Demo Module
 *
 * This module demonstrates React Context API for built-in state management.
 *
 * @example
 * ```tsx
 * import { CounterProvider, TodoProvider } from '@/modules/context-demo'
 * import { useCounter, useTodo } from '@/modules/context-demo/hooks'
 *
 * // Wrap your app
 * <CounterProvider>
 *   <TodoProvider>
 *     <App />
 *   </TodoProvider>
 * </CounterProvider>
 *
 * // In component
 * function MyComponent() {
 *   const { state, increment } = useCounter()
 *   const { todos, addTodo } = useTodo()
 * }
 * ```
 */

export * from './store'
export * from './hooks'
export * from './components'
