/**
 * Todo Context - Example of Context API State Management
 *
 * This demonstrates React Context API for managing a todo list.
 * Shows how to handle complex state with Context API and useReducer.
 */

import { createContext, useReducer, type ReactNode } from 'react'

// Define types
export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  isLoading: boolean
  error: string | null
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

interface TodoContextValue {
  state: TodoState
  dispatch: React.Dispatch<TodoAction>
  // Convenience methods
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  clearCompleted: () => void
  setFilter: (filter: 'all' | 'active' | 'completed') => void
  fetchTodos: () => Promise<void>
}

// Mock API function to fetch todos
const mockTodoAPI = {
  fetchTodos: async (): Promise<Todo[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock data
    return [
      {
        id: '1',
        text: 'Learn Context API',
        completed: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        text: 'Build a todo app',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        text: 'Master state management',
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]
  },
}

// Initial state
const initialState: TodoState = {
  todos: [],
  filter: 'all',
  isLoading: false,
  error: null,
}

// Reducer
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            text: action.payload,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ],
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      }
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

// Create context
export const TodoContext = createContext<TodoContextValue | undefined>(
  undefined
)

// Provider component
export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = (text: string) =>
    dispatch({ type: 'ADD_TODO', payload: text })
  const toggleTodo = (id: string) =>
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  const deleteTodo = (id: string) =>
    dispatch({ type: 'DELETE_TODO', payload: id })
  const editTodo = (id: string, text: string) =>
    dispatch({ type: 'EDIT_TODO', payload: { id, text } })
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' })
  const setFilter = (filter: 'all' | 'active' | 'completed') =>
    dispatch({ type: 'SET_FILTER', payload: filter })

  const fetchTodos = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      const todos = await mockTodoAPI.fetchTodos()

      dispatch({ type: 'SET_TODOS', payload: todos })
      dispatch({ type: 'SET_LOADING', payload: false })
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload:
          error instanceof Error ? error.message : 'Failed to fetch todos',
      })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const value: TodoContextValue = {
    state,
    dispatch,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
    fetchTodos,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
