import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import CheckoutSteps from '../components/form/checkout_steps'
import CheckoutStep from '../components/form/checkout_step'

const CheckoutStepsContainer = (props) => {
	const { steps, activeStepIndex, goToStep } = props
	return (
		<CheckoutSteps>
		{steps.map((step, index) =>
			<CheckoutStep
				key={index}
				index={index}
				active={index === activeStepIndex}
				onClick={() => { goToStep(index) }}
				{...step}
			/>
		)}
		</CheckoutSteps>
	)
}

function mapStateToProps(state) {
	return {
		steps: state.steps,
		activeStepIndex: state.selection.activeStepIndex,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		goToStep: (index) => {
			dispatch(actions.goToStep(index))
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
	goToStep: PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CheckoutStepsContainer)
