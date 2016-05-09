import * as types from '../constants/action_types'

function updateAlertedField(state, fieldName) {
	if (state === fieldName) {
		return {}
	}
	return state
}

function alertedField(state = null, action) {
	switch (action.type) {
		case types.ALERT_FIELD:
			return action.fieldName
		case types.SELECT_DATE:
			return updateAlertedField(state, 'date')
		case types.SELECT_TIMESLOT:
			return updateAlertedField(state, 'timeslot')
		case types.SELECT_VARIANT:
			return updateAlertedField(state, 'variants')
		default:
			return state
	}
}

export default alertedField

export function isFieldAlerted(state, fieldName) {
	return state.alertedField === fieldName
}
