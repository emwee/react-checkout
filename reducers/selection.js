import { combineReducers } from 'redux'
import { getVariant, isVariantDisabled } from './variants'
import * as types from '../constants/action_types'

const initialState = {
	activeStepIndex: 0,
	selectedDate: null,
	selectedTimeslotId: null,
	selectedVariantIds: [],
	quantityByVariantId: {},
	customerDetails: {},
	coupon: null,
}

const activeStepIndex = (state = initialState.activeStepIndex, action) => {
	switch (action.type) {
		case types.SET_STEP_INDEX:
			return action.stepIndex
		default:
			return state
	}
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

const customerDetails = (state = initialState.customerDetails, action) => {
	switch (action.type) {
		case types.SET_CUSTOMER_DETAILS:
			return action.customerDetails
		default:
			return state
	}
}
const coupon = (state = initialState.coupon, action) => {
	switch (action.type) {
		case types.CHECK_COUPON_CODE_SUCCEEDED:
			const {
				couponCode,
				json: {
					discount_cash: discountCash,
					discount_percentage: discountPct,
				},
			} = action

			return {
				...state,
				discountCash,
				discountPct,
				couponCode,
			}
		default:
			return state
	}
}

export default combineReducers({
	activeStepIndex,
	selectedDate,
	selectedTimeslotId,
	selectedVariantIds,
	quantityByVariantId,
	customerDetails,
	coupon,
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
	return state.timeslots.timeslotsById[state.selection.selectedTimeslotId]
}

export function getSelectedVariants(state) {
	return getEnabledVariants(state).map(variantId => {
		const variant = getVariant(state.variants, variantId)
		return {
			...variant,
			quantity: state.selection.quantityByVariantId[variantId],
		}
	})
}

export function getSubtotalPrice(state) {
	return getEnabledVariants(state).reduce((total, variantId) =>
		total + getVariant(state.variants, variantId).price *
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

export function getDiscount(state) {
	const { selection: { coupon: couponSelection } } = state
	if (!couponSelection) {
		return 0
	}
	return (((getSubtotalPrice(state) + getBookingFee(state)) * couponSelection.discountPct) / 100) +
		couponSelection.discountCash
}

export function getTotalPrice(state) {
	return getSubtotalPrice(state) + getBookingFee(state) - getDiscount(state)
}

export function getTotalQuantity(state) {
	return getEnabledVariants(state).reduce((total, variantId) =>
		total + state.selection.quantityByVariantId[variantId],
		0
	)
}

export function isDateSelected(state) {
	return state.selection.selectedDate
}

export function isTimeslotSelected(state) {
	return state.product.hasTimeslots && !!state.selection.selectedTimeslotId
}

export function areVariantsValid(state) {
	return getTotalQuantity(state) > 0
}

export function getInvalidFields(state) {
	const validationFields = [
		{
			fieldName: 'date',
			fieldValidation: isDateSelected,
		},
		{
			fieldName: 'timeslots',
			fieldValidation: isTimeslotSelected,
		},
		{
			fieldName: 'variants',
			fieldValidation: areVariantsValid,
		},
	]

	return validationFields.filter((field) =>
		!field.fieldValidation(state)
	)
}

export function bookingDetailsCompleted(state) {
	return !getInvalidFields(state).length
}
