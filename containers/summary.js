import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getSelectedTimeslot, getSelectedVariants, getTotalPrice } from '../reducers/order'
import SummaryDate from '../components/summary_date'
import SummaryTimeslot from '../components/summary_timeslot'
import { SummaryVariants, SummaryVariant } from '../components/summary_variant'
import SummaryTotalPrice from '../components/summary_total_price'

class SummaryContainer extends Component {
	renderTimeslot(selectedTimeslot) {
		const { hasTimeslots } = this.props
		return (hasTimeslots && <SummaryTimeslot timeslot={selectedTimeslot} />)
	}
	render() {
		const { selectedDate, selectedTimeslot, selectedVariants, totalPrice } = this.props
		return (
			<div className="order-summary">
				<h3 className="order-summary__heading">Order summary</h3>
				<SummaryDate date={selectedDate} />
				{this.renderTimeslot(selectedTimeslot)}
				<SummaryVariants>
					{selectedVariants.map(variant =>
						<SummaryVariant
							key={variant.id}
							{...variant} />
					)}
				</SummaryVariants>
				<SummaryTotalPrice totalPrice={totalPrice} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		hasTimeslots: state.hasTimeslots,
		selectedDate: state.order.selectedDate,
		selectedTimeslot: getSelectedTimeslot(state),
		selectedVariants: getSelectedVariants(state),
		totalPrice: getTotalPrice(state)
	}
}

export default connect(
	mapStateToProps,
	{}
)(SummaryContainer)
