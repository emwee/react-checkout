import React, { PropTypes } from 'react'
import { formatPrice } from '../../helpers/viewhelpers'

const SummaryVariants = (props) => {
	const { selectedVariants } = props
	return (
		<div>
			{selectedVariants.map(variant => {
				const { id, title, quantity, price } = variant
				return (
					<div key={id}>
						{quantity > 0 &&
							<p>{quantity}x {title} {formatPrice(price)} {formatPrice(price * quantity)}</p>}
					</div>
				)
			})}
		</div>
	)
}

SummaryVariants.propTypes = {
	selectedVariants: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			price: PropTypes.number,
			quantity: PropTypes.number,
		})
	),
}

export default SummaryVariants
