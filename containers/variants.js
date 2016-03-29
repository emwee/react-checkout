import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getMaxBookable } from '../reducers'
import { hasTimeslots, getVariants } from '../reducers/variants'
import { isFetching, getTimeslots } from '../reducers/timeslots'
import { getTotalQuantity } from '../reducers/selection'
import { VariantItems, VariantItem } from '../components/variants'

class VariantsContainer extends Component {
	isVariantDisabled() {
		const { selectedDate, selectedTimeslotId, hasTimeslots } = this.props

		if (!hasTimeslots) {
			return !selectedDate
		}

		return !selectedDate || !selectedTimeslotId
	}
	render() {
		const { variants, quantityByVariantId, totalQuantity, maxBookable, selectVariant } = this.props
		return (
			<VariantItems totalQuantity={totalQuantity} maxBookable={maxBookable}>
			{variants.map(variant =>
				<VariantItem
					key={variant.id}
					{...variant}
					quantity={quantityByVariantId[variant.id] || 0}
					disabled={this.isVariantDisabled()}
					onSelectVariant={selectVariant} />
			)}
		</VariantItems>
		)
	}
}

function mapStateToProps(state) {
	return {
		selectedDate: state.selection.selectedDate,
		selectedTimeslotId: state.selection.selectedTimeslotId,
		quantityByVariantId: state.selection.quantityByVariantId,
		variants: getVariants(state.variants),
		totalQuantity: getTotalQuantity(state.selection),
		isFetching: state.timeslots.isFetching,
		hasTimeslots: state.hasTimeslots,
		maxBookable: getMaxBookable(state)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		selectVariant: (variantId, quantity) => {
			dispatch(actions.selectVariant(variantId, quantity))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VariantsContainer)