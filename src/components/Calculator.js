import React from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import { InputLabel, InputAdornment } from 'material-ui/Input'
import { withStyles } from 'material-ui/styles'

import I18n from '/i18n.js'

class Calculator extends React.PureComponent {
  constructor(props) {
    super(props)

    this.renderField = this.renderField.bind(this)

    this.value = {}
    this.calculators = []
    for (let name in this.props.model) {
      const node = this.props.model[name]
      if (node.element === 'number')
        node.props.scale = typeof node.props.scale === 'number' ? node.props.scale : 1
      this.value[name] = node.props.default
      if (node.props.equals)
        this.calculators.push(async v => {
          const calculated = await node.props.equals(this.value)
          switch (node.element) {
            case 'number':
              this.value[name] = Number.isNaN(calculated) ? undefined : calculated
              break
          }
          this.setState({ latestRender: Date.now() })
        })
    }
  }

  render() {
    return <form>
      {Object.entries(this.props.model).map(this.renderField)}
    </form>
  }

  renderField([name, { element, props }]) {
    if (!props.equals)
      switch (element) {
        case 'number':
          return <TextField
            key={name}
            fullWidth
            helperText=" "
            label={I18n.t(props.label)}
            onInput={e => this.calculate(this.value[name] = +e.target.value * props.scale)}
            defaultValue={props.default === undefined ? undefined : String(props.default)}
            InputProps={{ endAdornment: props.units && <InputAdornment>{I18n.t(props.units)}</InputAdornment> }}
          />
        case 'boolean':
          return <FormControl
            key={name}
            fullWidth
          >
            <FormControlLabel
              label={I18n.t(props.label)}
              control={
                <Checkbox
                  color="primary"
                  onChange={(e, checked) => this.calculate(this.value[name] = checked)}
                />
              }
            />
          </FormControl>
        case 'select':
          return <FormControl
            key={name}
            fullWidth
          >
            <InputLabel>{I18n.t(props.label)}</InputLabel>
            <Select
              value={this.value[name]}
              onChange={e => this.calculate(this.value[name] = e.target.value)}
            >
              {Object.entries(props.options).map(([value, label]) =>
                <MenuItem key={value} value={value}>{I18n.t(label)}</MenuItem>)
              }
            </Select>
            <FormHelperText>{' '}</FormHelperText>
          </FormControl>
      }
    else
      switch (element) {
        case 'number':
          return <TextField
            key={name}
            fullWidth
            helperText=" "
            label={I18n.t(props.label)}
            value={this.value[name] === undefined ? '' : (this.value[name] * props.scale).toFixed(2)}
            InputProps={{ endAdornment: props.units && <InputAdornment>{I18n.t(props.units)}</InputAdornment> }}
          />
      }
  }

  calculate() {
    this.calculators.forEach(v => v())
    this.setState({ latestRender: Date.now() })
  }
}

export default I18n.translate(Calculator)