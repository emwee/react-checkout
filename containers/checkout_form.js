import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectDate, selectTimeslot, addVariant } from '../actions'
import { getVariants } from '../reducers/variants'
import { getTimeslots } from '../reducers/timeslots'
import Datepicker from '../components/datepicker'
import { TimeslotItems, TimeslotItem } from '../components/timeslots'
import { VariantItems, VariantItem } from '../components/variants'

class CheckoutForm extends Component {
	render() {
		console.log('CheckoutForm.render', this);
		const {
			availableDates,
			selectedDate,
			selectDate,
			variants,
			addVariant,
			timeslots,
			selectTimeslot,
			quantityByVariantId
		} = this.props

		console.log('variants', variants);
		console.log('timeslots', timeslots);

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
							{...timeslot}
							onSelect={() => selectTimeslot(timeslot.id)} />
					)}
				</TimeslotItems>
				<VariantItems>
					{variants.map(variant =>
						<VariantItem
							key={variant.id}
							quantity={quantityByVariantId[variant.id]}
							{...variant}
							onSelectVariant={addVariant} />
					)}
				</VariantItems>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		availableDates: state.availableDates,
		selectedDate: state.selectedDate,
		quantityByVariantId: state.order.quantityByVariantId,
		variants: getVariants(state.variants),
		timeslots: getTimeslots(state.timeslots)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectDate: (date) => {
			dispatch(selectDate(date))
		},
		selectTimeslot: (timeslotId) => {
			dispatch(selectTimeslot(timeslotId))
		},
		addVariant: (variantId, quantity) => {
			dispatch(addVariant(variantId, quantity))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CheckoutForm)