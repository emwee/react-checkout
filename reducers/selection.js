import { combineReducers } from 'redux'
import { getVariant, isVariantDisabled } from './variants'
import * as types from '../constants/action_types'
import { merge } from 'lodash'

const initialState = {
	selectedDate: null,
	selectedTimeslotId: null,
	selectedVariantIds: [],
	quantityByVariantId: {},
}

const selectedDate = (state = initialState.selectedDate, action) => {
	switch (action.type) {
		case types.SELECT_DATE:
			return action.date
		default:
			return state
	}
}

const selectedTimeslotId = (state = initialState.selectedTimeslotId, action) => {
	switch (action.type) {
		case types.PRESELECT_CHECKOUT_DETAILS:
			return action.selection.selectedTimeslotId
		case types.SELECT_TIMESLOT:
			return action.timeslotId
		case types.RECEIVE_TIMESLOTS_SUCCESS:
		case types.RECEIVE_TIMESLOTS_FAILURE:
			return null
		default:
			return state
	}
}

const selectedVariantIds = (state = initialState.selectedVariantIds, action) => {
	switch (action.type) {
		case types.PRESELECT_CHECKOUT_DETAILS:
			return action.selection.variantIds
		case types.SELECT_VARIANT:
			if (state.indexOf(action.variantId) !== -1) {
				return state
			}
			return [...state, action.variantId]
		case types.SELECT_DATE:
			return []
		default:
			return state
	}
}

const quantityByVariantId = (state = initialState.quantityByVariantId, action) => {
	switch (action.type) {
		case types.PRESELECT_CHECKOUT_DETAILS:
			return action.selection.quantityByVariantId
		case types.SELECT_VARIANT:
			return {
				...state,
				[action.variantId]: action.quantity,
			}
		case types.SELECT_DATE:
			return {}
		default:
			return state
	}
}

export default combineReducers({
	selectedDate,
	selectedTimeslotId,
	selectedVariantIds,
	quantityByVariantId,
})

function getEnabledVariants(state) {
	return state.selection.selectedVariantIds.filter((variantId) => {
		if (!isVariantDisabled(state, variantId)) {
			return variantId
		}
		return false
	})
}

export function getSelectedTimeslot(state) {
	return state.entities.timeslots.timeslotsById[state.selection.selectedTimeslotId]
}

export function getSelectedVariants(state) {
	return getEnabledVariants(state).map(variantId => {
		const variant = getVariant(state.entities.variants, variantId)
		return merge({}, variant, {
			quantity: state.selection.quantityByVariantId[variantId],
		})
	})
}

export function getSubtotalPrice(state) {
	return getEnabledVariants(state).reduce((total, variantId) =>
		total + getVariant(state.entities.variants, variantId).price *
			state.selection.quantityByVariantId[variantId], 0)
}

export function getBookingFee(state) {
	const bookingFeeConfig = state.product.bookingFeeConfig
	if (!bookingFeeConfig) {
		return 0
	}
	return ((getSubtotalPrice(state) * bookingFeeConfig.percentage) / 100) +
		bookingFeeConfig.addon_amount
}

export function getTotalPrice(state) {
	return getSubtotalPrice(state) + getBookingFee(state)
}

export function getTotalQuantity(state) {
	return getEnabledVariants(state).reduce((total, variantId) =>
		total + state.selection.quantityByVariantId[variantId],
		0
	)
}
