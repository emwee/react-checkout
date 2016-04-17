import 'babel-polyfill'
import expect from 'expect'
import reducer from '../reducers/selection'
import * as types from '../constants/action_types'

describe('selection reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual({
			selectedDate: null,
			selectedTimeslotId: null,
			selectedVariantIds: [],
			quantityByVariantId: {},
		})
	})
})

describe('selection reducer', () => {
	it('should handle SELECT_DATE', () => {
		const today = new Date()
		expect(
			reducer({}, {
				type: types.SELECT_DATE,
				date: today
			})
		).toEqual({
			selectedDate: today,
			selectedTimeslotId: null,
			selectedVariantIds: [],
			quantityByVariantId: {},
		})
	})

	it('should handle SELECT_VARIANT', () => {
		expect(
			reducer({}, {
				type: types.SELECT_VARIANT,
				variantId: 101,
				quantity: 3
			})
		).toEqual({
			selectedDate: null,
			selectedTimeslotId: null,
			selectedVariantIds: [ 101 ],
			quantityByVariantId: { 101:3 },
		})

		expect(
			reducer({
				selectedDate: null,
				selectedTimeslotId: null,
				selectedVariantIds: [ 101 ],
				quantityByVariantId: { 101:3 },
			}, {
				type: types.SELECT_VARIANT,
				variantId: 101,
				quantity: 5
			})
		).toEqual({
			selectedDate: null,
			selectedTimeslotId: null,
			selectedVariantIds: [ 101 ],
			quantityByVariantId: { 101:5 },
		})
	})
})