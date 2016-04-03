import { combineReducers } from 'redux'
import { default as entities } from './entities'
import { default as selection } from './selection'
import { getTimeslotById } from './timeslots'
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
	maxBookable
})

export function getMaxBookable(state) {
	const { selectedTimeslotId } = state.selection
	if (selectedTimeslotId) {
		const timeslot = getTimeslotById(state.entities.timeslots, selectedTimeslotId)
		return timeslot.max_bookable
	}
	return state.maxBookable
}