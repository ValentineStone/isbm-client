import React from 'react'
import { Form, Text, Field } from 'react-form'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'

function TextField({
  onChange,
  onBlur,
  field,
  label,
  validate,
  fullWidth,
  pure,
  ...rest
}) {
  return (
    <Field validate={validate} field={field} pure={pure}>
      {fieldApi =>
        <FormControl
          error={fieldApi.error}
          fullWidth={fullWidth}
        >
          <InputLabel>{label}</InputLabel>
          <Input
            value={fieldApi.value || ''}
            onChange={(...args) => {
              const [e] = args
              fieldApi.setValue(e.target.value)
              if (onChange) onChange(...args)
            }}
            onBlur={(...args) => {
              fieldApi.setTouched()
              if (onBlur) onBlur(...args)
            }}
          />
          <FormHelperText>
            {fieldApi.error || fieldApi.warning || fieldApi.success || ''}
          </FormHelperText>
        </FormControl>
      }
    </Field>
  )
}

export default TextField