import React from 'react'
import { Form, Text, Field } from 'react-form'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import NativeDateTimePicker from 'material-ui-pickers/DateTimePicker'
//import { DateFormatInput as NativeDateTimePicker } from 'material-ui-next-pickers'
import { withStyles } from '@material-ui/core/styles'
import cx from '~/utils/cx'

function DateTimePicker({
  onChange,
  onBlur,
  validate,
  classes,
  field,
  pure,
  ...props
}) {
  return (
    <Field validate={validate} field={field} pure={pure}>
      {fieldApi =>
        <NativeDateTimePicker
          className={classes.basic}
          onChange={value => fieldApi.setValue(value)}
          value={
            fieldApi.value instanceof Date
              ? fieldApi.value
              : new Date(fieldApi.value)
          }
          {...props}
        />
      }
    </Field>
  )
}

const styles = {
  basic: {
    display: 'flex',
    marginBottom: 20,
  }
}


export default withStyles(styles)(DateTimePicker)