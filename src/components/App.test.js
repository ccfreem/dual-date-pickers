import React from 'react'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen, cleanup } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { isSameDay, format, subDays } from 'date-fns'
import App from './App'
import store from '../store/store'
import { initialState } from '../ducks/dateSlice'

beforeEach(() => {
  render(<App />, { initialState, store })
})

describe('app functionality', () => {
  it('Renders the connected app with today as default', () => {
    const todayFormatted = format(new Date(), 'M/d/yy')
    const buttonDisplayingToday = screen.getByRole('button', {
      name: /today/i
    })
    const headingDisplayingToday = screen.getByRole('heading', {
      name: `The currently selected date is: ${todayFormatted}`
    })
    expect(buttonDisplayingToday).toBeInTheDocument()
    expect(headingDisplayingToday).toBeInTheDocument()
  })
  it('Opens and closes the dual dater picker', () => {
    // Open the date picker
    userEvent.click(
      screen.getByRole('button', {
        name: /open dual date picker/i
      })
    )

    // Check for the modal
    const headerForCustomDateRangeModal = screen.getByRole('heading', {
      name: /custom time range/i
    })
    expect(headerForCustomDateRangeModal).toBeInTheDocument()

    // Close the date picker
    userEvent.click(
      screen.getByRole('button', {
        name: /cancel/i
      })
    )
    // Check that the modal is gone
    expect(headerForCustomDateRangeModal).not.toBeInTheDocument()
  })
  it('Opens and updates the inputted dates', () => {
    const start = '01/02/03'
    const end = '02/03/04'
    // Open the date picker
    userEvent.click(
      screen.getByRole('button', {
        name: /open dual date picker/i
      })
    )

    // Enter the start date
    userEvent.type(screen.getByLabelText('Start Date'), start)

    // Enter the end date
    userEvent.type(screen.getByLabelText('End Date'), end)
    // update the date filter
    userEvent.click(
      screen.getByRole('button', {
        name: /update date filter/i
      })
    )
    const formattedStart = format(new Date(start), 'M/d/yy')
    const formattedEnd = format(new Date(end), 'M/d/yy')

    // Ensure the heading has updated
    const headingDisplayingToday = screen.getByRole('heading', {
      name: `The currently selected dates are: ${formattedStart} to ${formattedEnd}`
    })

    // Ensure the top right button displays "Custom" as the selection
    const dropdownText = screen.getByRole('button', {
      name: /custom/i
    })
    expect(headingDisplayingToday).toBeInTheDocument()
    expect(dropdownText).toBeInTheDocument()
  })
  it('Allows users to update date range using the dropdown', () => {
    // Open up the dropdown for date ranges
    userEvent.click(
      screen.getByRole('button', {
        name: /custom/i
      })
    )

    // Select today
    userEvent.click(
      screen.getByRole('option', {
        name: /today/i
      })
    )
    // Check for the appropriately displayed date

    const today = new Date()
    const todayFormatted = format(today, 'M/d/yy')

    const headingDisplayingToday = screen.getByRole('heading', {
      name: `The currently selected date is: ${todayFormatted}`
    })

    // Open up the dropdown again
    userEvent.click(
      screen.getByRole('button', {
        name: /today/i
      })
    )

    // Select yesterday
    userEvent.click(
      screen.getByRole('option', {
        name: /yesterday/i
      })
    )

    const yesterday = subDays(today, 1)
    const yesterdayFormatted = format(yesterday, 'M/d/yy')

    // Check for yesterday
    const headingDisplayingYesterday = screen.getByRole('heading', {
      name: `The currently selected date is: ${yesterdayFormatted}`
    })
  })
})
