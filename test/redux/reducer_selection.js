import 'babel-polyfill'
import expect from 'expect'
import { createStore } from 'redux'
import rootReducer from '../../reducers/index'
import { default as selectionReducer, getTotalQuantity } from '../../reducers/selection'
import * as actions from '../../actions'
import * as types from '../../constants/action_types'

import VARIANTS_STUB from '../../api/variants.json'

describe('selection reducer', () => {
	it('should return the initial state', () => {
		expect(
			selectionReducer(undefined, {})
		).toEqual({
			activeStepIndex: 0,
			selectedDate: null,
			selectedTimeslotId: null,
			selectedVariantIds: [],
			quantityByVariantId: {},
		})
	})

	it('should handle SELECT_DATE', () => {
		const today = new Date()
		expect(
			selectionReducer({}, {
				type: types.SELECT_DATE,
				date: today
			})
		).toEqual({
			activeStepIndex: 0,
			selectedDate: today,
			selectedTimeslotId: null,
			selectedVariantIds: [],
			quantityByVariantId: {},
		})
	})

	it('should handle SELECT_VARIANT', () => {
		expect(
			selectionReducer({
				activeStepIndex: 0,
				selectedDate: null,
				selectedTimeslotId: null,
				selectedVariantIds: [],
				quantityByVariantId: {},
			}, {
				type: types.SELECT_VARIANT,
				variantId: 101,
				quantity: 3
			})
		).toEqual({
			activeStepIndex: 0,
			selectedDate: null,
			selectedTimeslotId: null,
			selectedVariantIds: [ 101 ],
			quantityByVariantId: { 101:3 },
		})

		expect(
			selectionReducer({
				activeStepIndex: 0,
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
			activeStepIndex: 0,
			selectedDate: null,
			selectedTimeslotId: null,
			selectedVariantIds: [ 101 ],
			quantityByVariantId: { 101:5 },
		})
	})

	it('should handle getTotalQuantity', () => {
		const store = createStore(rootReducer);
		store.dispatch(actions.selectDate('2016-04-01'));
		store.dispatch(actions.receiveVariants(VARIANTS_STUB.variants));
		store.dispatch(actions.selectVariant(102, 2));

		// Children depends on Adults, so should not be counted
		expect(getTotalQuantity(store.getState())).toEqual(0)

		// select 3 tickets for Adults
		store.dispatch(actions.selectVariant(101, 3));
		expect(getTotalQuantity(store.getState())).toEqual(5)
	})
})