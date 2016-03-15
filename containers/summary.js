import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAddedVariants, getTotalPrice } from '../reducers/order'
import SummaryVariantRow from '../components/summary_variant'

class SummaryContainer extends Component {
	renderDate() {
		const { selectedDate } = this.props
		if (!selectedDate) {
			return <p>no date selected</p>
		}
		return <p>{selectedDate}</p>
	}
	renderVariants() {
		const { addedVariants } = this.props
		if (!addedVariants.length) {
			return <p>no variants selected</p>
		}

		return addedVariants.map((variant) => {
			return <SummaryVariantRow key={variant.id} {...variant} />
		})
	}
	renderTotalPrice() {
		const { addedVariants, totalPrice } = this.props
		if (addedVariants.length) {
			<p>{ totalPrice }</p>
		}
	}
	render() {
		console.log('SummaryContainer.render', this);
		return (
			<div className="order-summary">
				{this.renderDate()}
				{this.renderVariants()}
				{this.renderTotalPrice()}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		selectedDate: state.order.selectedDate,
		addedVariants: getAddedVariants(state),
		totalPrice: getTotalPrice(state)
	}
}

export default connect(
	mapStateToProps,
	{}
)(SummaryContainer)
