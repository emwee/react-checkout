import * as types from '../constants/action_types'

const initialState =  {
	selectedDate: null,
	selectedTimeslotId: null,
	addedVariantIds: [],
	quantityByVariantId: {}
}

const selectedDate = (state=initialState.selectedDate, action) => {
	switch (action.type) {
		case types.SELECT_DATE:
			return action.date
		default:
			return state
	}
}

const selectedTimeslotId = (state=initialState.selectedTimeslotId, action) => {
	switch (action.type) {
		case types.SELECT_TIMESLOT:
			return action.timeslotId
		default:
			return state
	}
}

const addedVariantIds = (state=initialState.addedVariantIds, action) => {
	console.log('--addedVariantIds');
	switch (action.type) {
		case 'ADD_VARIANT':
			if (state.indexOf(action.variantId) !== -1) {
				return state
			}
			return [ ...state, action.variantId ]
		default:
			return state
	}
}

const quantityByVariantId = (state=initialState.quantityByVariantId, action) => {
	switch (action.type) {
		case 'ADD_VARIANT':
			const { variantId, quantity } = action
			return {
				...state,
				[variantId]: quantity
			}
		default:
			return state
	}
}

export default function order(state = initialState, action) {
  switch (action.type) {
  	default:
  		return {
  			selectedDate: selectedDate(state.selectedDate, action),
				selectedTimeslotId: selectedTimeslotId(state.selectedTimeslotId, action),
  			addedVariantIds: addedVariantIds(state.addedVariantIds, action),
  			quantityByVariantId: quantityByVariantId(state.quantityByVariantId, action)
  		}
  }
}

export function getSelectedTimeslot(state) {
	return state.timeslots.timeslotsById[state.order.selectedTimeslotId]
}

export function getAddedVariants(state) {
	console.log('--getAddedVariants', state);
	console.log(state)
	return state.order.addedVariantIds.map((variantId) => {
		return {
			...state.variants.variantsById[variantId],
			quantity: state.order.quantityByVariantId[variantId]
		}
	})
}

export function getTotalPrice(state) {
	const a = state.order.addedVariantIds.reduce((total, variantId) =>
		total + state.variants.variantsById[variantId].price * state.order.quantityByVariantId[variantId],
		0
	)

	console.log(a)
	return a
}