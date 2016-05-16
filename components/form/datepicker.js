import React, { Component, PropTypes } from 'react'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import AlertField from './alert'
import { formatDate } from '../../helpers/viewhelpers'
import 'react-day-picker/lib/style.css'

class Datepicker extends Component {
	render() {
		const { availableDates, selectedDate, onSelectDate, isValid, isValidated } = this.props
		const isDayDisabled = (day) =>
			!availableDates.includes(formatDate(day))
		const modifiers = {
			disabled: day => isDayDisabled(day),
			selected: day => selectedDate === formatDate(day, 'YYYYMMDD'),
		}

		return (
			<div>
				<DayPicker ref="date"
					modifiers={modifiers}
					initialMonth={moment(availableDates[0]).toDate()}
					onDayClick={(e, day) => !isDayDisabled(day) && onSelectDate(formatDate(day, 'YYYYMMDD'))}
				/>
				{isValidated && !isValid && <p>choose a date!</p>}
			</div>
		)
	}
}

Datepicker.propTypes = {
	availableDates: PropTypes.array,
	selectedDate: PropTypes.string,
	onSelectDate: PropTypes.func,
	isValid: PropTypes.bool,
	isValidated: PropTypes.bool,
}

export default new AlertField('date', Datepicker)
