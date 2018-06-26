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

function BooleanField({
  field,
  label,
  validate,
  fullWidth = true,
  pure,
  ...restProps
}) {
  return (
    <Field validate={validate} field={field} pure={pure}>
      {fieldApi =>
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
                onChange={(e, checked) => fieldApi.setValue(checked)}
                {...restProps}
              />
            }
          />
        </FormControl>
      }
    </Field>
  )
}

export default BooleanField