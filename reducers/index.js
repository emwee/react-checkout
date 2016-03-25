import { combineReducers } from 'redux'
import { default as order } from './order'
import { default as variants } from './variants'
import { default as timeslots, getTimeslotById } from './timeslots'
import * as types from '../constants/action_types'

const initialState =  {
	availableDates: [],
	hasTimeslots: false,
	maxBookable: null
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

const maxBookable = (state=initialState.maxBookable, action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.max_bookable
		case types.SET_MAX_BOOKABLE:
			return action.maxBookable
		default:
			return state
	}
}

export default combineReducers({
	availableDates,
	hasTimeslots,
	maxBookable,
	timeslots,
	variants,
	order
})

export function getMaxBookable(state) {
	const { selectedTimeslotId } = state.order
	if (selectedTimeslotId) {
		const timeslot = getTimeslotById(state.timeslots, selectedTimeslotId)
		return timeslot.max_bookable
	}
	return state.maxBookable
}