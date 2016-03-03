import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Datepicker from '../containers/datepicker'
import Variants from '../components/variants'
import * as CheckoutActions from '../actions'

class CheckoutApp extends Component {
	render() {
		// console.log('CheckoutApp.render', this.props)
		// const { availableDates, variants } = this.props
		return (
			<div>
				<Datepicker />
			</div>
		)
	}
}

// function mapStateToProps(state) {
//   return {
//     availableDates: state.availableDates,
//     variants: state.variants
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(CheckoutActions, dispatch)
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CheckoutApp)