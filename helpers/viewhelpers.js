import numeral from 'numeral'
import moment from 'moment'

export const formatPrice = price =>
	numeral(price).format('$0,0.00')

export const formatDate = (date, format = 'YYYY-MM-DD') =>
	moment(date).format(format)
