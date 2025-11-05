import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice'
import practiceReducer from './practiceSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    practice: practiceReducer,
  },
})

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// store.dispatch
// store.getState

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
