import React from 'react'
import BaseField from './BaseField.js'

export default class PrimitiveField extends BaseField {
  constructor(props, options) {
    super(props, options)
  }

  render() {
    const Implementation = this.constructor.implementation

    const { onChange, ...implementationProps } = this.props
    implementationProps.parent = this

    return (
      <Implementation.Input
        {...implementationProps}
        onChange={this.changeValueDirectly}
        value={this.state.value}
      />
    )
  }
}