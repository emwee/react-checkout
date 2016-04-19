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

export function setMaxBookable(maxBookable) {
	return {
		type: types.SET_MAX_BOOKABLE,
		maxBookable,
	}
}

export function selectVariant(variantId, quantity) {
	return {
		type: types.SELECT_VARIANT,
		variantId,
		quantity,
	}
}

function receiveCheckoutDetails(details) {
	return {
		type: types.RECEIVE_CHECKOUT_DETAILS,
		...details,
	}
}

function preselectCheckoutDetails(selection) {
	const { selectedDate, selectedTimeslotId, selectedVariantIds, quantityByVariantId,
		timeslots } = selection

	return dispatch => {
		dispatch(selectDate(selectedDate))
		dispatch(receiveTimeslots(selectedDate, timeslots))
		dispatch(selectTimeslot(selectedTimeslotId))
		for (const variantId of selectedVariantIds) {
			dispatch(selectVariant(variantId, quantityByVariantId[variantId]))
		}
	}
}

export function getCheckoutDetails() {
	return dispatch => {
		api.getCheckoutDetails(details => {
			dispatch(receiveCheckoutDetails(details))

			if (details.selection) {
				dispatch(preselectCheckoutDetails(details.selection))
			}
		})
	}
}
