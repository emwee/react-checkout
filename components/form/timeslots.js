import React, { Component, PropTypes } from 'react'

require('../../css/timeslots.css')

export class Timeslots extends Component {
	render() {
		const { isFetching, didInvalidate, children } = this.props
		return (
				<div className="timeslots">
					{isFetching && <p>fetching timeslots...</p>}
					{didInvalidate && <p>fetching timeslots failed...</p>}
					{!children.length && !didInvalidate && <p>no timeslots fetched yet..</p>}
					{children}
				</div>
		)
	}
}

Timeslots.propTypes = {
	isFetching: PropTypes.bool,
	didInvalidate: PropTypes.bool,
	children: PropTypes.array,
}