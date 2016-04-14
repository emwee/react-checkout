import { combineReducers } from 'redux'
import { default as variants } from './variants'
import { default as timeslots } from './timeslots'

export default combineReducers({
	variants,
	timeslots,
})
