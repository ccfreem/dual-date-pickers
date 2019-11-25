import React from 'react'
import DateFilter from './DateFilter'
import styled from 'styled-components'
import clouds from '../images/clouds.jpg'

const OuterContainer = styled.div`
  background-image: url(${clouds});
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  height: 100vh;
`

function App() {
  return (
    <OuterContainer>
      <InnerContainer>
        <DateFilter />
      </InnerContainer>
    </OuterContainer>
  )
}

export default App
