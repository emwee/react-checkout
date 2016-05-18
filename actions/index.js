import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import CustomEvent from 'custom-event'
import api from '../api/index'
import * as types from '../constants/action_types'
import * as selectionReducer from '../reducers/selection'

export function setStepIndex(stepIndex) {
	return {
		type: types.SET_STEP_INDEX,
		stepIndex,
	}
}

export function selectDate(date) {
	return {
		type: types.SELECT_DATE,
		date,
	}
}

export function invalidateDate(date) {
	return {
		type: types.INVALIDATE_DATE,
		date,
	}
}

export function requestVariants() {
	return {
		type: types.REQUEST_VARIANTS,
	}
}

export function receiveVariants(variants) {
	return {
		type: types.RECEIVE_VARIANTS_SUCCESS,
		variants,
		receivedAt: Date.now(),
	}
}

export function receiveVariantsFailed(variants) {
	return {
		type: types.RECEIVE_VARIANTS_FAILURE,
		variants,
		receivedAt: Date.now(),
	}
}

export function requestTimeslots(date) {
	return {
		type: types.REQUEST_TIMESLOTS,
		date,
	}
}

export function receiveTimeslots(date, timeslots) {
	return {
		type: types.RECEIVE_TIMESLOTS_SUCCESS,
		date,
		timeslots,
		receivedAt: Date.now(),
	}
}

export function receiveTimeslotsFailed(date, timeslots) {
	return {
		type: types.RECEIVE_TIMESLOTS_FAILURE,
		date,
		timeslots,
		receivedAt: Date.now(),
	}
}

export function fetchTimeslots(date) {
	return (dispatch) => {
		dispatch(requestTimeslots(date))
		fetch(`./api/timeslots.${date}.json`)
			.then(response => response.json())
			.then(json => {
				if (json.success) {
					dispatch(receiveTimeslots(date, json.timeslots))
				} else {
					dispatch(receiveTimeslotsFailed(date, json.timeslots))
				}
			})
	}
}

export function shouldFetchTimeslots(date) {
	return (dispatch, getState) => {
		const { product: { hasTimeslots } } = getState()
		if (hasTimeslots) {
			dispatch(fetchTimeslots(date))
		}
	}
}

export function selectTimeslot(timeslotId) {
	return {
		type: types.SELECT_TIMESLOT,
		timeslotId,
	}
}

export function selectVariant(variantId, quantity) {
	return {
		type: types.SELECT_VARIANT,
		variantId,
		quantity,
	}
}

export function fetchVariants() {
	return (dispatch) => {
		dispatch(requestVariants())
		fetch('./api/variants.json')
			.then(response => response.json())
			.then(json => {
				if (json.success) {
					dispatch(receiveVariants(json.variants))
				} else {
					dispatch(receiveVariantsFailed(json.variants))
				}
			})
	}
}

export function setProduct(product) {
	return {
		type: types.SET_PRODUCT,
		...product,
	}
}

export function requestCheckcouponCode(couponCode) {
	return {
		type: types.REQUEST_CHECK_COUPON_CODE,
		couponCode,
	}
}

export function checkcouponCodeSucceeded(couponCode, json) {
	return {
		type: types.CHECK_COUPON_CODE_SUCCEEDED,
		json,
		couponCode,
	}
}

export function checkcouponCodeFailed(couponCode, json) {
	return {
		type: types.CHECK_COUPON_CODE_FAILED,
		json,
		couponCode,
	}
}

export function checkcouponCode(couponCode) {
	const status = couponCode === 'ams' ? 'success' : 'error'
	return (dispatch) => {
		dispatch(requestCheckcouponCode())
		fetch(`./api/check_coupon.${status}.json`)
			.then(response => response.json())
			.then(json => {
				if (json.success) {
					dispatch(checkcouponCodeSucceeded(couponCode, json))
				} else {
					dispatch(checkcouponCodeFailed(couponCode, json))
				}
			})
	}
}

export function setCustomerDetails(customerDetails) {
	return {
		type: types.SET_CUSTOMER_DETAILS,
		customerDetails,
	}
}

function preselectCheckoutDetails(selection) {
	const {
		activeStepIndex,
		selectedDate,
		selectedTimeslotId, timeslots,
		selectedVariantIds, quantityByVariantId, variants,
		customer,
	} = selection

	return dispatch => {
		dispatch(setStepIndex(activeStepIndex))
		dispatch(selectDate(selectedDate))
		dispatch(receiveTimeslots(selectedDate, timeslots))
		dispatch(selectTimeslot(selectedTimeslotId))
		dispatch(receiveVariants(variants))
		for (const variantId of selectedVariantIds) {
			dispatch(selectVariant(variantId, quantityByVariantId[variantId]))
		}
		dispatch(setCustomerDetails(customer))
	}
}

export function getCheckoutDetails() {
	return dispatch => {
		api.getCheckoutDetails(details => {
			dispatch(setProduct(details.product))
			if (details.selection) {
				dispatch(preselectCheckoutDetails(details.selection))
			}
		})
	}
}

export function goToStep(stepIndex) {
	return (dispatch, getState) => {
		const state = getState()
		if (selectionReducer.isStepUnlocked(state, stepIndex)) {
			dispatch(setStepIndex(stepIndex))
		}
	}
}

export function goToStepIfValid(stepIndex) {
	return (dispatch, getState) => {
		const state = getState()
		switch (stepIndex) {
			case 0:
			case 1:
				if (selectionReducer.bookingDetailsCompleted(state)) {
					dispatch(setStepIndex(stepIndex))
				}
				break
			default:
				return false
		}
		return false
	}
}

export function goToPersonalDetails() {
	return (dispatch, getState) => {
		const state = getState()
		const invalidFields = selectionReducer.getInvalidFields(state)
		if (invalidFields.length) {
			for (const field of invalidFields) {
				const event = new CustomEvent(`validateField:${field.fieldName}`)
				window.dispatchEvent(event)
				return false
			}
		}
		return dispatch(setStepIndex(1))
	}
}

export function submitOrder() {
	return (dispatch, getState) => {
		const state = getState()
		const requestParams = {
			booking_date: state.selection.selectedDate,
			timeslot_id: state.selection.selectedTimeslotId,
			'contact-firstname': state.form.customer.firstName.value,
			'contact-surname': state.form.customer.lastName.value,
			'contact-email': state.form.customer.email.value,
			'contact-phone': state.form.customer.phone.value,
			'contact-sms_notification_enabled': true,

			// TODO: implement these fields
			csrf_token: 'TODO',
			COUPON_CODE: 'TODO',

			// TODO: check if these fields are really necessary
			country: '?', // should be set by backend IMO
			timeslot: '?', // timeslot id should be sufficient
			booking_fee: '?',
			subtotal: '?',
			total_price: '?',
		}

		state.selection.selectedVariantIds.forEach((variantId, index) => {
			requestParams[`product_variant-${index + 1}-id`] = variantId
			requestParams[`product_variant-${index + 1}-num_tickets`] =
				state.selection.quantityByVariantId[variantId]
		})
	}
}
