import 'babel-polyfill'
import expect from 'expect'
import reducer from '../../reducers/timeslots'
import * as types from '../../constants/action_types'

import TIMESLOTS_STUB from '../../api/timeslots.20160401.json'

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

	it('should handle RECEIVE_TIMESLOTS_SUCCESS', () => {
		expect(
			reducer({}, {
				type: types.RECEIVE_TIMESLOTS_SUCCESS,
				timeslots: TIMESLOTS_STUB.timeslots,
			})
		).toEqual({
			isFetching: false,
			didInvalidate: false,
			timeslotIds: [101, 102],
			timeslotsById: {
				101: {
					id: 101,
					timeslot: '9:01',
					"enabled": true,
					"max_bookable": 11
				},
				102: {
					id: 102,
					timeslot: '10:01',
					"enabled": true,
					"max_bookable": 12
				}
			}
		})
	})
})