import React from 'react'
import BaseField from './BaseField.js'

export default class ArrayField extends BaseField {
  constructor(props) {
    super(props, { defaultValue: [] })

    this.keyCounter = 0
    this.state.fields = this.state.value.map(() => this.getUniqueKey())

    this.renderChild = this.renderChild.bind(this)
    this.addField = this.addField.bind(this)
    this.removeField = this.removeField.bind(this)
    this.moveFieldUp = this.moveFieldUp.bind(this)
    this.moveFieldDown = this.moveFieldDown.bind(this)
  }

  render() {
    const Implementation = this.constructor.implementation

    const { children, onChange, name, ...implementationProps } = this.props
    implementationProps.parent = this

    return (
      <Implementation.ChildList {...implementationProps}>
        {
          this.state.fields.length
            ? this.state.fields.map(this.renderChild)
            : <Implementation.EmptyChildListItem {...implementationProps} />
        }
      </Implementation.ChildList>
    )
  }

  onChildChange(_value, name) {
    this.setState(prevState => {
      const index = prevState.fields.indexOf(name)
      if (index >= 0) {
        const value = prevState.value.slice()
        value.splice(index, 1, _value)
        return { value }
      }
      else
        return null
    })
  }

  notifyOfChildDefaultValue(_value, name) {
    // UNSAFE MUTATIONS
    const index = this.state.fields.indexOf(name)
    if (index >= 0) {
      this.state.value[index] = _value
    }

    // SAFE IMMUTABILITY
    // this.onChildChange(_value, name)
  }

  addField() {
    this.setState(prevState => {
      const name = this.getUniqueKey()
      const value = prevState.value.slice()
      value.push(undefined)
      const fields = prevState.fields.slice()
      fields.push(name)
      return { fields, value }
    })
  }

  moveFieldUp(name) {
    this.setState(prevState => {
      const index = prevState.fields.indexOf(name)
      if (
        prevState.fields.length > 1
        && index > 0
      ) {
        const fields = prevState.fields.slice()
        fields[index] = prevState.fields[index - 1]
        fields[index - 1] = prevState.fields[index]
        const value = prevState.value.slice()
        value[index] = prevState.value[index - 1]
        value[index - 1] = prevState.value[index]
        return { fields, value }
      }
      else
        return null
    })
  }

  moveFieldDown(name) {
    this.setState(prevState => {
      const index = prevState.fields.indexOf(name)
      if (
        prevState.fields.length > 1
        && index >= 0
        && index < prevState.fields.length - 1
      ) {
        const fields = prevState.fields.slice()
        fields[index] = prevState.fields[index + 1]
        fields[index + 1] = prevState.fields[index]
        const value = prevState.value.slice()
        value[index] = prevState.value[index + 1]
        value[index + 1] = prevState.value[index]
        return { fields, value }
      }
      else
        return null
    })
  }

  removeField(name) {
    this.setState(prevState => {
      const index = prevState.fields.indexOf(name)
      if (index >= 0) {
        const value = prevState.value.slice()
        value.splice(index, 1)
        const fields = prevState.fields.slice()
        fields.splice(index, 1)
        return { fields, value }
      }
      else
        return null
    })
  }

  renderChild(name, index, array) {
    const Implementation = this.constructor.implementation

    const children = this.props.children
    let fieldElement
    if (typeof children === 'function')
      fieldElement = children(name, this)
    else
      fieldElement =
        React.cloneElement(children, { name: index, parent: this })

    const { children: ignored, onChange, ...implementationProps } =
      fieldElement.props
    implementationProps.parent = this

    return (
      <Implementation.ChildListItem
        {...implementationProps}
        key={String(name)}
        name={name}
        index={index}
        isLast={index === array.length - 1}
        isFirst={index === 0}
      >
        {fieldElement}
      </Implementation.ChildListItem>
    )
  }

  getChildFieldValue(name) {
    return this.state.value[this.state.fields.indexOf(name)]
  }

  getUniqueKey() {
    return this.keyCounter++
  }
}