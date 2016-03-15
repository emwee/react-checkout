import api from '../api/index'
import * as types from '../constants/action_types'

function receiveCheckoutDetails(details) {
  return {
  	type: types.RECEIVE_CHECKOUT_DETAILS,
  	...details
  }
}

export function getCheckoutDetails() {
  return dispatch => {
    api.getCheckoutDetails(details => {
      dispatch(receiveCheckoutDetails(details))
    })
  }
}

export function selectDate(date) {
  return {
  	type: types.SELECT_DATE,
  	date
  }
}

export function invalidateDate(date) {
  return {
  	type: types.INVALIDATE_DATE,
  	date
  }
}

export function fetchTimeslots(date) {
  return {
    type: types.FETCH_TIMESLOTS,
    date
  }
}

export function receiveTimeslots(date, response) {
  return {
    type: types.RECEIVE_TIMESLOTS,
    date,
    timeslots: response.timeslots,
    receivedAt: Date.now()
  }
}

export function selectTimeslot(timeslotId) {
	return {
		type: types.SELECT_TIMESLOT,
		timeslotId
	}
}

export function addVariant(variantId, quantity) {
  return {
  	type: types.ADD_VARIANT,
  	variantId,
  	quantity
  }
}