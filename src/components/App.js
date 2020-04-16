import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import DateFilter from './DateFilter'

const InnerContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin: 50px auto;
  height: 300px;
  max-width: 500px;
`

const DateContainer = styled.div`
  font-size: 40px;
  padding: 95px 0px;
  text-align: center;
`

const Header = styled(AppBar)`
  && {
    background: white;
  }
`

const StyledToolBar = styled(Toolbar)`
  display: flex;
  color: black;
  justify-content: space-between;
`

function App() {
  const dateRange = useSelector(state => state.dateReducer.dateRange)
  const { start, end } = dateRange
  const sameDay = start === end
  const rangeText = sameDay ? start : `${start} to ${end}`
  return (
    <>
      <Header position='static'>
        <StyledToolBar>
          <Typography variant='h5'>Dual Date Picker</Typography>
          <DateFilter />
        </StyledToolBar>
      </Header>
      <InnerContainer elevation='11'>
        <Typography variant='h6'>Date{sameDay ? '' : 's'}</Typography>
        <DateContainer>{rangeText}</DateContainer>
      </InnerContainer>
    </>
  )
}

export default App
