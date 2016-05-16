import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { default as product } from './product'
import { default as variants } from './variants'
import { default as timeslots, getTimeslotById } from './timeslots'
import { default as selection } from './selection'

export default combineReducers({
	product,
	variants,
	timeslots,
	selection,
	form: formReducer,
})

export function getMaxBookable(state) {
	const { selectedTimeslotId } = state.selection
	if (selectedTimeslotId) {
		const timeslot = getTimeslotById(state.timeslots, selectedTimeslotId)
		return timeslot.max_bookable
	}
	return state.product.maxBookable
}
