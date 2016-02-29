import React from 'react'

require("./variants.css");

class Variant extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="variant">
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                <p>{this.props.price}</p>
            </div>
        )
    }
}

class Variants extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="variants">
                {this.props.variants.map(function(variant, i) {
                    return <Variant key={i}
                        {...variant}
                        {...self.props} />
                })}
            </div>
        )
    }
}

export default Variants