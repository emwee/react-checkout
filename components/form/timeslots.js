import React, { PropTypes } from 'react'

require('../../css/timeslots.css')

const Timeslots = (props) => {
	const { isFetching, didInvalidate, isFieldAlerted, children } = props
	return (
		<div className="timeslots">
			{isFetching && <p>fetching timeslots...</p>}
			{didInvalidate && <p>fetching timeslots failed...</p>}
			{!children.length && !didInvalidate && <p>no timeslots fetched yet..</p>}
			{children}
			{isFieldAlerted && <p>choose a timeslot!</p>}
		</div>
	)
}

Timeslots.propTypes = {
	isFetching: PropTypes.bool,
	didInvalidate: PropTypes.bool,
	isFieldAlerted: PropTypes.bool,
	children: PropTypes.array,
}

export default Timeslots
