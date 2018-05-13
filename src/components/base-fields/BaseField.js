import React from 'react'

let changeNumberCounter = 0

export const getNextChangeNumber = () => changeNumberCounter++

export default class BaseField extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.parent) {
      const value = nextProps.parent.getChildFieldValue(nextProps.name)
      const parentChangeNumber = nextProps.parent.state.changeNumber
      if (
        parentChangeNumber > prevState.changeNumber
        && value !== undefined
        && value !== prevState.value
      )
        return { value }
      else
        return null
    }
    else
      return null
  }

  constructor(props, options) {
    super(props)

    let derivedDefault
    if (props.parent)
      derivedDefault = props.parent.getChildFieldValue(props.name)
    if (derivedDefault === undefined) {
      this.state = { value: this.props.default || options.defaultValue }
      if (props.parent)
        props.parent.notifyOfChildDefaultValue(this.state.value, props.name)
    }
    else
      this.state = { value: derivedDefault }

    this.state.changeNumber = getNextChangeNumber()

    this.handleValueChange = this.handleValueChange.bind(this)
    this.changeValueDirectly = this.changeValueDirectly.bind(this)
  }

  handleValueChange(value = this.state.value) {
    if (this.props.parent)
      this.props.parent.onChildChange(value, this.props.name)
    if (this.props.onChange)
      this.props.onChange(value)
  }
  changeValueDirectly(value) {
    this.setState({
      value,
      changeNumber: getNextChangeNumber()
    })
  }
  componentWillUnmount() {
    if (this.props.parent)
      this.props.parent.onChildChange(undefined, this.props.name, true)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.value !== prevState.value)
      this.handleValueChange()
  }
}