import expect from 'expect'
import reducer from '../reducers/order'
import * as types from '../constants/action_types'

describe('order reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual({
			selectedDate: null,
			selectedTimeslotId: null,
			addedVariantIds: [],
			quantityByVariantId: {},
		})
	})
})

describe('timeslots reducer', () => {
	it('should handle SELECT_DATE', () => {
		const today = new Date()
		expect(
			reducer([], {
				type: types.SELECT_DATE,
				date: today
			})
		).toEqual({
			selectedDate: today,
			selectedTimeslotId: null,
			addedVariantIds: [],
			quantityByVariantId: {},
		})
	})

	it('should handle ADD_VARIANT', () => {
		expect(
			reducer({}, {
				type: types.ADD_VARIANT,
				variantId: 101,
				quantity: 3
			})
		).toEqual({
			selectedDate: null,
			selectedTimeslotId: null,
			addedVariantIds: [ 101 ],
			quantityByVariantId: { 101:3 },
		})

		expect(
			reducer({
				selectedDate: null,
				selectedTimeslotId: null,
				addedVariantIds: [ 101 ],
				quantityByVariantId: { 101:3 },
			}, {
				type: types.ADD_VARIANT,
				variantId: 101,
				quantity: 5
			})
		).toEqual({
			selectedDate: null,
			selectedTimeslotId: null,
			addedVariantIds: [ 101 ],
			quantityByVariantId: { 101:5 },
		})
	})
})