import * as types from '../constants/action_types'

const initialState = {
	isFetching: false,
	didInvalidate: false,
	timeslotsById: {},
	timeslotIds: []
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
		case types.RECEIVE_TIMESLOTS_SUCCESS:
			return action.timeslots.map(timeslot => timeslot.id)
		case types.RECEIVE_TIMESLOTS_FAILURE:
			return []
		default:
			return state
	}
}

const timeslotsById = (state = initialState.timeslotsById, action) => {
	switch (action.type) {
		case types.RECEIVE_TIMESLOTS_SUCCESS:
			return action.timeslots.reduce((obj, timeslot) => {
					obj[timeslot.id] = timeslot
					return obj
				}, {})
		case types.RECEIVE_TIMESLOTS_FAILURE:
			return {}
		default:
			return state
	}
}

export default function timeslots(state = initialState, action) {
	return {
		didInvalidate: didInvalidate(state.didInvalidate, action),
		isFetching: isFetching(state.isFetching, action),
		timeslotsById: timeslotsById(state.timeslotsById, action),
		timeslotIds: timeslotIds(state.timeslotIds, action)
	}
}

export function getTimeslotById(state, id) {
	return state.timeslotsById[id]
}

export function getTimeslots(state) {
	return state.timeslotIds.map((id) => getTimeslotById(state, id))
}