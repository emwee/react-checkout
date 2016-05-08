import { combineReducers } from 'redux'
import * as types from '../constants/action_types'

const initialState = {
	isFetching: false,
	didInvalidate: false,
	variantIds: [],
	variantsById: {},
}


function isFetching(state = initialState.isFetching, action) {
	switch (action.type) {
		case types.REQUEST_VARIANTS:
			return true
		case types.RECEIVE_VARIANTS_SUCCESS:
		case types.RECEIVE_VARIANTS_FAILURE:
		case types.SELECT_DATE:
			return false
		default:
			return state
	}
}

function didInvalidate(state = initialState.didInvalidate, action) {
	switch (action.type) {
		case types.REQUEST_VARIANTS:
		case types.SELECT_DATE:
			return false
		case types.RECEIVE_VARIANTS_FAILURE:
			return true
		default:
			return state
	}
}

const variantIds = (state = [], action) => {
	switch (action.type) {
		case types.RECEIVE_VARIANTS_SUCCESS:
			return action.variants.map(variant => variant.id)
		case types.RECEIVE_VARIANTS_FAILURE:
		case types.SELECT_DATE:
			return []
		default:
			return state
	}
}

const variantsById = (state = initialState.variantsById, action) => {
	switch (action.type) {
		case types.RECEIVE_VARIANTS_SUCCESS:
			return action.variants.reduce((obj, variant) => {
				const variantObj = obj
				variantObj[variant.id] = variant
				return variantObj
			}, {})
		case types.RECEIVE_VARIANTS_FAILURE:
		case types.SELECT_DATE:
			return {}
		default:
			return state
	}
}

export default combineReducers({
	didInvalidate,
	isFetching,
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

	const variant = getVariant(state.variants, variantId)

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
