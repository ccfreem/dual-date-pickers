import React from 'react'
import { useSelector } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import styled from 'styled-components'
import DateFilter from './DateFilter'

const DateDisplay = styled.div`
  margin: auto;
  text-align: center;
`

function App() {
  const dateRange = useSelector(state => state.dateReducer.dateRange)
  const { start, end } = dateRange

  return (
    <>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <DateFilter />
        </Toolbar>
      </AppBar>
      <DateDisplay>{`${start} - ${end}`}</DateDisplay>
    </>
  )
}

export default App
