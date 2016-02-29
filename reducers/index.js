import { combineReducers } from 'redux'

const selectedDate = (state = null, action, date) => {
	switch (action.type) {
		case 'SELECT_DATE':
			return date
    	default:
    		return state
    }
}

const availableDates = (state = ['2016-02-29'], action) => {
	return state
}

const variants = (state = [], action) => {
	return state
}

const rootReducer = combineReducers({
	selectedDate,
	availableDates,
	variants
})

export default rootReducer