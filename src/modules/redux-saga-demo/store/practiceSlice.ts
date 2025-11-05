import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
}

interface PracticeSliceValue {
  users: User[]
}

const initialState: PracticeSliceValue = {
  users: [],
}

export const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<User>) => {
      return {
        users: [...state.users, action.payload],
      }
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      const filteredUsers = state.users.filter(
        (user) => user.id !== action.payload.id
      )

      return {
        users: filteredUsers,
      }
    },
  },
})

export const { add, remove } = practiceSlice.actions
export const practiceReducer = practiceSlice.reducer
