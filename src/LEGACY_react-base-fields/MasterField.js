import React from 'react'
import BaseField from './BaseField.js'

export default class MasterField extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.initialValue !== nextProps.value
      && prevState.value !== nextProps.value
    ) {
      return {
        value: nextProps.value,
        initialValue: nextProps.value
      }
    }
    else
      return null
  }
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      initialValue: props.value
    }
  }
  getChildFieldValue() {
    return this.state.value
  }
  onChildChange(value) {
    this.setState(prevState => prevState.value === value ? null : { value })
  }
  notifyOfChildDefaultValue() { }
  render() {
    if (typeof this.props.children === 'function')
      return this.props.children(this)
    else
      return this.props.children
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.value !== prevState.value && this.props.onChange)
      this.props.onChange(this.state.value)
  }
}