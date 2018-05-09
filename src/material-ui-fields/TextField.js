import React from 'react'
import PrimitiveField from '/react-base-fields/PrimitiveField'
import contextify from '/react-base-fields/contextify'
import MuiTextField from 'material-ui/TextField'
import { InputAdornment } from 'material-ui/Input'

class TextField extends PrimitiveField {
  constructor(props) {
    super(props, { defaultValue: props.type === 'number' ? NaN : '' })
  }
}

const implementation = {}
implementation.Input = ({
  onChange,
  name,
  value,
  default: defaultValue,
  hint: helperText,
  ...props
}) => (
    <MuiTextField
      fullWidth
      onInput={e => onChange(e.target.value)}
      defaultValue={defaultValue || value}
      helperText={helperText}
      InputProps={{
        startAdornment: props.prefix &&
          <InputAdornment>{props.prefix}</InputAdornment>,
        endAdornment: props.suffix &&
          <InputAdornment>{props.suffix}</InputAdornment>
      }}
      {...props}
    />
  )
implementation.Input.displayName =
  'TextFieldImplementation.Input'

TextField.implementation = implementation

export default contextify({
  consumesName: true,
  consumesParent: true
})(TextField)