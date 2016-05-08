import React, { PropTypes } from 'react'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import { formatDate } from '../../viewhelpers'

import 'react-day-picker/lib/style.css'

const Datepicker = (props) => {
	const { availableDates, selectedDate, onSelectDate } = props
	const modifiers = {
		disabled: day => !availableDates.includes(formatDate(day)),
		selected: day => selectedDate === formatDate(day, 'YYYYMMDD'),
	}

	return (
		<DayPicker
			modifiers={modifiers}
			initialMonth={moment(availableDates[0]).toDate()}
			onDayClick={(e, day) => {
				onSelectDate(formatDate(day, 'YYYYMMDD'))
			}}
		/>
	)
}

Datepicker.propTypes = {
	availableDates: PropTypes.array,
	selectedDate: PropTypes.string,
	onSelectDate: PropTypes.func,
}

export default Datepicker
