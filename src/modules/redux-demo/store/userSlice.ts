import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'

// Mock API function to fetch user
const mockUserAPI = {
  fetchUser: async (): Promise<{ name: string; email: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Mock data
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
    }
  },
}

interface UserState {
  userName?: string
  email?: string
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  isLoading: false,
  error: null,
}

// Async thunk to fetch user
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await mockUserAPI.fetchUser()
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ name: string; email?: string }>) => {
      state.userName = action.payload.name
      state.email = action.payload.email
    },
    remove: (state) => {
      state.userName = undefined
      state.email = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.userName = action.payload.name
        state.email = action.payload.email
        state.error = null
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch user'
      })
  },
})

export const { add, remove } = userSlice.actions
export default userSlice.reducer
