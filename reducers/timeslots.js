import { combineReducers } from 'redux'
import * as types from '../constants/action_types'

const initialState = {
	isFetching: false,
	didInvalidate: false,
	timeslotsById: {},
	timeslotIds: [],
}

function parseTimeslotIds(timeslots) {
	return timeslots.map(timeslot => timeslot.id)
}

function parseTimeslotsById(timeslots) {
	return timeslots.reduce((obj, timeslot) => {
		const timeslotObj = obj
		timeslotObj[timeslot.id] = timeslot
		return timeslotObj
	}, {})
}

function isFetching(state = initialState.isFetching, action) {
	switch (action.type) {
		case types.REQUEST_TIMESLOTS:
			return true
		case types.RECEIVE_TIMESLOTS_SUCCESS:
		case types.RECEIVE_TIMESLOTS_FAILURE:
			return false
		default:
			return state
	}
}

function didInvalidate(state = initialState.didInvalidate, action) {
	switch (action.type) {
		case types.REQUEST_TIMESLOTS:
			return false
		case types.RECEIVE_TIMESLOTS_FAILURE:
			return true
		default:
			return state
	}
}

function timeslotIds(state = initialState.timeslotIds, action) {
	switch (action.type) {
		case types.PRESELECT_CHECKOUT_DETAILS:
			return parseTimeslotIds(action.selection.timeslots)
		case types.RECEIVE_TIMESLOTS_SUCCESS:
			return parseTimeslotIds(action.timeslots)
		case types.RECEIVE_TIMESLOTS_FAILURE:
			return []
		default:
			return state
	}
}

const timeslotsById = (state = initialState.timeslotsById, action) => {
	switch (action.type) {
		case types.PRESELECT_CHECKOUT_DETAILS:
			return parseTimeslotsById(action.selection.timeslots)
		case types.RECEIVE_TIMESLOTS_SUCCESS:
			return parseTimeslotsById(action.timeslots)
		case types.RECEIVE_TIMESLOTS_FAILURE:
			return {}
		default:
			return state
	}
}

export default combineReducers({
	didInvalidate,
	isFetching,
	timeslotsById,
	timeslotIds,
})

export function getTimeslotById(state, id) {
	return state.timeslotsById[id]
}

export function getTimeslots(state) {
	return state.timeslotIds.map((id) => getTimeslotById(state, id))
}
