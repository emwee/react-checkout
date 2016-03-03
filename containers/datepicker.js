import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectDate } from '../actions'
import { getAvailableDates } from '../reducers/available_dates'
import ReactDOM from 'react-dom'
import Pikaday from 'pikaday'
import moment from 'moment'

require('pikaday/css/pikaday.css')

class DateButton extends Component {
	constructor() {
		super()
	}
	render() {
		return (
			<div>
				<button
					onClick={this.props.selectDate}>
					{this.props.date}
				</button>
			</div>
		)
	}
}

class Datepicker extends Component {
	constructor() {
		console.log('??')
		super()
	}
	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps', nextProps)
	}
	componentDidUpdate() {
		console.log('componentDidUpdate', this)
		let { availableDates } = this.props
		console.log(this.picker)
		this.picker.setMinDate(new Date(availableDates[0]))
		this.picker.setMaxDate(new Date(availableDates[availableDates.length-1]))

	}
	componentDidMount() {
		console.log('componentDidMount', this)
		// let node = ReactDOM.findDOMNode(this.refs.datepicker)
		// this.picker = new Pikaday({
		// 	field: node,
		// 	bound: false,
		// 	defaultDate: new Date(availableDates[0]),
		// 	minDate: new Date(availableDates[0]),
		// 	maxDate: new Date(availableDates[availableDates.length-1]),
		// 	onSelect:(date) => console.log(date),
		// 	disableDayFn: (date) =>
		// 		!availableDates.includes(moment(date).format('YYYY-MM-DD'))
		// })
	}
	render() {
		console.log('Datepicker/render', this)

		const nodes = []

		this.props.availableDates.forEach(function(date) {
			console.log(date)
			nodes.push(<DateButton key={date} date={date} />)
		})

		return (
			<div>
				<div>{nodes}</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log('mapStateToProps.state', state)
	return {
		availableDates: getAvailableDates(state)
 	}
}

export default connect(
  mapStateToProps,
  { selectDate }
)(Datepicker)