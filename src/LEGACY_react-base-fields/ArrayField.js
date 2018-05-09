import React from 'react'
import BaseField from './BaseField.js'

let uniqueKeyCounter = 0

export default class ArrayField extends BaseField {
  static getDerivedStateFromProps(nextProps, prevState) {
    const stateChange = BaseField.getDerivedStateFromProps(nextProps, prevState)
    if (stateChange)
      stateChange.fields = ArrayField.generateFieldsForValue(stateChange.value)
    return stateChange
  }

  static generateFieldsForValue(value) {
    return value.map(() => ArrayField.getUniqueKey())
  }

  static getUniqueKey() {
    return uniqueKeyCounter++
  }

  constructor(props) {
    super(props, { defaultValue: [] })

    this.state.fields = ArrayField.generateFieldsForValue(this.state.value)

    this.renderChild = this.renderChild.bind(this)
    this.addField = this.addField.bind(this)
    this.removeField = this.removeField.bind(this)
    this.moveFieldUp = this.moveFieldUp.bind(this)
    this.moveFieldDown = this.moveFieldDown.bind(this)
  }

  changeValueDirectly(value) {
    this.setState(prevState => {
      if (prevState.value !== value) {
        this.handleValueChange(value)
        return { value, fields: ArrayField.generateFieldsForValue(value) }
      }
      else
        return null
    })
  }

  render() {
    const Implementation = this.constructor.implementation

    const { children, onChange, name, ...implementationProps } = this.props
    implementationProps.parent = this
    implementationProps.fieldCount = this.state.fields.length

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
        this.handleValueChange(value)
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
      const name = ArrayField.getUniqueKey()
      const value = prevState.value.slice()
      value.push(undefined)
      const fields = prevState.fields.slice()
      fields.push(name)
      this.handleValueChange(value)
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
        this.handleValueChange(value)
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
        this.handleValueChange(value)
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
        this.handleValueChange(value)
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
      fieldElement = children //React.cloneElement(children)

    const { children: ignored, onChange, ...implementationProps } =
      fieldElement.props
    implementationProps.parent = this

    return (
      <Implementation.ChildListItem
        {...implementationProps}
        key={name}
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
}