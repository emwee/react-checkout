import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Pikaday from 'pikaday'
import moment from 'moment'

require('pikaday/css/pikaday.css')

class Datepicker extends Component {
	componentDidMount() {
		const { available_dates, onSelectDate } = this.props
		const node = ReactDOM.findDOMNode(this.refs.datepicker)
		const picker = new Pikaday({
			field: node,
			bound: false,
			defaultDate: new Date(available_dates[0]),
			minDate: new Date(available_dates[0]),
			maxDate: new Date(available_dates[available_dates.length-1]),
			onSelect: onSelectDate,
			disableDayFn: (date) =>
				!available_dates.includes(moment(date).format('YYYY-MM-DD'))
		})
	}
	render() {
		return (
			<div ref="datepicker"></div>
		)
	}
}

export default Datepicker