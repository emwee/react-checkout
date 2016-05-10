import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DayPicker from 'react-day-picker'
import moment from 'moment'
import { formatDate } from '../../helpers/viewhelpers'
import { scrollToField } from '../../helpers/utils'
import 'react-day-picker/lib/style.css'

class Datepicker extends Component {
	componentDidUpdate() {
		if (this.props.isFieldAlerted) {
			scrollToField(ReactDOM.findDOMNode(this.refs.field))
		}
	}
	render() {
		const { availableDates, selectedDate, onSelectDate, isFieldAlerted } = this.props

		const isDayDisabled = (day) =>
			!availableDates.includes(formatDate(day))

		const modifiers = {
			disabled: day => isDayDisabled(day),
			selected: day => selectedDate === formatDate(day, 'YYYYMMDD'),
		}

		return (
			<div>
				<DayPicker ref="field"
					modifiers={modifiers}
					initialMonth={moment(availableDates[0]).toDate()}
					onDayClick={(e, day) => !isDayDisabled(day) && onSelectDate(formatDate(day, 'YYYYMMDD'))}
				/>
				{isFieldAlerted && <p>choose a date!</p>}
			</div>
		)
	}
}

Datepicker.propTypes = {
	availableDates: PropTypes.array,
	selectedDate: PropTypes.string,
	onSelectDate: PropTypes.func,
	isFieldAlerted: PropTypes.bool,
}

export default Datepicker
