import React from 'react'
import { Form, Text, Field } from 'react-form'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withStyles } from '@material-ui/core/styles'
import Textarea from 'react-textarea-autosize'
import cx from '~/utils/cx'

class TextField extends React.Component {

  handleBlur = (...args) => {
    if (this.fieldApi)
      this.fieldApi.setTouched()
    if (this.props.onBlur)
      this.props.onBlur(...args)
  }

  handleChange = (...args) => {
    let value = args[0].target.value
    if (typeof this.props.scale === 'number')
      value = Number(value) * this.props.scale
    if (this.fieldApi)
      this.fieldApi.setValue(value)
    if (this.props.onChange)
      this.props.onChange(...args)
  }

  renderField = fieldApi => {
    this.fieldApi = fieldApi
    const {
      onChange,
      onBlur,
      field,
      label,
      validate,
      fullWidth = true,
      classes,
      pure,
      multiline,
      prefix,
      suffix,
      constant,
      scale,
      helperText,
      ...InputProps
    } = this.props
    const inputComponent = multiline ? Textarea : undefined

    let value
    if (fieldApi) {
      value = fieldApi.value
      if (typeof this.props.scale === 'number')
        value = String(+(Number(value || 0) / this.props.scale).toFixed(2))
    }

    return (
      <FormControl
        error={fieldApi && fieldApi.error}
        fullWidth={fullWidth}
      >
        <InputLabel shrink>{label}</InputLabel>
        <Input
          readOnly={constant}
          defaultValue={value}
          inputComponent={inputComponent}
          startAdornment={prefix && <InputAdornment>{prefix}</InputAdornment>}
          endAdornment={suffix && <InputAdornment>{suffix}</InputAdornment>}
          {...InputProps}
          className={cx(classes.multiline, InputProps.className)}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <FormHelperText>
          {helperText}
          {Boolean(fieldApi) && (
            fieldApi.error
            || fieldApi.warning
            || fieldApi.success
          )}
        </FormHelperText>
      </FormControl>
    )
  }
  render() {
    if (this.props.field)
      return (
        <Field
          validate={this.props.validate}
          field={this.props.field}
          pure={this.props.pure}
        >
          {this.renderField}
        </Field>
      )
    else
      return this.renderField()
  }
}

const styles = {
  multiline: {
    '& > textarea': {
      resize: 'none'
    }
  }
}

export default withStyles(styles)(TextField)