import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

require('../css/variants.css')

class Variant extends Component {
	render() {
		const { id, title, price, num_tickets, disabled, onSelectVariant } = this.props
		const num_tickets_options = []
		const css_class = classNames('variant', {'variant--disabled': disabled })
		const onChange = (e) => {
			console.log('onChange')
			onSelectVariant(id, parseInt(e.target.value, 10))
		}

		for (let i=0; i<=num_tickets; i++) {
			num_tickets_options.push(
				<option key={i}>{i}</option>
			)
		}

		return (
			<div className={css_class}>
				<p>{title} (#{id}) ({price})</p>
				<select ref="selector" disabled={disabled} onChange={onChange.bind(this)}>
					{num_tickets_options}
				</select>
			</div>
		)
	}
}

class Variants extends Component {
	render() {
		const { variants, disabled, onSelectVariant } = this.props
		return (
			<div className="variants">
				{variants.map(variant => {
					return <Variant
						key={variant.id}
						onSelectVariant={onSelectVariant}
						disabled={disabled}
						{...variant} />
				})}
			</div>
		)
	}
}

export default Variants