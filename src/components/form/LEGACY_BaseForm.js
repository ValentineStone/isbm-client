import React from 'react'
import { Form } from 'react-form'

let defaultValuesCounter = 0

class BaseForm extends React.Component {
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps(BaseForm)', props, state)
    if (props.defaultValues !== state.defaultValues)
      return {
        defaultValues: props.defaultValues,
        defaultValuesId: ++defaultValuesCounter
      }
  }

  constructor(props) {
    super(props)

    this.state = { defaultValuesId: -1 }

    console.log('constructor(BaseForm)', this.props)
  }


  renderNativeForm = formApi => (
    <form onSubmit={formApi.submitForm}>
      {console.log('renderNativeForm(BaseForm)')}
      {this.props.children}
    </form>
  )
  render() {
    console.log('render(BaseForm)', this.props)
    return (
      <Form
        pure={false}
        key={this.state.defaultValuesId}
        render={this.renderNativeForm}
        preventDefault
        defaultValues={this.props.defaultValues}
        onChange={(...args) => console.log('onChange(Form)', ...args)}
      />
    )
  }
}


export default BaseForm