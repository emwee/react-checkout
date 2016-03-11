import React, { Component, PropTypes } from 'react'

export class VariantItems extends Component {
  render() {
    return (
        <div>{this.props.children}</div>
    )
  }
}
export class VariantItem extends Component {
  render() {
  	console.log('VariantItem.render')
  	console.log(this)
  	const { title } = this.props
    return (
        <div>
        	<p>{ title }</p>
        </div>
    )
  }
}