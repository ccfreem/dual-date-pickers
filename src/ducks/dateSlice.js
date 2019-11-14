import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dateFilters: {
    start: null,
    end: null,
  },
  shouldOpenDialog: false,
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    updateDate(state, action) {
      const { dateFilters } = action.payload
      state.push({ dateFilters })
    },
    toggleDateDialog(state, action) {
      state.shouldOpenDialog = action.payload
    },
  },
})

export const { updateDate, toggleDateDialog } = dateSlice.actions

export default dateSlice.reducer
