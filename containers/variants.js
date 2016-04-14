import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getMaxBookable } from '../reducers/product'
import { getVariants, isVariantDisabled } from '../reducers/variants'
import { getTotalQuantity } from '../reducers/selection'
import { Variants } from '../components/form/variants'
import { Variant } from '../components/form/variant'

class VariantsContainer extends Component {
	render() {
		const { variants, quantityByVariantId, totalQuantity, isDisabled, maxBookable,
			selectVariant } = this.props
		return (
			<Variants totalQuantity={totalQuantity} maxBookable={maxBookable}>
			{variants.map(variant =>
				<Variant key = {variant.id}
					{...variant}
					quantity = {quantityByVariantId[variant.id] || 0}
					disabled = {isDisabled(variant.id)}
					selectVariant = {selectVariant}
				/>
			)}
		</Variants>
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
		},
	}
}

VariantsContainer.propTypes = {
	quantityByVariantId: React.PropTypes.object,
	variants: React.PropTypes.array,
	totalQuantity: React.PropTypes.number,
	isDisabled: React.PropTypes.func,
	maxBookable: React.PropTypes.number,
	selectVariant: React.PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VariantsContainer)
