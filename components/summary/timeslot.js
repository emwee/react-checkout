import React, { Component, PropTypes } from 'react'

const SummaryTimeslot = (props) => {
	const { timeslot } = props
	if (!timeslot) {
		return <p>no timeslot selected</p>
	}
	return <p>{timeslot.timeslot}</p>
}

SummaryTimeslot.propTypes = {
	timeslot: PropTypes.object,
}

export default SummaryTimeslot
