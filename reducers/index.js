import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { default as product } from './product'
import { default as entities } from './entities'
import { default as selection, getTotalQuantity } from './selection'
import { getTimeslotById } from './timeslots'

export default combineReducers({
	product,
	entities,
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

export function getMaxBookable(state) {
	const { selectedTimeslotId } = state.selection
	if (selectedTimeslotId) {
		const timeslot = getTimeslotById(state.entities.timeslots, selectedTimeslotId)
		return timeslot.max_bookable
	}
	return state.maxBookable
}