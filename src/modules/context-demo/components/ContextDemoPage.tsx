/**
 * Context API Demo Page with Provider
 * This wraps the TodoDemo with its TodoProvider
 */

import { TodoProvider } from '../store/TodoContext'
import { TodoDemo } from './TodoDemo'

export function ContextDemoPage() {
  return (
    <TodoProvider>
      <TodoDemo />
    </TodoProvider>
  )
}
