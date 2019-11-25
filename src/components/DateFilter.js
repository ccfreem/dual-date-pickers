import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import CustomDateDialog from './CustomDateDialog'
import { toggleDateDialog, updateDateWithFilters } from '../ducks/dateSlice'

const Dropdown = styled(Select)`
  margin-left: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.42) !important;
`
const CustomMenuItem = styled(MenuItem)`
  && {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }
`

function DateFilter() {
  const dispatch = useDispatch()
  const buttonText = useSelector(state => state.dateReducer.buttonText)
  const shouldOpenDialog = useSelector(
    state => state.dateReducer.shouldOpenDialog
  )
  const handleChange = selectedRange => {
    if (selectedRange.toLowerCase() !== 'custom') {
      dispatch(updateDateWithFilters(selectedRange))
    } else {
      dispatch(toggleDateDialog(true))
    }
  }
  return (
    <>
      <Dropdown
        value={buttonText}
        onChange={e => handleChange(e.target.value)}
        name='filter'
      >
        <MenuItem value={'Today'}>Today</MenuItem>
        <MenuItem value={'Yesterday'}>Yesterday</MenuItem>
        <MenuItem value={'Last 7 days'}>Last 7 days</MenuItem>
        <MenuItem value={'Last 30 days'}>Last 30 days</MenuItem>
        <MenuItem value={'Last 60 days'}>Last 60 days</MenuItem>
        <MenuItem value={'Last 90 days'}>Last 90 days</MenuItem>
        <MenuItem value={'Last quarter'}>Last quarter</MenuItem>
        <MenuItem value={'Last 12 months'}>Last 12 months</MenuItem>
        <CustomMenuItem value={'Custom'}>Custom</CustomMenuItem>
      </Dropdown>
      {shouldOpenDialog && <CustomDateDialog />}
    </>
  )
}

export default DateFilter
