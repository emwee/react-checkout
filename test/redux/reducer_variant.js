import 'babel-polyfill'
import expect from 'expect'
import reducer from '../../reducers/variants'
import * as types from '../../constants/action_types'

describe('variants reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual({
			didInvalidate: false,
			isFetching: false,
			variantIds: [],
			variantsById: {}
		})
	})

	it('should handle RECEIVE_VARIANTS_SUCCESS', () => {
		expect(
			reducer({}, {
				type: types.RECEIVE_VARIANTS_SUCCESS,
				variants: [
					{
						"id": 101,
						"title": "Adults",
						"price": 17.5,
						"num_tickets": 40
					},
					{
						"id": 102,
						"title": "Children",
						"price": 12,
						"num_tickets": 40,
						"valid_with": [101]
					},
				]
			})
		).toEqual({
			isFetching: false,
			didInvalidate: false,
			variantIds: [101, 102],
			variantsById: {
				101: {
					id: 101,
					title: "Adults",
					price: 17.5,
					num_tickets: 40
				},
				102: {
					id: 102,
					title: "Children",
					price: 12,
					num_tickets: 40,
					valid_with: [101]
				}
			}
		})
	})
})