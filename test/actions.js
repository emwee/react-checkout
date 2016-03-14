import 'babel-polyfill'
import expect from 'expect'
import * as actions from '../actions'
import * as types from '../constants/action_types'

describe('actions', () => {
  it('should create an action to select a date', () => {
    const date = '2016-04-01'
    const expectedAction = {
    	type: types.SELECT_DATE,
    	date
    }
    expect(actions.selectDate(date)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to select a timeslot', () => {
    const timeslotId = '2016-04-01'
    const expectedAction = {
    	type: types.SELECT_TIMESLOT,
    	timeslotId
    }
    expect(actions.selectTimeslot(timeslotId)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should create an action to add a variant', () => {
    const variantId = 101
    const quantity = 3
    const expectedAction = {
    	type: types.ADD_VARIANT,
    	variantId,
    	quantity
    }
    expect(actions.addVariant(variantId, quantity)).toEqual(expectedAction)
  })
})