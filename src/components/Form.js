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
const isFunction = value => typeof value === 'function'
const isObject = value => typeof value === 'object' && value


let FormHOC

const UnknownField = props => (
  <Inspector data={props} />
)

const InputField = ({ onInput, field, scope }) => (
  <TextField
    fullWidth
    onInput={e => safecall(onInput, e.target.value, field.props.name)}
    value={scope[field.props.name]}
    defaultValue={field.props.defaultValue}
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

class Field extends React.PureComponent {
  render() {
    let field = this.props.field
    while (isFunction(field))
      field = field(this.props.scope)
    if (isObject(field))
      switch (field.element) {
        case 'input':
        case 'number':
        case 'string':
          return <InputField {...this.props} field={field} />
        default:
          return <UnknownField {...this.props} field={field} />
      }
    else
      return <UnknownField {...this.props} field={field} />
  }

  static needsScope(field) {
    return (
      isFunction(field)
      || isFunction(field.props.value)
    )
  }
}

class Form extends React.PureComponent {
  constructor(props) {
    super(props)
    this.immediateValue = {}
  }
  render() {
    const RootHTMLElement =
      this.props.component || this.props.model.element
    const fields = this.props.model.children
    return (
      <RootHTMLElement>
        <List>
          {fields.map((field, index) => (
            <ListItem key={index}>
              <Field
                model={field}
                onInput={this.onFieldInput}
                scope={
                  Field.needsScope(field)
                    ? this.immediateValue
                    : undefined
                }
              />
            </ListItem>
          ))}
        </List>
      </RootHTMLElement>
    )
  }
}

FormHOC = I18n.translate(Form)

export default FormHOC