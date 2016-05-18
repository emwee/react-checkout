import React, { Component, PropTypes } from 'react'

class CouponForm extends Component {
	constructor(props) {
		super(props)
		this.toggleInput = this.toggleInput.bind(this)
		this.handleCheckcouponCode = this.handleCheckcouponCode.bind(this)
		this.state = {
			inputExpanded: false,
		}
	}
	toggleInput() {
		this.setState({ inputExpanded: !this.state.inputExpanded })
	}
	handleCheckcouponCode() {
		this.props.checkcouponCode(this.refs.couponCode.value)
	}
	renderInput() {
		return (
			<div>
				<input type="text" ref="couponCode" />
				<button onClick={this.handleCheckcouponCode}>Apply</button>
			</div>
		)
	}
	render() {
		return (
			<div>
				<p>coupon form</p>
				<p onClick={this.toggleInput}>I have a discount code</p>
				{this.state.inputExpanded && this.renderInput() }
			</div>
		)
	}
}

CouponForm.propTypes = {
	checkcouponCode: PropTypes.func,
}

export default CouponForm
