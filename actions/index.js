import api from '../api/index'

function receiveCheckoutDetails(details) {
  return {
    type: 'RECEIVE_PRODUCTS',
    details: details
  }
}

export function selectDate(date) {
	console.log('selectDate', date)
  return { type: 'SELECT_DATE', date }
}

export function selectTimeslot(timeslot_id) {
  return { type: 'SELECT_TIMESLOT', timeslot_id }
}

export function addVariant(variant_id, qty) {
  return { type: 'ADD_VARIANT', qty }
}

export function getCheckoutDetails() {
  console.log('getCheckoutDetails')
  return dispatch => {
    api.getCheckoutDetails(details => {
      dispatch(receiveCheckoutDetails(details))
    })
  }
}