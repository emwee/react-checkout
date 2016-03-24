import * as types from '../constants/action_types'

const initialState = {
	variantIds: [],
	variantsById: {}
}

const variantsById = (state=initialState.variantsById, action) => {
	console.log('--variantsById');
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

export default function variants(state = initialState, action) {
  switch (action.type) {
	default:
		return {
			variantsById: variantsById(state.variantsById, action),
			variantIds: variantIds(state.variantIds, action)
		}
  }
}

export function getVariants(state) {
	console.log('getVariants', state);
	return state.variantIds.map((variantId) => {
		return getVariant(state, variantId)
	})
}