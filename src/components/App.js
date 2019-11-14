import React from 'react'
import CustomDateDialog from './CustomDateDialog'
import { toggleDateDialog } from '../ducks/dateSlice'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
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
        <button
          onClick={() => {
            dispatch(toggleDateDialog(true))
          }}
        >
          This
        </button>
        <CustomDateDialog>Hi</CustomDateDialog>
      </header>
    </div>
  )
}

export default App
