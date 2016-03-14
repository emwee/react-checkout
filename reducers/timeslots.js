import * as types from '../constants/action_types'

const initialState = {
	timeslotIds: [],
	timeslotById: {}
}

const timeslotById = (state=initialState.timeslotById, action) => {
	console.log('--timeslotById', action);
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			const aa = action.timeslots.reduce((obj, timeslot) => {
				obj[timeslot.id] = timeslot
				return obj
			}, {})

			console.log(aa);

			return aa
		default:
			return state
	}
}

function timeslotIds(state = [], action) {
	switch (action.type) {
		case types.RECEIVE_CHECKOUT_DETAILS:
			return action.timeslots.map(timeslot => timeslot.id)
		default:
			return state
	}
}

function getTimeslot(state, timeslotId) {
	console.log('getTimeslot');
	return state.timeslotById[timeslotId]
}

export default function timeslots(state = initialState, action) {
  switch (action.type) {
  	default:
  		return {
  			timeslotById: timeslotById(state.timeslotById, action),
  			timeslotIds: timeslotIds(state.timeslotIds, action)
  		}
  }
}

export function getTimeslots(state) {
	console.log('getTimeslots', state);
	return state.timeslotIds.map((timeslotId) => {
		return getTimeslot(state, timeslotId)
	})
}