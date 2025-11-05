/**
 * Redux Saga Store Configuration
 *
 * This demonstrates Redux Toolkit with Redux Saga middleware.
 * Redux Saga handles side effects using generator functions.
 */

import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import productReducer from './productSlice'
import { rootSaga } from '../sagas'

// Create saga middleware
const sagaMiddleware = createSagaMiddleware()

export const sagaStore = configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk since we're using sagas
      serializableCheck: false, // Disable for saga actions
    }).concat(sagaMiddleware),
})

// Run the root saga
sagaMiddleware.run(rootSaga)

export type SagaRootState = ReturnType<typeof sagaStore.getState>
export type SagaAppDispatch = typeof sagaStore.dispatch
