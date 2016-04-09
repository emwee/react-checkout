import numeral from 'numeral'
import moment from 'moment'

export const formatPrice = price => {
	return numeral(price).format('$0,0.00')
}

export const formatDate = (date, format='YYYY-MM-DD') => {
	return moment(date).format(format)
}