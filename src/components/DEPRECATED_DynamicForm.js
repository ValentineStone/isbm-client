import React from 'react'

import Inspector from '/components/Inspector.js'
import shallowEquals from '/shallowEquals.js'

const passChildren = props => props.children
const ContainerFieldChildList = passChildren
const ContainerFieldChildListItem = passChildren

let renderChildField

class GenericField extends React.PureComponent {
  constructor(props) {
    super(props)
    this.immediateValue
  }
}

class UnknownField extends React.PureComponent {
  render() {
    return <Inspector data={this.props} />
  }
}

class ContainerField extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.field === nextProps.field)
      if (prevState.needsNewImmediateValue)
        return { needsNewImmediateValue: false }
      else
        return null
    else
      return {
        needsNewImmediateValue: true,
        field: nextProps.field
      }
  }
  constructor(props) {
    super(props)
    this.state = {}
    this.onChildFieldInput = this.onChildFieldInput.bind(this)
  }
  render() {
    if (this.state.needsNewImmediateValue)
      this.immediateValue = {}
    const fields = this.props.model.children
    return (
      <ContainerFieldChildList>
        {fields.map(field => (
          <ContainerFieldChildListItem key={field.props.name}>
            {renderChildField(this, field)}
          </ContainerFieldChildListItem>
        ))}
      </ContainerFieldChildList>
    )
  }
  onChildFieldInput(value, field) {
    if (!this.props.field.children.includes(field))
      return
    if (this.immediateValue[field.props.name] === value)
      return
    this.immediateValue = {
      ...this.immediateValue,
      [field.props.name]: value
    }
    this.props.onInput(this.immediateValue, this.props.field)
  }
}


renderChildField = (parent, field) => {
  switch (field.element) {
    case 'input':
    case 'string':
    case 'number':
      return (
        <InputField
          model={field}
          value={parent.props.value[field.props.name]}
          onInput={parent.onChildFieldInput}
        />
      )
    case 'dynamic':
      return (
        <DynamicField
          model={field}
          value={parent.props.value[field.props.name]}
          scope={parent.props.scope || parent.props.value}
          onInput={parent.onChildFieldInput}
        />
      )
    default:
      return (
        <UnknownField
          model={field}
        />
      )
  }
}



class MasterField extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { value: {} }
  }
  componentDidMount() {
    this.mounted = true
  }
  componentWillUnmount() {
    this.unmounted = true
  }
  render() {

  }
  onSlaveFieldInput(value, field) {
    if (this.unmounted)
      return
    if (this.mounted)
      this.setState({ value })
    else
      this.state.value = value
  }
}

const isFieldPrimitive = field => (
  field.element === 'form'
  || field.element === 'group'
)