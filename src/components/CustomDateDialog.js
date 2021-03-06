import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isValid } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { updateDateWithRange, toggleDateDialog } from '../ducks/dateSlice'

const PickerContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Picker = styled(KeyboardDatePicker)`
  && {
    margin-left: 15px;
  }
`

function CustomDateDialog() {
  const dispatch = useDispatch()
  const shouldOpenDialog = useSelector(
    state => state.dateReducer.shouldOpenDialog
  )
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleClose = () => {
    dispatch(toggleDateDialog(false))
  }

  const handleUpdate = () => {
    if (isValid(startDate) && isValid(endDate)) {
      dispatch(toggleDateDialog(false))
      dispatch(updateDateWithRange({ startDate, endDate }))
    }
  }

  return (
    <Dialog open={shouldOpenDialog} onClose={handleClose}>
      <DialogTitle>Custom Time Range</DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <PickerContainer>
            <Picker
              autoOk
              variant='inline'
              inputVariant='outlined'
              label='Start Date'
              format='MM/dd/yy'
              value={startDate}
              inputProps={{
                'aria-label': 'Start Date'
              }}
              invalidDateMessage='Try mm/dd/yy'
              maxDate={endDate ? endDate : new Date(`2100-01-01`)}
              onChange={date => setStartDate(date)}
            />
            <Picker
              disableFuture
              autoOk
              variant='inline'
              inputVariant='outlined'
              label='End Date'
              format='MM/dd/yy'
              value={endDate}
              inputProps={{
                'aria-label': 'End Date'
              }}
              invalidDateMessage='Try mm/dd/yy'
              minDate={startDate ? startDate : false}
              onChange={date => setEndDate(date)}
            />
          </PickerContainer>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleUpdate} color='primary'>
          Update Date Filter
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDateDialog
