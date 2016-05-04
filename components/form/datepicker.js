import React, { Component, PropTypes } from 'react'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import { formatDate } from '../../viewhelpers'

import 'react-day-picker/lib/style.css'

export class Datepicker extends Component {
	render() {
		const { availableDates, selectedDate, onSelectDate } = this.props
		const modifiers = {
			disabled: day => !availableDates.includes(formatDate(day)),
			selected: day => selectedDate === formatDate(day, 'YYYYMMDD'),
		}

		return (
			<DayPicker
				modifiers={ modifiers }
				initialMonth={ moment(availableDates[0]).toDate() }
				onDayClick={ (e, day) => {
					onSelectDate(formatDate(day, 'YYYYMMDD'))
				}}
			/>
		)
	}
}

Datepicker.propTypes = {
	availableDates: PropTypes.array,
	selectedDate: PropTypes.string,
	onSelectDate: PropTypes.func,
}
