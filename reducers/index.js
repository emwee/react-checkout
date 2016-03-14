import { combineReducers } from 'redux'
import { default as order } from './order'
import { default as variants } from './variants'
import { default as timeslots } from './timeslots'
import * as types from '../constants/action_types'

const initialState =  {
	// isFetchingTimeslots: false,
	// isFetchingVariants: false,
	// customerData: {},
	// formErrors: {},
	selectedDate: null,
	selectedTimeslot: null,
	availableDates: []
}

const selectedDate = (state=initialState.selectedDate, action) => {
	switch (action.type) {
		case types.SELECT_DATE:
			return action.date
		default:
			return state
	}
}

const selectedTimeslot = (state=initialState.selectedTimeslot, action) => {
	switch (action.type) {
		case types.SELECT_TIMESLOT:
			return action.timeslot_id
		default:
			return state
	}
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
	selectedDate,
	selectedTimeslot,
	timeslots,
	variants,
	order
})