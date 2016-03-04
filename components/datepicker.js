import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Pikaday from 'pikaday'
import moment from 'moment'

require('pikaday/css/pikaday.css')
require('../css/datepicker.css')

class Datepicker extends Component {
	componentDidMount() {
		const { available_dates, selected_date, onSelectDate } = this.props
		const node = ReactDOM.findDOMNode(this.refs.datepicker)
		const picker = new Pikaday({
			field: node,
			bound: false,
			defaultDate: selected_date ? new Date(selected_date) : new Date(available_dates[0]),
			minDate: new Date(available_dates[0]),
			maxDate: new Date(available_dates[available_dates.length-1]),
			setDefaultDate: !!selected_date,
			onSelect: (date) => {
				onSelectDate(moment(date).format('YYYY-MM-DD'))
			},
			disableDayFn: (date) =>
				!available_dates.includes(moment(date).format('YYYY-MM-DD'))
		})
	}
	render() {
		return (
			<div className="datepicker-wrapper">
				<div ref="datepicker"></div>
			</div>
		)
	}
}

export default Datepicker