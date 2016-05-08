import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import ActionBar from '../components/form/action_bar'

const ActionBarContainer = (props) =>
	<ActionBar {...props} />

function mapStateToProps(state) {
	return {
		activeStepIndex: state.selection.activeStepIndex,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		goToPersonalDetails: () => dispatch(actions.goToPersonalDetails()),
	}
}

ActionBarContainer.propTypes = {
	activeStepIndex: PropTypes.number,
	goToPersonalDetails: PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActionBarContainer)
