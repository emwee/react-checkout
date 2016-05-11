import React, { PropTypes } from 'react'

const ActionBar = (props) => {
	const { activeStepIndex, goToPersonalDetails, submitCustomerForm } = props
	return (
		<div className="action-bar">
			{activeStepIndex === 0 &&
				<button onClick={goToPersonalDetails}>Go to personal details</button>}
			{activeStepIndex === 1 &&
				<button onClick={submitCustomerForm}>Submit order</button>}
		</div>
	)
}

ActionBar.propTypes = {
	activeStepIndex: PropTypes.number,
	goToPersonalDetails: PropTypes.func,
	submitCustomerForm: PropTypes.func,
}

export default ActionBar
