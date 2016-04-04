import { combineReducers } from 'redux'
import { quantityByVariantId } from './selection'
import * as types from '../constants/action_types'

const initialState = {
	variantIds: [],
	variantsById: {}
}

const variantsById = (state=initialState.variantsById, action) => {
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
	variantIds
})

export function getVariant(state, variantId) {
	return state.variantsById[variantId]
}

export function getVariants(state) {
	return state.variantIds.map((variantId) => {
		return getVariant(state, variantId)
	})
}

export function isVariantDisabled(state, variantId) {
	const {
		product: {
			hasTimeslots
		},
		selection: {
			selectedDate,
			selectedTimeslotId,
			selectedVariantIds
		}
	} = state

	if (!hasTimeslots) {
		return !selectedDate
	}

	if (!selectedDate) {
		return true
	}

	if (!selectedTimeslotId) {
		return true
	}

	const variant = getVariant(state.entities.variants, variantId)
	const { valid_with: dependencies } = variant

	if (!dependencies) {
		return false
	}

	if (!selectedVariantIds.length) {
		return true
	}

	const dependenciesTotalQuantity = dependencies.reduce((total, variantId) => {
			return total + state.selection.quantityByVariantId[variantId]
		}, 0
	)

	if (dependenciesTotalQuantity > 0) {
		return false
	}

	return true
}