import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getMaxBookable } from '../reducers'
import { getVariants, isVariantDisabled } from '../reducers/variants'
import { isFetching, getTimeslots } from '../reducers/timeslots'
import { getTotalQuantity } from '../reducers/selection'
import { VariantItems, VariantItem } from '../components/variants'

class VariantsContainer extends Component {
	render() {
		const { variants, quantityByVariantId, totalQuantity, isVariantDisabled, maxBookable, selectVariant } = this.props
		return (
			<VariantItems totalQuantity={totalQuantity} maxBookable={maxBookable}>
			{variants.map(variant =>
				<VariantItem
					key={variant.id}
					{...variant}
					quantity={quantityByVariantId[variant.id] || 0}
					disabled={isVariantDisabled}
					selectVariant={selectVariant} />
			)}
		</VariantItems>
		)
	}
}

function mapStateToProps(state) {
	return {
		quantityByVariantId: state.selection.quantityByVariantId,
		variants: getVariants(state.variants),
		totalQuantity: getTotalQuantity(state.selection),
		isFetching: state.timeslots.isFetching,
		hasTimeslots: state.hasTimeslots,
		maxBookable: getMaxBookable(state),
		isVariantDisabled: isVariantDisabled(state)
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