import React from 'react'
import { Form } from 'react-form'
import TextField from '~/components/form/TextField'
import Inspector from '~/components/Inspector'
import Translated from '~/containers/Translated'

let uniqueInitialValueCounter = 0
class RecordEditor extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.initialValue) {
      return {
        uniqueInitialValueKey: uniqueInitialValueCounter++,
        initialValue: props.value,
        value: props.value
      }
    }
    else return null
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleChange = (...args) => {
    const [formState] = args
    this.setState({ value: formState.values })
    if (this.props.onChange)
      this.props.onChange(...args)
  }
  renderForm = formApi => {
    const { children, value, ...props } = this.props
    return (
      <form onSubmit={formApi.submitForm}>
        <Translated>
          {t => children.map(fieldModel => {
            if (React.isValidElement(fieldModel)) {
              return fieldModel
            }
            else {
              const [field, { label = field, ...props }] = fieldModel
              const labelTranslated = t(label)
              return (
                <TextField
                  field={field}
                  key={labelTranslated}
                  fullWidth
                  label={labelTranslated}
                  {...props}
                />
              )
            }
          })}
        </Translated>
      </form>
    )
  }
  render() {
    const { children, value, ...props } = this.props
    return <>
      <Form
        preventDefault
        defaultValues={this.state.initialValue}
        key={this.state.uniqueInitialValueKey}
        render={this.renderForm}
        {...props}
        onChange={this.handleChange}
      />
      <Inspector
        data={this.state.value}
        expandLevel={1}
      />
    </>
  }
}


export default RecordEditor