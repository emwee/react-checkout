import { combineReducers } from 'redux'
import { default as order } from './order'
import { default as variants } from './variants'
import { default as timeslots } from './timeslots'
import * as types from '../constants/action_types'

const initialState =  {
	availableDates: []
}

const availableDates = (state=initialState.availableDates, action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.available_dates
		default:
			return state
	}
}

export default combineReducers({
	availableDates,
	timeslots,
	variants,
	order
})