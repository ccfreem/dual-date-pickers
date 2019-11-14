import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dateFilters: {
    start: null,
    end: null,
  },
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    updateDate(state, action) {
      const { dateFilters } = action.payload
      state.push({ dateFilters })
    },
  },
})

export const { updateDate } = dateSlice.actions

export default dateSlice.reducer
