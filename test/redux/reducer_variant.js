import 'babel-polyfill'
import expect from 'expect'
import { createStore } from 'redux'
import rootReducer from '../../reducers/index'
import { default as variantsReducer, isVariantDisabled } from '../../reducers/variants'
import * as actions from '../../actions'
import * as types from '../../constants/action_types'

import VARIANTS_STUB from '../../api/variants.json'

describe('variants reducer', () => {

	it('should return the initial state', () => {
		expect(
			variantsReducer(undefined, {})
		).toEqual({
			didInvalidate: false,
			isFetching: false,
			variantIds: [],
			variantsById: {}
		})
	})

	it('should handle RECEIVE_VARIANTS_SUCCESS', () => {
		expect(
			variantsReducer({}, {
				type: types.RECEIVE_VARIANTS_SUCCESS,
				variants: VARIANTS_STUB.variants
			})
		).toEqual({
			isFetching: false,
			didInvalidate: false,
			variantIds: [101, 102, 103, 104],
			variantsById: {
				101: {
					id: 101,
					title: "Adults",
					price: 17.5,
				},
				102: {
					id: 102,
					title: "Children",
					price: 12,
					valid_with: [101]
				},
				103: {
					id: 103,
					title: "Aliens",
					price: 7
				},
				104: {
					id: 104,
					title: "Free",
					price: 0
				}
			}
		})
	})

	it('should handle initially disable variants', () => {
		const store = createStore(rootReducer);
		store.dispatch(actions.receiveVariants(VARIANTS_STUB.variants));
		expect(isVariantDisabled(store.getState(), 101)).toBe(true)
	})

	it('should handle enable variants after date selection', () => {
		const store = createStore(rootReducer);
		store.dispatch(actions.selectDate('2016-04-01'));
		store.dispatch(actions.receiveVariants(VARIANTS_STUB.variants));
		expect(isVariantDisabled(store.getState(), 101)).toBe(false)
	})
})