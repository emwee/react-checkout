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

const preselectCheckoutDetails = selection => {
  return {
    type: types.PRESELECT_CHECKOUT_DETAILS,
    selection
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

export function shouldFetchTimeslots(date) {
  return function (dispatch, getState) {
    const { product: { hasTimeslots } } = getState()
    if (hasTimeslots) {
      dispatch(fetchTimeslots(date))
    }
  }
}

export function fetchTimeslots(date) {
  return function (dispatch) {
    dispatch(requestTimeslots(date))
    setTimeout(() => {
      const formattedDate = moment(date).format('YYYYMMDD')
      return fetch(`./api/timeslots.${formattedDate}.json`)
        .then(response => response.json())
        .then(json => {
          if (json.success) {
            dispatch(receiveTimeslots(date, json))
          } else {
            dispatch(receiveTimeslotsFailed(date, json))
          }
        })
    }, 300)
  }
}

export function receiveTimeslots(date, json) {
  return {
    type: types.RECEIVE_TIMESLOTS_SUCCESS,
    date,
    timeslots: json.timeslots,
    receivedAt: Date.now()
  }
}

export function receiveTimeslotsFailed(date, json) {
  return {
    type: types.RECEIVE_TIMESLOTS_FAILURE,
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

export function setMaxBookable(maxBookable) {
  return {
    type: types.SET_MAX_BOOKABLE,
    maxBookable
  }
}

export function selectVariant(variantId, quantity) {
  return {
  	type: types.SELECT_VARIANT,
  	variantId,
  	quantity
  }
}