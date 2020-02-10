import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { format } from 'date-fns'
import DateFilter from './DateFilter'
import clouds from '../images/clouds.jpg'

const OuterContainer = styled.div`
  background-image: url(${clouds});
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`
const DateDisplay = styled.div`
  margin: auto;
  text-align: center;
  color: white;
  padding-top: 100px;
  margin-bottom: 100px;
`

function App() {
  const dateRange = useSelector(state => state.dateReducer.dateRange)
  const { start, end } = dateRange
  const formattedStart = format(start, 'M/d/yy')
  const formattedEnd = format(end, 'M/d/yy')

  return (
    <OuterContainer>
      <DateDisplay>{`${formattedStart} - ${formattedEnd}`}</DateDisplay>
      <InnerContainer>
        <DateFilter />
      </InnerContainer>
    </OuterContainer>
  )
}

export default App
