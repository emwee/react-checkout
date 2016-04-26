import { combineReducers } from 'redux'
import * as types from '../constants/action_types'

const initialState = {
	availableDates: [],
	hasTimeslots: false,
	maxBookable: null,
	bookingFeeConfig: null,
}

const availableDates = (state = initialState.availableDates, action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.available_dates
		default:
			return state
	}
}

const hasTimeslots = (state = initialState.hasTimeslots, action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.has_timeslots
		default:
			return state
	}
}

const maxBookable = (state = initialState.maxBookable, action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.max_bookable
		case types.SET_MAX_BOOKABLE:
			return action.maxBookable
		default:
			return state
	}
}

const bookingFeeConfig = (state = initialState.bookingFeeConfig, action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.booking_fee_config
		default:
			return state
	}
}

export default combineReducers({
	availableDates,
	hasTimeslots,
	maxBookable,
	bookingFeeConfig,
})