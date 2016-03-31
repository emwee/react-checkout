import { combineReducers } from 'redux'
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

export default combineReducers({
	selectedDate,
	selectedTimeslotId,
	selectedVariantIds,
	quantityByVariantId
})

export function getSelectedTimeslot(state) {
	return state.timeslots.timeslotsById[state.selection.selectedTimeslotId]
}

export function getSelectedVariants(state) {
	return state.selection.selectedVariantIds.map((variantId) => {
		return {
			...state.variants.variantsById[variantId],
			quantity: state.selection.quantityByVariantId[variantId]
		}
	})
}

export function getTotalQuantity(state) {
	return state.selectedVariantIds.reduce((total, variantId) =>
		total + state.quantityByVariantId[variantId],
		0
	)
}

export function getTotalPrice(state) {
	return state.selection.selectedVariantIds.reduce((total, variantId) =>
		total + state.variants.variantsById[variantId].price * state.selection.quantityByVariantId[variantId],
		0
	)
}