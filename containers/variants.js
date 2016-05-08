import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getMaxBookable } from '../reducers'
import { getVariants, isVariantDisabled } from '../reducers/variants'
import { getTotalQuantity } from '../reducers/selection'
import Variants from '../components/form/variants'
import { Variant } from '../components/form/variant'

const VariantsContainer = (props) => {
	const { isFetching, didInvalidate, variants, quantityByVariantId, totalQuantity, isDisabled,
		maxBookable, selectVariant } = props
	return (
		<Variants
			isFetching={isFetching}
			didInvalidate={didInvalidate}
			totalQuantity={totalQuantity}
			maxBookable={maxBookable}
		>
		{variants.map(variant =>
			<Variant
				key={variant.id}
				{...variant}
				quantity={quantityByVariantId[variant.id] || 0}
				disabled={isDisabled(variant.id)}
				selectVariant={selectVariant}
			/>
		)}
	</Variants>
	)
}

function mapStateToProps(state) {
	return {
		quantityByVariantId: state.selection.quantityByVariantId,
		variants: getVariants(state.variants),
		isFetching: state.variants.isFetching,
		didInvalidate: state.variants.didInvalidate,
		totalQuantity: getTotalQuantity(state),
		maxBookable: getMaxBookable(state),
		isDisabled: (variantId) => isVariantDisabled(state, variantId),
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
	isFetching: PropTypes.bool,
	didInvalidate: PropTypes.bool,
	quantityByVariantId: PropTypes.object,
	variants: PropTypes.array,
	totalQuantity: PropTypes.number,
	isDisabled: PropTypes.func,
	maxBookable: PropTypes.number,
	selectVariant: PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VariantsContainer)
