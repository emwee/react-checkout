import * as types from '../constants/action_types'

const initialState = {
	timeslotsById: {},
	timeslotIds: []
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
  switch (action.type) {
  	default:
  		return {
  			timeslotsById: timeslotsById(state.timeslotsById, action),
  			timeslotIds: timeslotIds(state.timeslotIds, action)
  		}
  }
}

export function getTimeslots(state) {
	return state.timeslotIds.map((id) => {
		return getTimeslot(state, id)
	})
}