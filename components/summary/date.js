import React, { Component, PropTypes } from 'react'
import { formatDate } from '../../viewhelpers'

export default class SummaryDate extends Component {
	render() {
		const { date } = this.props
		if (!date) {
			return <p>no date selected</p>
		}
		return <p>{formatDate(date, 'LLLL')}</p>
	}
}