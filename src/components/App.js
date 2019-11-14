import React from 'react'
import CustomDateDialog from './CustomDateDialog'
import Button from '@material-ui/core/Button'
import { toggleDateDialog } from '../ducks/dateSlice'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  && {
    color: black;
  }
`

function App() {
  const dispatch = useDispatch()
  const buttonText = useSelector(state => state.dateReducer.buttonText)
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        ></a>
        <StyledButton
          onClick={() => {
            dispatch(toggleDateDialog(true))
          }}
        >
          {buttonText}
        </StyledButton>
        <CustomDateDialog>Hi</CustomDateDialog>
      </header>
    </div>
  )
}

export default App
