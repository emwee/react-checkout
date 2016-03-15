import React, { Component, PropTypes } from 'react'

export default class SummaryTimeslot extends Component {
	render() {
		const { timeslot } = this.props
		if (!timeslot) {
			return <p>no timeslot selected</p>
		}
		return <p>{timeslot.timeslot}</p>
	}
}