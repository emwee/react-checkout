import React, { Component, PropTypes } from 'react'
import DayPicker from 'react-day-picker'
import { formatDate } from '../viewhelpers'
import SummaryDate from '../components/summary/date'
import SummaryTimeslot from '../components/summary/timeslot'
import SummaryVariants from '../components/summary/variants'
import SummaryVariant from '../components/summary/variant'
import SummaryTotalPrice from '../components/summary/total_price'

export class Summary extends Component {
	render() {
		const { selectedDate, hasTimeslots, selectedTimeslot, selectedVariants,
			subtotalPrice, bookingFee, totalPrice } = this.props
		return (
			<div className="order-summary">
				<h3 className="order-summary__heading">Order summary</h3>
				<SummaryDate date={selectedDate} />
				{ hasTimeslots && <SummaryTimeslot timeslot={selectedTimeslot} /> }
				<SummaryVariants>
					{selectedVariants.map(variant =>
						<SummaryVariant
							key={variant.id}
							{...variant}
						/>
					)}
				</SummaryVariants>
				<SummaryTotalPrice
					subtotalPrice={subtotalPrice}
					bookingFee={bookingFee}
					totalPrice={totalPrice}
				/>
			</div>
		)
	}
}
