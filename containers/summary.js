import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getSelectedTimeslot, getSelectedVariants, getTotalPrice } from '../reducers/selection'
import SummaryDate from '../components/summary/date'
import SummaryTimeslot from '../components/summary/timeslot'
import { SummaryVariants, SummaryVariant } from '../components/summary/variant'
import SummaryTotalPrice from '../components/summary/total_price'

class SummaryContainer extends Component {
	render() {
		const { selectedDate, hasTimeslots, selectedTimeslot, selectedVariants, totalPrice } = this.props
		return (
			<div className="order-summary">
				<h3 className="order-summary__heading">Order summary</h3>
				<SummaryDate date={selectedDate} />
				{ hasTimeslots && <SummaryTimeslot timeslot={selectedTimeslot} /> }
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
		selectedDate: state.selection.selectedDate,
		selectedTimeslot: getSelectedTimeslot(state),
		selectedVariants: getSelectedVariants(state),
		totalPrice: getTotalPrice(state)
	}
}

export default connect(
	mapStateToProps
)(SummaryContainer)
