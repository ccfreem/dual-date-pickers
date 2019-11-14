import { combineReducers } from '@reduxjs/toolkit'
import dateReducer from '../ducks/dateSlice'

const rootReducer = combineReducers({ dateReducer })

export default rootReducer
