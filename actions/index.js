import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import moment from 'moment'
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

export function requestTimeslots(date) {
  return {
    type: types.REQUEST_TIMESLOTS,
    date
  }
}

export function fetchTimeslots(date) {
  return function (dispatch) {
    dispatch(requestTimeslots(date))
    const formattedDate = moment(date).format('YYYYMMDD')
    return fetch(`./api/timeslots.${formattedDate}.json`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveTimeslots(date, json))
      })
  }
}

export function receiveTimeslots(date, json) {
  return {
    type: types.RECEIVE_TIMESLOTS,
    date,
    timeslots: json.timeslots,
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