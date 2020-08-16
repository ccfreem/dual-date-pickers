import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Moon from '../static/moon.jpg'
import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import DateFilter from './DateFilter'
import { toggleDateDialog } from '../ducks/dateSlice'

const OuterContainer = styled.div`
  background: #cfcfcf;
  height: 100vh;
`

const CardImage = styled(CardMedia)`
  height: 250px;
`

const InnerContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  max-width: 500px;
`

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: flex-end;
`

const Header = styled(AppBar)`
  && {
    background: #34515e;
  }
`

const StyledToolBar = styled(Toolbar)`
  display: flex;
  color: #fff;
  justify-content: space-between;
`

function App() {
  const dispatch = useDispatch()
  const dateRange = useSelector(state => state.dateReducer.dateRange)
  const { start, end } = dateRange
  const sameDay = start === end
  const rangeText = sameDay ? start : `${start} to ${end}`

  const handleClick = () => {
    dispatch(toggleDateDialog(true))
  }
  return (
    <OuterContainer>
      <Header position='static'>
        <StyledToolBar>
          <Typography variant='h5'>Dual Date Picker</Typography>
          <DateFilter />
        </StyledToolBar>
      </Header>
      <InnerContainer elevation={11}>
        <CardImage image={Moon} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            The currently selected date{sameDay ? ' is' : 's are'}: {rangeText}
          </Typography>
          <Typography variant='body1' color='textSecondary' component='p'>
            To change the date, either select from the top right, or cick the
            button below to open the dual date picker.
          </Typography>
          <ButtonContainer>
            <Button id='open-dialog-button' onClick={handleClick}>
              Open Dual Date Picker
            </Button>
          </ButtonContainer>
        </CardContent>
      </InnerContainer>
    </OuterContainer>
  )
}

export default App
