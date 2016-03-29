import { combineReducers } from 'redux'
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

function variantIds(state = [], action) {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.variants.map(variant => variant.id)
		default:
			return state
	}
}

function getVariant(state, variantId) {
	return state.variantsById[variantId]
}

export default combineReducers({
	variantsById,
	variantIds
})

export function getVariants(state) {
	return state.variantIds.map((variantId) => {
		return getVariant(state, variantId)
	})
}