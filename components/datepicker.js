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
	updatePicker() {
		const { availableDates } = this.props
		const firstDate = availableDates[0]
		const lastDate = availableDates[availableDates.length-1]
		this.picker.setMinDate(new Date(firstDate))
		this.picker.setMaxDate(new Date(lastDate))
		this.picker.gotoDate(new Date(firstDate))
	}
	componentDidUpdate() {
		this.updatePicker()
	}
	componentDidMount() {
		console.log('datepicker.componentDidMount')
		const { availableDates, selectedDate, onSelectDate } = this.props
		console.log(availableDates)
		const node = ReactDOM.findDOMNode(this.refs.datepicker)
		this.picker = new Pikaday({
			field: node,
			bound: false,
			setDefaultDate: !!selectedDate,
			onSelect: onSelectDate,
			disableDayFn: (date) => {
				!availableDates.includes(moment(date).format('YYYY-MM-DD'))
			}
		})

		this.updatePicker()
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