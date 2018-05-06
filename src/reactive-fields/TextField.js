import React from 'react'
import PrimitiveField from './base/PrimitiveField.js'
import parentContext from './parentContext.js'

class TextField extends PrimitiveField {
  constructor(props) {
    super(props, { defaultValue: props.type === 'number' ? NaN : '' })
  }
}

const implementation = {}
implementation.Input = props => {
  const type = props.type || 'text'
  if (type === 'textarea')
    return (
      <textarea
        onChange={e => props.onChange(e.target.value)}
      />
    )
  else
    return (
      <input
        type={type}
        onChange={e => props.onChange(
          type === 'number'
            ? Number(e.target.value)
            : e.target.value
        )}
      />
    )
}
implementation.Input.displayName =
  'ObjectFieldImplementation.Input'

TextField.implementation = implementation

export default parentContext.contextify({
  consumer: true
})(TextField)