import { combineReducers } from 'redux'

const initialState =  {
	isFetchingTimeslots: false,
	isFetchingVariants: false,
	selectedDate: null,
	selectedTimeslot: null,
	selectedVariants: [],
	quantityByVariantId: {},
	customerData: {},
	formErrors: {},
	availableDates: [],
	variants: []
}

const selectedDate = (state=initialState.selectedDate, action) => {
	switch (action.type) {
		case 'SELECT_DATE':
			return action.date
		default:
			return state
	}
}

const selectedTimeslot = (state=initialState.selectedTimeslot, action) => {
	switch (action.type) {
		case 'SELECT_TIMESLOT':
			return action.timeslot_id
		default:
			return state
	}
}

const selectedVariants = (state=initialState.selectedVariants, action) => {
	switch (action.type) {
		case 'ADD_VARIANT':
			return [111]
		default:
			return state
	}
}

const quantityByVariantId = (state=initialState.quantityByVariantId, action) => {
	return state
}

const availableDates = (state=initialState.availableDates, action) => {
	console.log(action)
	switch (action.type) {
		case 'RECEIVE_PRODUCTS':
			return action.details.available_dates
		default:
			return state
	}
}

const getVariants = (state=[], action) => {
	switch (action.type) {
		case 'RECEIVE_PRODUCTS':
		console.log(action.details.variants)
			return action.details.variants
		default:
			return state
	}
}

// const checkoutApp = combineReducers({
// 	availableDates,
//   selectedDate,
//   selectedTimeslot,
//   selectedVariants,
//   quantityByVariantId,
//   timeslots
// })

function checkoutApp(state = {}, action) {
	return {
		availableDates: availableDates(state.availableDates, action),
		selectedDate: selectedDate(state.selectedDate, action),
		selectedTimeslot: selectedTimeslot(state.selectedTimeslot, action),
		selectedVariants: selectedVariants(state.selectedVariants, action),
		quantityByVariantId: quantityByVariantId(state.quantityByVariantId, action),
		variants: getVariants(state.variants, action)
	}
}

export default checkoutApp