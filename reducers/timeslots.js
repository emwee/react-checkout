import * as types from '../constants/action_types'

const initialState = {
	isFetching: false,
	timeslotsById: {},
	timeslotIds: []
}

function isFetching(state = initialState.isFetching, action) {
	console.log('isFetching', action.type)
	switch (action.type) {
		case types.REQUEST_TIMESLOTS:
			return true
		case types.RECEIVE_TIMESLOTS:
			return false
		default:
			return state
	}
}

function timeslotIds(state = initialState.timeslotIds, action) {
	switch (action.type) {
		case types.RECEIVE_TIMESLOTS:
			return action.timeslots.map(timeslot => timeslot.id)
		default:
			return state
	}
}

const timeslotsById = (state = initialState.timeslotsById, action) => {
	switch (action.type) {
		case types.RECEIVE_TIMESLOTS:
			return action.timeslots.reduce((obj, timeslot) => {
					obj[timeslot.id] = timeslot
					return obj
				}, {})
		default:
			return state
	}
}

function getTimeslot(state, id) {
	return state.timeslotsById[id]
}

export default function timeslots(state = initialState, action) {
	return {
		isFetching: isFetching(state.isFetching, action),
		timeslotsById: timeslotsById(state.timeslotsById, action),
		timeslotIds: timeslotIds(state.timeslotIds, action)
	}
}

export function getTimeslots(state) {
	return state.timeslotIds.map((id) => getTimeslot(state, id))
}