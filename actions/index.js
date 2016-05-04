import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import api from '../api/index'
import * as types from '../constants/action_types'

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
		fetch(`./api/variants.json`)
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

function preselectCheckoutDetails(selection) {
	const { selectedDate, selectedTimeslotId, selectedVariantIds, quantityByVariantId,
		timeslots } = selection

	return dispatch => {
		dispatch(selectDate(selectedDate))
		dispatch(receiveTimeslots(selectedDate, timeslots))
		dispatch(selectTimeslot(selectedTimeslotId))
		for (let variantId of selectedVariantIds) {
			dispatch(selectVariant(variantId, quantityByVariantId[variantId]))
		}
	}
}

export function getCheckoutDetails() {
	return dispatch => {
		api.getCheckoutDetails(details => {
			dispatch(setProduct(details.product))

			// if (details.selection) {
			// 	dispatch(preselectCheckoutDetails(details.selection))
			// }
		})
	}
}
