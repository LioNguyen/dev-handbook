/**
 * Redux Toolkit State Management Demo Module
 *
 * This module demonstrates Redux Toolkit for structured state management.
 *
 * @example
 * ```tsx
 * import { Provider } from 'react-redux'
 * import { store, add } from '@/modules/redux-demo'
 *
 * // In App.tsx
 * <Provider store={store}>
 *   <App />
 * </Provider>
 *
 * // In component
 * import { useAppDispatch } from '@/shared/hooks/useStore'
 * const dispatch = useAppDispatch()
 * dispatch(add({ name: 'John' }))
 * ```
 */

export * from './store'
export * from './components'
