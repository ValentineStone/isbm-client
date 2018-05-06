import React from 'react'

export default class BaseField extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    let value
    if (nextProps.parent)
      value = nextProps.parent.getChildFieldValue(nextProps.name)
    if (value !== undefined && value !== prevState.value) {
      return { value }
    }
    else
      return null
  }

  constructor(props, options) {
    super(props)
    if (props.parent)
      this.derivedDefault = props.parent.getChildFieldValue(props.name)
    if (this.derivedDefault === undefined) {
      this.state = { value: this.props.default || options.defaultValue }
      if (props.parent)
        props.parent.notifyOfChildDefaultValue(this.state.value, this.props.name)
    }
    else
      this.state = { value: this.derivedDefault }

    this.onValueChange = this.onValueChange.bind(this)
    this.changeValueDirectly = this.changeValueDirectly.bind(this)
  }

  onValueChange() {
    if (this.props.parent)
      this.props.parent.onChildChange(this.state.value, this.props.name)
    if (this.props.onChange)
      this.props.onChange(this.state.value)
  }
  changeValueDirectly(value) {
    this.setState({ value })
  }
  componentWillUnmount() {
    if (this.props.parent)
      this.props.parent.onChildChange(undefined, this.props.name, true)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.value !== prevState.value)
      this.onValueChange()
  }
}