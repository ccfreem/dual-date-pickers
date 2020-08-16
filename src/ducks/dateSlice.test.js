import date, {
  updateDateWithRange,
  updateDateWithFilters,
  initialState
} from '../ducks/dateSlice'
import { isSameDay, format } from 'date-fns'

describe('date reducer', () => {
  it('should have initial state', () => {
    expect(date(undefined, {})).toEqual(initialState)
  })
  it('should initialize with today', () => {
    const { start, end } = date(undefined, {}).dateRange
    expect(isSameDay(new Date(start), new Date(end))).toBeTruthy()
  })
  it('should update and format dates correctly', () => {
    const startSelection = new Date()
    const endSelection = new Date()
    const { start, end } = date(initialState, {
      type: updateDateWithRange.type,
      payload: {
        startDate: startSelection,
        endDate: endSelection
      }
    }).dateRange
    const formattedStart = format(startSelection, 'M/d/yy')
    const formattedEnd = format(endSelection, 'M/d/yy')
    expect(start === formattedStart && end === formattedEnd).toBeTruthy()
  })
  it('should display custom text when provided custom range', () => {
    const startSelection = new Date()
    const endSelection = new Date()
    const { buttonText } = date(initialState, {
      type: updateDateWithRange.type,
      payload: {
        startDate: startSelection,
        endDate: endSelection
      }
    })
    expect(buttonText).toBe('Custom')
  })
  it('should update date with range', () => {
    const ranges = [
      'Today',
      'Last 7 days',
      'Last 30 days',
      'Last 60 days',
      'Last 90 days',
      'Last quarter',
      'Last 12 months'
    ]
    const rangesInState = ranges.map(
      range =>
        date(initialState, {
          type: updateDateWithFilters.type,
          payload: range
        }).buttonText
    )
    expect(ranges).toEqual(rangesInState)
  })
  it('should default to today with improper range', () => {
    const incorrectRange = 'The Last Jedi'
    const { start, end } = date(initialState, {
      type: updateDateWithFilters.type,
      payload: incorrectRange
    }).dateRange
    expect(isSameDay(new Date(start), new Date(end))).toBeTruthy()
  })
})
