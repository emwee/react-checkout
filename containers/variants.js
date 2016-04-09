import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getMaxBookable } from '../reducers/product'
import { getVariants, isVariantDisabled } from '../reducers/variants'
import { getTotalQuantity } from '../reducers/selection'
import { VariantItems, VariantItem } from '../components/form/variants'

class VariantsContainer extends Component {
	render() {
		const { variants, quantityByVariantId, totalQuantity, isDisabled, maxBookable, selectVariant } = this.props
		return (
			<VariantItems totalQuantity={totalQuantity} maxBookable={maxBookable}>
			{variants.map(variant =>
				<VariantItem
					key={variant.id}
					{...variant}
					quantity={quantityByVariantId[variant.id] || 0}
					disabled={isDisabled(variant.id)}
					selectVariant={selectVariant} />
			)}
		</VariantItems>
		)
	}
}

function mapStateToProps(state) {
	return {
		quantityByVariantId: state.selection.quantityByVariantId,
		variants: getVariants(state.entities.variants),
		totalQuantity: getTotalQuantity(state),
		isDisabled: (variantId) => isVariantDisabled(state, variantId),
		maxBookable: getMaxBookable(state),
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