import { combineReducers } from 'redux'
import * as types from '../constants/action_types'

const initialState = {
	id: null,
	availableDates: [],
	hasTimeslots: false,
	maxBookable: null,
	bookingFeeConfig: null,
}

const id = (state = initialState.id, action) => {
	switch (action.type) {
		case types.SET_PRODUCT:
			return action.id
		default:
			return state
	}
}

const availableDates = (state = initialState.availableDates, action) => {
	console.log('availableDates', action)
	switch (action.type) {
		case types.SET_PRODUCT:
			return action.available_dates
		default:
			return state
	}
}

const hasTimeslots = (state = initialState.hasTimeslots, action) => {
	switch (action.type) {
		case types.SET_PRODUCT:
			return action.has_timeslots
		default:
			return state
	}
}

const maxBookable = (state = initialState.maxBookable, action) => {
	switch (action.type) {
		case types.SET_PRODUCT:
			return action.max_bookable
		default:
			return state
	}
}

const bookingFeeConfig = (state = initialState.bookingFeeConfig, action) => {
	switch (action.type) {
		case types.SET_PRODUCT:
			return action.booking_fee_config
		default:
			return state
	}
}

export default combineReducers({
	id,
	availableDates,
	hasTimeslots,
	maxBookable,
	bookingFeeConfig,
})