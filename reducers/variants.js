const initialState =  {
	variantIds: [],
	variantById: {}
}

const variantById = (state=initialState.variantById, action) => {
	console.log('--variantById');
	switch (action.type) {
		case 'RECEIVE_CHECKOUT_DETAILS':
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
		case 'RECEIVE_CHECKOUT_DETAILS':
			return action.variants.map(variant => variant.id)
		default:
			return state
	}
}

function getVariant(state, variantId) {
	return state.variantById[variantId]
}

export default function variants(state = initialState, action) {
  switch (action.type) {
  	default:
  		return {
  			variantById: variantById(state.variantById, action),
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