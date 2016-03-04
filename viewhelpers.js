import numeral from 'numeral'

export function formatPrice(price) {
	return numeral(price).format('$0,0.00');
}