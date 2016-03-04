import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { formatPrice } from '../viewhelpers'

require('../css/variants.css')

class Variant extends Component {
	render() {
		const { id, title, price, num_tickets, num_selected, disabled, onSelectVariant } = this.props
		const num_tickets_options = []
		const css_class = classNames('variant', {'variant--disabled': disabled })
		const onChange = (e) => {
			onSelectVariant(id, parseInt(e.target.value, 10))
		}

		let subtotal_node = null

		if (num_selected) {
			subtotal_node = <span>{formatPrice(num_selected * price)}</span>
		}

		for (let i=0; i<=num_tickets; i++) {
			num_tickets_options.push(
				<option key={i} value={i}>{i}</option>
			)
		}

		return (
			<div className={css_class}>
				<p>{title} (#{id}) ({formatPrice(price)}) {subtotal_node}</p>
				<select ref="selector" disabled={disabled} value={num_selected || 0} onChange={onChange.bind(this)}>
					{num_tickets_options}
				</select>
			</div>
		)
	}
}

class Variants extends Component {
	render() {
		const { variants, disabled, quantity_variants, onSelectVariant } = this.props
		return (
			<div className="variants">
				{variants.map(variant => {
					return <Variant
						key={variant.id}
						num_selected={quantity_variants[variant.id]}
						onSelectVariant={onSelectVariant}
						disabled={disabled}
						{...variant} />
				})}
			</div>
		)
	}
}

export default Variants