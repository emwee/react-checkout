import { combineReducers } from 'redux'
import * as types from '../constants/action_types'

const initialState = {
	variantIds: [],
	variantsById: {},
}

const variantsById = (state = initialState.variantsById, action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.variants.reduce((obj, variant) => {
				obj[variant.id] = variant
				return obj
			}, {})
		default:
			return state
	}
}

const variantIds = (state = [], action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.variants.map(variant => variant.id)
		default:
			return state
	}
}

export default combineReducers({
	variantsById,
	variantIds,
})

export function getVariant(state, variantId) {
	return state.variantsById[variantId]
}

export function getVariants(state) {
	return state.variantIds.map((variantId) =>
		getVariant(state, variantId)
	)
}

export function isVariantDisabled(state, variantId) {
	if (!state.selection.selectedDate) {
		return true
	}

	if (state.product.hasTimeslots && !state.selection.selectedTimeslotId) {
		return true
	}

	const variant = getVariant(state.entities.variants, variantId)

	if (!variant.valid_with) {
		return false
	}

	const validWithTotalQuantity = variant.valid_with.reduce((total, id) =>
		total + state.selection.quantityByVariantId[id], 0)

	if (state.selection.selectedVariantIds.length && validWithTotalQuantity > 0) {
		return false
	}

	return true
}
