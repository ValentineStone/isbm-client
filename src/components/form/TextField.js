import React from 'react'
import { Form, Text, Field } from 'react-form'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import { withStyles } from '@material-ui/core/styles'
import Textarea from 'react-textarea-autosize'
import cx from '~/utils/cx'

function TextField({
  onChange,
  onBlur,
  field,
  label,
  validate,
  fullWidth,
  classes,
  pure,
  multiline,
  ...InputProps
}) {
  const inputComponent = multiline ? Textarea : undefined
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
            inputComponent={inputComponent}
            {...InputProps}
            className={cx(classes.multiline, InputProps.className)}
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

const styles = {
  multiline: {
    '& > textarea': {
      resize: 'none'
    }
  }
}

export default withStyles(styles)(TextField)