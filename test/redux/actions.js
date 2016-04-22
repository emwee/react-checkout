import 'babel-polyfill'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import * as actions from '../../actions'
import * as types from '../../constants/action_types'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
	it('should create an action to select a date', () => {
		const date = '2016-04-01'
		const expectedAction = {
			type: types.SELECT_DATE,
			date
		}
		expect(actions.selectDate(date)).toEqual(expectedAction)
	})

	it('should create an action to select a timeslot', () => {
		const timeslotId = '2016-04-01'
		const expectedAction = {
			type: types.SELECT_TIMESLOT,
			timeslotId
		}
		expect(actions.selectTimeslot(timeslotId)).toEqual(expectedAction)
	})

	it('should create an action to add a variant', () => {
		const variantId = 101
		const quantity = 3
		const expectedAction = {
			type: types.SELECT_VARIANT,
			variantId,
			quantity
		}
		expect(actions.selectVariant(variantId, quantity)).toEqual(expectedAction)
	})
})

// describe('async actions', () => {
// 	afterEach(() => {
// 		nock.cleanAll()
// 	})

// 	it('creates a RECEIVE_TIMESLOTS when fetching timeslots has been done', (done) => {
// 		nock('http://example.com/')
// 			.get('/timeslots')
// 			.reply(300, {
// 				success: false,
// 				foobar: [{ id: 102, timeslot: '11:00' }]
// 			})

// 		const today = new Date()

// 		const expectedActions = [
// 			{ type: types.REQUEST_TIMESLOTS },
// 			{ type: types.RECEIVE_TIMESLOTS, timeslots: [{ id: 101, timeslot: '11:00' } ] }
// 		]

// 		const store = mockStore({ timeslots: [] }, expectedActions, done)

// 		store.dispatch(actions.fetchTimeslots(1))

// 		setTimeout(() => done(), 300);
// 	})
// })