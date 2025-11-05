/**
 * Redux Saga Store Exports
 *
 * This module demonstrates Redux Saga state management.
 * Redux Saga uses generator functions to handle complex async workflows and side effects.
 *
 * Note: Install redux-saga to use this module:
 * bun add redux-saga
 */

export { sagaStore } from './store'
export type { SagaRootState, SagaAppDispatch } from './store'
export * from './productSlice'
