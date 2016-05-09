import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { default as product } from './product'
import { default as variants } from './variants'
import { default as alertedField } from './alerted_field'
import { default as timeslots, getTimeslotById } from './timeslots'
import { default as selection, getTotalQuantity } from './selection'

export default combineReducers({
	alertedField,
	product,
	variants,
	timeslots,
	selection,
	form: formReducer,
})

export function bookingDetailsCompleted(state) {
	if (!state.selection.selectedDate) {
		return false
	}

	if (state.product.hasTimeslots && !state.selection.selectedTimeslotId) {
		return false
	}

	return getTotalQuantity(state) > 0
}

export function isStepUnlocked(state, stepIndex) {
	switch (stepIndex) {
		case 0:
			return true
		case 1:
			return bookingDetailsCompleted(state)
		default:
			return false
	}
}

export function getMaxBookable(state) {
	const { selectedTimeslotId } = state.selection
	if (selectedTimeslotId) {
		const timeslot = getTimeslotById(state.timeslots, selectedTimeslotId)
		return timeslot.max_bookable
	}
	return state.product.maxBookable
}
