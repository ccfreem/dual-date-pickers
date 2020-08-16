import { createSlice } from '@reduxjs/toolkit'
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  subMonths,
  startOfQuarter,
  isSameDay,
  format
} from 'date-fns'

// Get the start and end of the current day
const getSameDayDate = date => {
  const startOfToday = startOfDay(date)
  const endOfToday = endOfDay(date)
  return { start: startOfToday, end: endOfToday }
}

// Get the first and last days of the last quarter
const getLastQuarter = today => {
  const startOfCurrentQuarter = startOfQuarter(today)
  const lastDayOfLastQuarter = subDays(startOfCurrentQuarter, 1)
  const firstDayOfLastQuarter = startOfQuarter(lastDayOfLastQuarter)
  return {
    start: startOfDay(firstDayOfLastQuarter),
    end: endOfDay(lastDayOfLastQuarter)
  }
}

// Update the date filters with the range selected from the date picker
const updateFiltersWithRange = ({ startDate, endDate }) => {
  // Check to see if the user has selected the same day
  let selectedDateFilters
  if (isSameDay(startDate, endDate)) {
    // The user has selected the same day, get the date range
    // based on the startDate selected
    selectedDateFilters = getSameDayDate(startDate)
  } else {
    // Set the new date filters base on start and end of days
    selectedDateFilters = {
      start: startOfDay(startDate),
      end: endOfDay(endDate)
    }
  }
  return formatDates(selectedDateFilters)
}

// Get the date filters based on the dropdown selections
const getDateFilters = newFilter => {
  let dateRange = {}
  const today = new Date()

  switch (newFilter) {
    case 'Yesterday':
      dateRange = getSameDayDate(subDays(today, 1))
      break
    case 'Last 7 days':
      dateRange = {
        start: startOfDay(subDays(today, 7)),
        end: endOfDay(addDays(today, 1))
      }
      break
    case 'Last 30 days':
      dateRange = {
        start: startOfDay(subDays(today, 30)),
        end: endOfDay(addDays(today, 1))
      }
      break
    case 'Last 60 days':
      dateRange = {
        start: startOfDay(subDays(today, 60)),
        end: endOfDay(addDays(today, 1))
      }
      break
    case 'Last 90 days':
      dateRange = {
        start: startOfDay(subDays(today, 90)),
        end: endOfDay(addDays(today, 1))
      }
      break
    case 'Last quarter':
      dateRange = getLastQuarter(today)
      break
    case 'Last 12 months':
      dateRange = {
        start: startOfDay(subMonths(today, 12)),
        end: endOfDay(today)
      }
      break

    case 'Today':
    default:
      dateRange = getSameDayDate(today)
  }

  return formatDates(dateRange)
}

const formatDates = dateRange => {
  const { start, end } = dateRange
  const formattedStart = format(start, 'M/d/yy')
  const formattedEnd = format(end, 'M/d/yy')
  return {
    start: formattedStart,
    end: formattedEnd
  }
}

export const initialState = {
  dateRange: formatDates(getSameDayDate(new Date())),
  shouldOpenDialog: false,
  buttonText: 'Today'
}

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    updateDateWithRange(state, action) {
      const updatedRange = updateFiltersWithRange(action.payload)
      state.dateRange = updatedRange
      state.buttonText = 'Custom'
    },
    updateDateWithFilters(state, action) {
      state.dateRange = getDateFilters(action.payload)
      state.buttonText = action.payload
    },
    toggleDateDialog(state, action) {
      state.shouldOpenDialog = action.payload
    }
  }
})

export const {
  updateDateWithRange,
  toggleDateDialog,
  updateDateWithFilters
} = dateSlice.actions

export default dateSlice.reducer
