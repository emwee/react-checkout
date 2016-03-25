import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getMaxBookable } from '../reducers'
import { hasTimeslots, getVariants } from '../reducers/variants'
import { isFetching, getTimeslots } from '../reducers/timeslots'
import { getTotalQuantity } from '../reducers/order'
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
		const { hasTimeslots, isFetching, didInvalidate, timeslots, selectedTimeslotId, selectTimeslot } = this.props

		if (!hasTimeslots) {
			return null
		}

		return <TimeslotItems isFetching={isFetching} didInvalidate={didInvalidate}>
			{timeslots.map(timeslot =>
				<TimeslotItem
					key={timeslot.id}
					{...timeslot}
					selected ={timeslot.id === selectedTimeslotId}
					onSelect={() => selectTimeslot(timeslot.id, timeslot.max_bookable)} />
			)}
		</TimeslotItems>
	}
	renderVariants() {
		const { variants, quantityByVariantId, totalQuantity, maxBookable, selectVariant } = this.props
		return <VariantItems totalQuantity={totalQuantity} maxBookable={maxBookable}>
			{variants.map(variant =>
				<VariantItem
					key={variant.id}
					{...variant}
					quantity={quantityByVariantId[variant.id] || 0}
					disabled={this.isVariantDisabled()}
					onSelectVariant={selectVariant} />
			)}
		</VariantItems>
	}
	render() {
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
		totalQuantity: getTotalQuantity(state),
		isFetching: state.timeslots.isFetching,
		didInvalidate: state.timeslots.didInvalidate,
		hasTimeslots: state.hasTimeslots,
		maxBookable: getMaxBookable(state)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectDate: (date) => {
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