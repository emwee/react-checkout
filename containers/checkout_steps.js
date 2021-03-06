import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import CheckoutSteps from '../components/form/checkout_steps'
import CheckoutStep from '../components/form/checkout_step'

const CheckoutStepsContainer = (props) => {
	const { steps, activeStepIndex, goToStepIfValid } = props
	return (
		<CheckoutSteps>
		{steps.map((step, index) =>
			<CheckoutStep
				key={index}
				index={index}
				active={index === activeStepIndex}
				onClick={() => { goToStepIfValid(index) }}
				{...step}
			/>
		)}
		</CheckoutSteps>
	)
}

function mapStateToProps(state) {
	return {
		steps: [{
			title: 'Booking Details',
		}, {
			title: 'Personal Details',
		}, {
			title: 'Payment',
		}, {
			title: 'Confirmation',
		}],
		activeStepIndex: state.selection.activeStepIndex,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		goToStepIfValid: (index) => {
			dispatch(actions.goToStepIfValid(index))
		},
	}
}

CheckoutStepsContainer.propTypes = {
	activeStepIndex: PropTypes.number,
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
		})
	),
	goToStepIfValid: PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CheckoutStepsContainer)
