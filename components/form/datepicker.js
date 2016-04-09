import React, { Component } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import Pikaday from 'pikaday'
import { formatDate } from '../../viewhelpers'

require('pikaday/css/pikaday.css')
require('../../css/datepicker.css')

class Datepicker extends Component {
	constructor() {
		super()
		this.picker = null
	}
	updatePicker() {
		const { availableDates, selectedDate } = this.props

		// set date range
		this.picker.setMinDate(new Date(availableDates[0]))
		this.picker.setMaxDate(new Date(availableDates[availableDates.length-1]))

		// set selected date and prevent onSelect callback
		this.picker.setDate(selectedDate, true)
	}
	componentDidUpdate() {
		this.updatePicker()
	}
	componentDidMount() {
		const { availableDates, selectedDate, onSelectDate } = this.props
		const node = findDOMNode(this.refs.pikaday)
		this.picker = new Pikaday({
			field: node,
			bound: false,
			setDefaultDate: !!selectedDate,
			onSelect: date => {
				onSelectDate(formatDate(date))
			},
			disableDayFn: date => {
				!availableDates.includes(formatDate(date))
			}
		})

		this.updatePicker()
	}
	render() {
		return (
			<div className="datepicker">
				<div ref="pikaday"></div>
			</div>
		)
	}
}

export default Datepicker