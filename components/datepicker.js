import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Pikaday from 'pikaday'
import moment from 'moment'

require('pikaday/css/pikaday.css')
require('../css/datepicker.css')

class Datepicker extends Component {
	constructor() {
		super()
		this.picker = null
	}
	componentDidUpdate() {
		const { availableDates } = this.props
		this.picker.setMinDate(new Date(availableDates[0]))
		this.picker.setMaxDate(new Date(availableDates[availableDates.length-1]))
		this.picker.gotoDate(new Date(availableDates[0]))
	}
	componentDidMount() {
		console.log('datepicker.componentDidMount')
		const { availableDates, selectedDate, onSelectDate } = this.props
		console.log(availableDates)
		const node = ReactDOM.findDOMNode(this.refs.datepicker)
		this.picker = new Pikaday({
			field: node,
			bound: false,
			defaultDate: new Date(availableDates[0]),
			minDate: new Date(availableDates[0]),
			maxDate: new Date(availableDates[availableDates.length-1]),
			setDefaultDate: !!selectedDate,
			onSelect: (date) => {
				onSelectDate(date)
			},
			disableDayFn: (date) => {
				!availableDates.includes(moment(date).format('YYYY-MM-DD'))
			}
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