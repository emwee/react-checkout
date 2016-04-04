import expect from 'expect'
import reducer from '../reducers/variants'
import * as types from '../constants/action_types'

describe('variants reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual({
				variantIds: [],
				variantsById: {}
		})
	})
})

describe('variants reducer', () => {
	it('should handle valid_with combinations', () => {

	})
})