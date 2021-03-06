import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getMaxBookable } from '../reducers'
import { getVariants, isVariantDisabled } from '../reducers/variants'
import { getTotalQuantity, areVariantsValid } from '../reducers/selection'
import Variants from '../components/form/variants'
// import { Variant } from '../components/form/variant'
import { VariantStepper } from '../components/form/variant_stepper'

const VariantsContainer = (props) => {
	const { isFetching, didInvalidate, totalQuantity, isValid, maxBookable,
		variants, quantityByVariantId, isDisabled, selectVariant } = props
	return (
		<Variants
			isFetching={isFetching}
			didInvalidate={didInvalidate}
			totalQuantity={totalQuantity}
			maxBookable={maxBookable}
			isValid={isValid}
		>
		{variants.map(variant =>
			<VariantStepper
				key={variant.id}
				{...variant}
				quantity={quantityByVariantId[variant.id] || 0}
				disabled={isDisabled(variant.id)}
				maxBookable={maxBookable}
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
		isValid: areVariantsValid(state),
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
	isValid: PropTypes.bool,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VariantsContainer)
