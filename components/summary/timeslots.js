import React, { PropTypes } from 'react'

const SummaryTimeslots = (props) => {
	const { hasTimeslots, selectedTimeslot } = props
	return (
		<div>
			{hasTimeslots && !selectedTimeslot && <p>no timeslot selected</p>}
			{hasTimeslots && selectedTimeslot && <p>{selectedTimeslot.timeslot}</p>}
		</div>
	)
}

SummaryTimeslots.propTypes = {
	hasTimeslots: PropTypes.bool,
	selectedTimeslot: PropTypes.string,
}

export default SummaryTimeslots
