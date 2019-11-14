import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dateFilters: {
    start: null,
    end: null,
  },
  shouldOpenDialog: false,
  buttonText: 'Click Me!',
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    updateDate(state, action) {
      const { startDate, endDate } = action.payload
      state.dateFilters = {
        start: startDate,
        end: endDate,
      }
    },
    toggleDateDialog(state, action) {
      state.shouldOpenDialog = action.payload
    },
    setButtonText(state, action) {
      state.buttonText = action.payload
    },
  },
})

export const { updateDate, toggleDateDialog, setButtonText } = dateSlice.actions

export default dateSlice.reducer
