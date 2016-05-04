import React, { Component, PropTypes } from 'react'

export class ActionBar extends Component {
	render() {
		const { showPersonalDetails, bookingDetailsCompleted } = this.props
		return (
			<div className="action-bar">
				{!bookingDetailsCompleted && <button onClick={showPersonalDetails}>Go to personal details</button>}
				{bookingDetailsCompleted && <button>Submit order</button>}
			</div>
		)
	}
}

ActionBar.propTypes = {
	bookingDetailsCompleted: PropTypes.bool,
	showPersonalDetails: PropTypes.func,
}

export default ActionBar
