import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getVariants } from '../reducers/variants'
import { getTimeslots } from '../reducers/timeslots'
import Datepicker from '../components/datepicker'
import { TimeslotItems, TimeslotItem } from '../components/timeslots'
import { VariantItems, VariantItem } from '../components/variants'

require('../css/order_summary.css')

class CheckoutForm extends Component {
	render() {
		console.log('CheckoutForm.render', this);
		const {
			selectedDate,
			selectedTimeslotId,
			availableDates,
			timeslots,
			variants,
			quantityByVariantId,
			selectDate,
			selectTimeslot,
			selectVariant
		} = this.props

		return (
			<div>
				<Datepicker
					availableDates={availableDates}
					selectedDate={selectedDate}
					onSelectDate={selectDate} />
				<TimeslotItems>
					{timeslots.map(timeslot =>
						<TimeslotItem
							key={timeslot.id}
							selected ={timeslot.id === selectedTimeslotId}
							{...timeslot}
							onSelect={() => selectTimeslot(timeslot.id)} />
					)}
				</TimeslotItems>
				<VariantItems>
					{variants.map(variant =>
						<VariantItem
							key={variant.id}
							quantity={quantityByVariantId[variant.id] || 0}
							{...variant}
							onSelectVariant={selectVariant} />
					)}
				</VariantItems>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		availableDates: state.availableDates,
		selectedDate: state.order.selectedDate,
		selectedTimeslotId: state.order.selectedTimeslotId,
		quantityByVariantId: state.order.quantityByVariantId,
		variants: getVariants(state.variants),
		timeslots: getTimeslots(state.timeslots)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectDate: (date) => {
			dispatch(actions.selectDate(date))
			dispatch(actions.fetchTimeslots(date))
		},
		selectTimeslot: (timeslotId) => {
			dispatch(actions.selectTimeslot(timeslotId))
		},
		selectVariant: (variantId, quantity) => {
			dispatch(actions.selectVariant(variantId, quantity))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CheckoutForm)