import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { practiceReducer } from './practiceSlice'
import { practiceSaga } from '../sagas/practiceSaga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    practice: practiceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware)
  },
})

sagaMiddleware.run(practiceSaga)
