import React, { PropTypes } from 'react'
import AlertField from './alert'

import '../../css/timeslots.css'

class Timeslots extends React.Component {
	render() {
		const { isFetching, didInvalidate, isValid, children, isValidated } = this.props
		return (
			<div className="timeslots" ref="timeslots">
				{isFetching && <p>fetching timeslots...</p>}
				{didInvalidate && <p>fetching timeslots failed...</p>}
				{!children.length && !didInvalidate && <p>no timeslots fetched yet..</p>}
				{children}
				{isValidated && !isValid && <p>choose a timeslot!</p>}
			</div>
		)
	}
}

Timeslots.propTypes = {
	isFetching: PropTypes.bool,
	didInvalidate: PropTypes.bool,
	isValid: PropTypes.bool,
	isValidated: PropTypes.bool,
	children: PropTypes.array,
}

export default new AlertField('timeslots', Timeslots)
