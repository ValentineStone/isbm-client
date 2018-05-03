import React from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import { InputLabel, InputAdornment } from 'material-ui/Input'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'

import List, { ListItem } from 'material-ui/List'

import Inspector from '/components/Inspector.js'

import I18n from '/i18n.js'

const safecall = async (func, ...args) => typeof func === 'function' && func(...args)
const isFunction = func => typeof func === 'function'

const styles = {
  subformCard: {
    width: '100%'
  }
}

let FormHOC

class Form extends React.PureComponent {
  constructor(props) {
    super(props)

    this.immediateValue = {}

    const fields = this.props.model.children
    for (let field of fields) {
      while (isFunction(field))
        field = field(this.immediateValue)
      const initialFieldValue = field.props.default
      const transformedFieldValue =
        this.applyTransformsToFieldValue(field, initialFieldValue)
      this.immediateValue[field.props.name] = transformedFieldValue
    }

    this.state = {
      value: this.immediateValue
    }

    this.renderField = this.renderField.bind(this)
  }

  setImmediateValue(value) {
    this.immediateValue = { ...this.immediateValue, ...value }
    safecall(this.props.onInputImmediate, this.immediateValue)
    return this.immediateValue
  }

  applyTransformsToFieldValue(field, fieldValue) {
    let newFieldValue = fieldValue
    if (field.element === 'number')
      newFieldValue = Number(newFieldValue)
    else if (field.element === 'string')
      newFieldValue = newFieldValue || ''
    else if (field.element === 'boolean')
      newFieldValue = Boolean(newFieldValue)
    if (isFunction(field.props.transform))
      newFieldValue = field.props.transform(newFieldValue)
    else if (Array.isArray(field.props.transform))
      for (const transform of field.props.transform)
        newFieldValue = transform(newFieldValue)
    return newFieldValue
  }

  onFieldInput(field, fieldValue) {
    const transformedFieldValue =
      this.applyTransformsToFieldValue(field, fieldValue)
    this.setImmediateValue({ [field.props.name]: transformedFieldValue })
    this.recalculateComputedValues()
  }

  async recalculateComputedValues() {
    const immediateValueSnapshot = this.immediateValue
    const fields = this.props.model.children
    for (const field of fields)
      if (isFunction(field.props.value))
        if (immediateValueSnapshot === this.immediateValue)
          immediateValueSnapshot[field.props.name] =
            await field.props.value(immediateValueSnapshot)
        else
          return
    if (immediateValueSnapshot === this.immediateValue) {
      this.setState({ value: this.immediateValue })
      safecall(this.props.onInput, this.immediateValue)
    }
  }

  render() {
    const RootHTMLElement =
      this.props.component || this.props.model.element
    const fields = this.props.model.children
    return (
      <RootHTMLElement>
        <List>
          {fields.map(this.renderField)}
        </List>
      </RootHTMLElement>
    )
  }

  renderField(field) {
    while (isFunction(field))
      field = field(this.immediateValue)
    let renderedField
    if (!field.props)
      console.log(field.props, field)
    switch (field.element) {
      case 'input':
      case 'string':
      case 'number':
        renderedField = this.renderInputField(field)
        break
      case 'boolean':
        renderedField = this.renderBooleanField(field)
        break
      case 'select':
        renderedField = this.renderSelectField(field)
        break
      case 'form':
        renderedField = this.renderFormField(field)
        break
      case 'fragment':
        return field.children.map(this.renderField)
        break
      default:
        renderedField = this.renderUnknownField(field)
    }
    return (
      <ListItem key={field.props.name}>
        {renderedField}
      </ListItem>
    )
  }

  renderInputField(field) {
    return (
      <TextField
        fullWidth
        onInput={
          isFunction(field.props.value)
            ? undefined
            : e => this.onFieldInput(field, e.target.value)
        }
        value={
          isFunction(field.props.value)
            ? String(this.applyTransformsToFieldValue(
              field,
              this.state.value[field.props.name]
            ))
            : undefined
        }
        defaultValue={
          field.props.default === undefined
            ? undefined
            : String(field.props.default)
        }
        label={I18n.t(field.props.label)}
        InputProps={{
          endAdornment: field.props.suffix && (
            <InputAdornment>
              {I18n.t(field.props.suffix)}
            </InputAdornment>
          ),
          startAdornment: field.props.prefix && (
            <InputAdornment>
              {I18n.t(field.props.prefix)}
            </InputAdornment>
          ),
        }}
      />
    )
  }

  renderBooleanField(field) {
    return (
      <FormControl fullWidth>
        <FormControlLabel
          label={I18n.t(field.props.label)}
          control={
            <Checkbox
              color="primary"
              onChange={
                isFunction(field.props.value)
                  ? undefined
                  : (e, value) => this.onFieldInput(field, value)
              }
              value={
                isFunction(field.props.value)
                  ? Boolean(this.applyTransformsToFieldValue(
                    field,
                    this.state.value[field.props.name]
                  ))
                  : undefined
              }
            />
          }
        />
      </FormControl>
    )
  }

  renderSelectField(field) {
    return (
      <FormControl fullWidth>
        <InputLabel>{I18n.t(field.props.label)}</InputLabel>
        <Select
          value={
            String(this.applyTransformsToFieldValue(
              field,
              this.state.value[field.props.name]
            ))
          }
          onChange={
            isFunction(field.props.value)
              ? undefined
              : e => this.onFieldInput(field, e.target.value)
          }
        >
          {Object.entries(field.props.options).map(([value, label]) =>
            <MenuItem key={value} value={value}>{I18n.t(label)}</MenuItem>)
          }
        </Select>
      </FormControl>
    )
  }

  renderUnknownField({ element, props }) {
    return (
      <Inspector data={{ [element]: props }} />
    )
  }

  renderFormField(field) {
    return (
      <Card className={this.props.classes.subformCard}>
        <FormHOC
          model={field}
          onInput={v => this.onFieldInput(field, v)}
          component={React.Fragment}
        />
      </Card>
    )
  }

}

FormHOC = withStyles(styles)(I18n.translate(Form))

export default FormHOC