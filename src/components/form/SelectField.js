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

function SelectField({
  field,
  label,
  validate,
  fullWidth = true,
  defaultValue,
  pure,
  options,
  ...restProps
}) {
  return (
    <Field validate={validate} field={field} pure={pure}>
      {fieldApi =>
        <FormControl
          error={fieldApi.error}
          fullWidth={fullWidth}
        >
          <InputLabel shrink>{label}</InputLabel>
          <Select
            value={fieldApi.value || defaultValue}
            onChange={e => fieldApi.setValue(e.target.value)}
          >
            {Object.entries(options).map(([value, label]) =>
              <MenuItem key={value} value={value}>{label}</MenuItem>)
            }
          </Select>
        </FormControl>
      }
    </Field>
  )
}

export default SelectField