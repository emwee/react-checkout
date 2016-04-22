import React, { Component, PropTypes } from 'react'
import { formatDate } from '../../viewhelpers'

const SummaryDate = (props) => {
	const { date } = props
	if (!date) {
		return <p>no date selected</p>
	}
	return <p>{formatDate(date, 'LLLL')}</p>
}

SummaryDate.propTypes = {
	date: PropTypes.string,
}

export default SummaryDate
