import { combineReducers } from 'redux'
import { default as order } from './order'
import { default as variants } from './variants'
import { default as timeslots } from './timeslots'
import * as types from '../constants/action_types'

const initialState =  {
	availableDates: [],
	hasTimeslots: false
}

const availableDates = (state=initialState.availableDates, action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.available_dates
		default:
			return state
	}
}

const hasTimeslots = (state=initialState.hasTimeslots, action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.has_timeslots
		default:
			return state
	}
}

export default combineReducers({
	availableDates,
	hasTimeslots,
	timeslots,
	variants,
	order
})