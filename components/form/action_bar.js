import React, { Component, PropTypes } from 'react'

export class ActionBar extends Component {
	render() {
		const { bookingDetailsCompleted } = this.props
		return (
			<div className="action-bar">
				{!bookingDetailsCompleted && <button>Go to personal details</button>}
				{bookingDetailsCompleted && <button>Submit order</button>}
			</div>
		)
	}
}

ActionBar.propTypes = {
	bookingDetailsCompleted: PropTypes.bool,
}

export default ActionBar
