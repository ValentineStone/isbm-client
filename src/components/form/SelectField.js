import React from 'react'
import { Form, Text, Field } from 'react-form'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { withStyles } from '@material-ui/core/styles'
import Textarea from 'react-textarea-autosize'
import cx from '~/utils/cx'

const dummyFunction = () => {}

class SelectField extends React.Component {
  componentDidMount() {
    if (
      this.fieldApi.value === undefined
      && this.props.defaultValue !== undefined
    )
      this.fieldApi.setValue(this.props.defaultValue)
  }
  handleChange = e =>
    this.fieldApi.setValue(e.target.value)
  render() {
    return (
      <Field
        validate={this.props.validate}
        field={this.props.field}
        pure={this.props.pure}
      >
        {this.renderField}
      </Field>
    )
  }
  renderField = fieldApi => {
    this.fieldApi = fieldApi
    const {
      field,
      label,
      validate,
      fullWidth = true,
      defaultValue,
      pure,
      options,
      helperText = true,
      constant,
      ...restProps
    } = this.props
    return (
      <FormControl
        error={fieldApi.error}
        fullWidth={fullWidth}
      >
        <InputLabel shrink>{label}</InputLabel>
        <Select
          open={constant ? false : undefined}
          onOpen={dummyFunction}
          {...restProps}
          value={fieldApi.value || defaultValue}
          onChange={this.handleChange}
        >
          {Object.entries(options).map(([value, label]) =>
            <MenuItem key={value} value={value}>{label}</MenuItem>)
          }
        </Select>
        {helperText && <FormHelperText>{helperText || ''}</FormHelperText>}
      </FormControl>
    )
  }
}

export default SelectField