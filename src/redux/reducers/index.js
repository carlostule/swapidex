import { combineReducers } from '@reduxjs/toolkit'

import dataReducer from './data-reducer'

export default combineReducers({
  swData: dataReducer,
})
