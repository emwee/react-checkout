import 'babel-polyfill'
import expect from 'expect'
import reducer from '../../reducers'
import * as types from '../../constants/action_types'

describe('app reducer', () => {

	it('should handle SELECT_VARIANT', () => {
		expect(
			reducer({
				selection: {},
				variants: {
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
				}
			}, {
				type: types.SELECT_VARIANT,
				variantId: 102,
				quantity: 2,
			})
		).toEqual({
			selection: {
				selectedVariants: [],
				quantityByVariantId: {},
			}
		})
	})
})