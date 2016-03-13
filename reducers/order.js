const initialState =  {
	addedVariantIds: [],
	quantityByVariantId: {}
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

export function getAddedVariants(state) {
	return state.order.addedVariantIds.map((variantId) => {
		return {
			...state.variants.variantById[variantId],
			quantity: state.order.quantityByVariantId[variantId]
		}
	})
}

export function getTotalPrice(state) {
	return state.order.addedVariantIds.reduce((total, variantId) =>
		total + state.variants.variantById[variantId].price * state.order.quantityByVariantId[variantId],
		0
	)
}

export default function order(state = initialState, action) {
  switch (action.type) {
  	default:
  		return {
  			addedVariantIds: addedVariantIds(state.addedVariantIds, action),
  			quantityByVariantId: quantityByVariantId(state.quantityByVariantId, action)
  		}
  }
}