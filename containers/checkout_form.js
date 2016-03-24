import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { hasTimeslots, getVariants } from '../reducers/variants'
import { isFetching, getTimeslots } from '../reducers/timeslots'
import Datepicker from '../components/datepicker'
import { TimeslotItems, TimeslotItem } from '../components/timeslots'
import { VariantItems, VariantItem } from '../components/variants'

class CheckoutForm extends Component {
	isVariantDisabled() {
		const { selectedDate, selectedTimeslotId, hasTimeslots } = this.props

		if (!hasTimeslots) {
			return !selectedDate
		}

		return !selectedDate || !selectedTimeslotId
	}
	renderDatepicker() {
		const { availableDates, selectedDate, selectDate } = this.props

		return <Datepicker
			availableDates={availableDates}
			selectedDate={selectedDate}
			onSelectDate={selectDate} />
	}
	renderTimeslots() {
		const { hasTimeslots, isFetching, timeslots, selectedTimeslotId, selectTimeslot } = this.props

		if (!hasTimeslots) {
			return null
		}

		return <TimeslotItems isFetching={isFetching}>
			{timeslots.map(timeslot =>
				<TimeslotItem
					key={timeslot.id}
					selected ={timeslot.id === selectedTimeslotId}
					{...timeslot}
					onSelect={() => selectTimeslot(timeslot.id)} />
			)}
		</TimeslotItems>
	}
	renderVariants() {
		const { variants, quantityByVariantId, selectVariant } = this.props
		return <VariantItems>
			{variants.map(variant =>
				<VariantItem
					key={variant.id}
					quantity={quantityByVariantId[variant.id] || 0}
					disabled={this.isVariantDisabled()}
					{...variant}
					onSelectVariant={selectVariant} />
			)}
		</VariantItems>
	}
	render() {
		console.log('CheckoutForm.render', this);
		return (
			<div className="checkout-form">
				{ this.renderDatepicker() }
				{ this.renderTimeslots() }
				{ this.renderVariants() }
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
		timeslots: getTimeslots(state.timeslots),
		isFetching: state.timeslots.isFetching,
		hasTimeslots: state.hasTimeslots
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectDate: (date) => {
			console.log('selectDate')
			dispatch(actions.selectDate(date))
			dispatch(actions.shouldFetchTimeslots(date))
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