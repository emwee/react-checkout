import 'babel-polyfill'
import expect from 'expect'
import reducer from '../../reducers/timeslots'
import * as types from '../../constants/action_types'

describe('timeslots reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual({
			isFetching: false,
			didInvalidate: false,
			timeslotIds: [],
			timeslotsById: {}
		})
	})
})

describe('timeslots reducer', () => {
	it('should handle RECEIVE_TIMESLOTS_SUCCESS', () => {
		expect(
			reducer({}, {
				type: types.RECEIVE_TIMESLOTS_SUCCESS,
				timeslots: [{
					id: 101,
					timeslot: '9:15'
				},
				{
					id: 102,
					timeslot: '10:15'
				}]
			})
		).toEqual({
			isFetching: false,
			didInvalidate: false,
			timeslotIds: [101, 102],
			timeslotsById: {
				101: {
					id: 101,
					timeslot: '9:15'
				},
				102: {
					id: 102,
					timeslot: '10:15'
				}
			}
		})
	})
})