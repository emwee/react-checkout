import * as types from '../constants/action_types'

const initialState =  {
	selectedDate: null,
	selectedTimeslotId: null,
	selectedVariantIds: [],
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
		case types.RECEIVE_TIMESLOTS_SUCCESS:
		case types.RECEIVE_TIMESLOTS_FAILURE:
			return null
		default:
			return state
	}
}

const selectedVariantIds = (state=initialState.selectedVariantIds, action) => {
	switch (action.type) {
		case types.SELECT_VARIANT:
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
		case types.SELECT_VARIANT:
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
	return {
		selectedDate: selectedDate(state.selectedDate, action),
		selectedTimeslotId: selectedTimeslotId(state.selectedTimeslotId, action),
		selectedVariantIds: selectedVariantIds(state.selectedVariantIds, action),
		quantityByVariantId: quantityByVariantId(state.quantityByVariantId, action)
	}
}

export function getSelectedTimeslot(state) {
	return state.timeslots.timeslotsById[state.order.selectedTimeslotId]
}

export function getSelectedVariants(state) {
	return state.order.selectedVariantIds.map((variantId) => {
		return {
			...state.variants.variantsById[variantId],
			quantity: state.order.quantityByVariantId[variantId]
		}
	})
}

export function getTotalQuantity(state) {
	return state.order.selectedVariantIds.reduce((total, variantId) =>
		total + state.order.quantityByVariantId[variantId],
		0
	)
}

export function getTotalPrice(state) {
	return state.order.selectedVariantIds.reduce((total, variantId) =>
		total + state.variants.variantsById[variantId].price * state.order.quantityByVariantId[variantId],
		0
	)
}