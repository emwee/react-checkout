import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { ActionBar } from '../components/form/action_bar'
import { bookingDetailsCompleted } from '../reducers'

class ActionBarContainer extends Component {
	render() {
		const { bookingDetailsCompleted } = this.props
		return (
			<ActionBar
				bookingDetailsCompleted={bookingDetailsCompleted}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {
		bookingDetailsCompleted: bookingDetailsCompleted(state),
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}

ActionBarContainer.propTypes = {
	bookingDetailsCompleted: React.PropTypes.bool,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActionBarContainer)
