import React from 'react'
import { Form, Text, Field } from 'react-form'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withStyles } from '@material-ui/core/styles'
import Textarea from 'react-textarea-autosize'
import cx from '~/utils/cx'

class BooleanField extends React.Component {
  handleChange = (e, checked) => {
    if (!this.props.constant)
      this.fieldApi.setValue(checked)
  }
  renderField = fieldApi => {
    this.fieldApi = fieldApi
    const {
      field,
      label,
      validate,
      fullWidth = true,
      pure,
      constant,
      ...restProps
    } = this.props
    return (
      <FormControl
        error={fieldApi.error}
        fullWidth={fullWidth}
      >
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              color="primary"
              checked={fieldApi.value || false}
              onChange={this.handleChange}
              {...restProps}
            />
          }
        />
      </FormControl>
    )
  }
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
}

export default BooleanField