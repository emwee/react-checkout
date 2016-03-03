import { combineReducers } from 'redux'
import * as types from '../constants/ActionTypes'
import { getAvailableDates } from './available_dates'

const variants = (state = [], action) => {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			console.log(action)
			console.log(action.details)
			console.log(action.details.variants)
			return action.details.variants
		default:
			return state
	}
}

const maxBookable = (state=null, action) => {
	return state
}

const rootReducer = combineReducers({
	availableDates: getAvailableDates,
	variants,
	maxBookable
})

export default rootReducer