import checkout from '../api/checkout'
import * as types from '../constants/ActionTypes'

const receiveCheckoutDetails= (details) => {
	console.log('receiveCheckoutDetails', details)
	return {
		type: types.RECEIVE_CHECKOUT_DETAILS,
		details
	}
}

export const selectDate = (date) => {
  return {
    type: types.SELECT_DATE,
    date
  }
}

export const getCheckoutDetails = () => {
	console.log('getCheckoutDetails')
	return dispatch => {
	  checkout.getDetails((details) => {
	    dispatch(receiveCheckoutDetails(details))
	  })
	}
}