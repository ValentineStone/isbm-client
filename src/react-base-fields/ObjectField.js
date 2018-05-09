import React from 'react'
import BaseField, { getNextChangeNumber } from './BaseField'

export default class ObjectField extends BaseField {

  constructor(props) {
    super(props, { defaultValue: {} })
    this.renderChild = this.renderChild.bind(this)
  }

  render() {
    const Implemetation = this.constructor.implementation

    const { children, onChange, name, ...implementationProps } = this.props
    implementationProps.parent = this

    let fieldElements = children
    if (typeof children === 'function')
      fieldElements = children(this)
    return (
      <Implemetation.ChildList {...implementationProps}>
        {
          React.Children.count(fieldElements)
            ? React.Children.toArray(fieldElements).map(this.renderChild)
            : <Implemetation.EmptyChildListItem {...implementationProps} />
        }
      </Implemetation.ChildList>
    )
  }

  onChildChange(_value, name, purge) {
    this.setState(prevState => {
      const value = { ...prevState.value }
      if (purge && _value === undefined)
        delete value[name]
      else
        value[name] = _value
      return { value, changeNumber: getNextChangeNumber() }
    })
  }

  notifyOfChildDefaultValue(value, name) {
    // UNSAFE MUTATIONS
    this.state.value[name] = value

    // SAFE IMMUTABILITY
    // this.onChildChange(_value, name)
  }

  renderChild(childElement, index, array) {
    const Implemetation = this.constructor.implementation

    const { children, onChange, ...implementationProps } = childElement.props
    implementationProps.parent = this

    return (
      <Implemetation.ChildListItem
        key={index}
        index={index}
        isLast={index === array.length - 1}
        isFirst={index === 0}
        {...implementationProps}
      >
        {childElement}
      </Implemetation.ChildListItem>
    )
  }
  getChildFieldValue(name) {
    return this.state.value[name]
  }
}