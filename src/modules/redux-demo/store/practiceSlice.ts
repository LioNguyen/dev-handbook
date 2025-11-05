import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    increase: (state) => ({ ...state, value: state.value + 1 }),
    decrease: (state) => ({ ...state, value: state.value - 1 }),
  },
})

export const { decrease, increase } = practiceSlice.actions
export default practiceSlice.reducer
