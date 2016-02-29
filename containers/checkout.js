import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Datepicker from '../components/datepicker'
import * as CheckoutActions from '../actions'

class CheckoutForm extends Component {
	// constructor() {
	// 	super()
	// 	this.props = {}
	// }
	render() {
		console.log('CheckoutForm.render', this.props)
		const { available_dates } = this.props
		console.log('available_dates', available_dates)
		console.log('this.props', this.props)
		return (
			<div>
				<Datepicker available_dates={available_dates} />
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    available_dates: state.availableDates
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CheckoutActions, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutForm)

// export default CheckoutForm