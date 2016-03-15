import * as types from '../constants/action_types'

const initialState = {
	timeslotsbyId: {},
	timeslotIdsByDate: {},
	timeslotIds: [] // needed ?
}

const timeslotsbyId = (state = initialState.timeslotsbyId, action) => {
	switch (action.type) {
		// case types.RECEIVE_CHECKOUT_DETAILS:
		// 	const aa = action.timeslots.reduce((obj, timeslot) => {
		// 		obj[timeslot.id] = timeslot
		// 		return obj
		// 	}, {})

		// 	console.log(aa);

		// 	return aa
		default:
			return state
	}
}

const timeslotIdsByDate = (state = initialState.timeslotIdsByDate, action) => {
	switch (action.type) {
		default:
			return state
	}
}

function timeslotIds(state = initialState.timeslotIds, action) {
	switch (action.type) {
		// case types.RECEIVE_CHECKOUT_DETAILS:
		// 	return action.timeslots.map(timeslot => timeslot.id)
		default:
			return state
	}
}

function getTimeslot(state, id) {
	console.log('getTimeslot');
	return state.timeslotsbyId[id]
}

export default function timeslots(state = initialState, action) {
  switch (action.type) {
  	default:
  		return {
  			timeslotsbyId: timeslotsbyId(state.timeslotsbyId, action),
  			timeslotIdsByDate: timeslotIdsByDate(state.timeslotIdsByDate, action),
  			timeslotIds: timeslotIds(state.timeslotIds, action)
  		}
  }
}

export function getTimeslots(state) {
	console.log('getTimeslots', state);
	return state.timeslotIds.map((id) => {
		return getTimeslot(state, id)
	})
}