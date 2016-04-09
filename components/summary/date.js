import React, { Component, PropTypes } from 'react'

export default class SummaryDate extends Component {
	render() {
		const { date } = this.props
		if (!date) {
			return <p>no date selected</p>
		}
		return <p>{date.toLocaleString()}</p>
	}
}