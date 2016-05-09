import React, { PropTypes } from 'react'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import { formatDate } from '../../viewhelpers'

import 'react-day-picker/lib/style.css'

const Datepicker = (props) => {
	const { availableDates, selectedDate, onSelectDate, isFieldAlerted } = props

	const isDayDisabled = (day) =>
		!availableDates.includes(formatDate(day))

	const modifiers = {
		disabled: day => isDayDisabled(day),
		selected: day => selectedDate === formatDate(day, 'YYYYMMDD'),
	}

	return (
		<div>
			<DayPicker
				modifiers={modifiers}
				initialMonth={moment(availableDates[0]).toDate()}
				onDayClick={(e, day) => !isDayDisabled(day) && onSelectDate(formatDate(day, 'YYYYMMDD'))}
			/>
			{isFieldAlerted && <p>choose a date!</p>}
		</div>
	)
}

Datepicker.propTypes = {
	availableDates: PropTypes.array,
	selectedDate: PropTypes.string,
	onSelectDate: PropTypes.func,
	isFieldAlerted: PropTypes.bool,
}

export default Datepicker
