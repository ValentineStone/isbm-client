import React from 'react'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles'

class Calculator extends React.Component {
  constructor(props) {
    super(props)

    this.renderField = this.renderField.bind(this)

    this.value = {}
    this.calculators = []
    for (let section of this.props.model)
      for (let name in section) {
        const node = section[name]
        if (node.element === 'number')
          node.props.scale = typeof node.props.scale === 'number' ? node.props.scale : 1
        this.value[name] = node.props.default
        if (node.props.equals)
          this.calculators.push(v => {
            const calculated = node.props.equals(this.value)
            switch (node.element) {
              case 'number':
                this.value[name] = Number.isNaN(calculated) ? undefined : calculated
                break
              case 'text':
                this.value[name] = calculated
                break
            }
          })
      }
    this.initialValue = { ...this.value }
    this.state = { ...this.value }
  }

  render() {
    this.calculate()
    return <form style={this.props.style}>
      {this.props.model.map((section, i) => (
        <div style={this.props.sectionStyle} key={i}>
          {Object.entries(section).map(this.renderField)}
        </div>
      ))}
    </form>
  }

  renderField([name, { element, props, children }]) {
    if (!props.equals)
      switch (element) {
        case 'number':
          return <TextField
            key={name}
            fullWidth
            type={props.inputType}
            helperText=" "
            label={this.props.i18n.instance.t(props.label)}
            onInput={e => this.notify(name, this.value[name] = +e.target.value * props.scale)}
            defaultValue={props.default === undefined ? undefined : String(props.default)}
            InputProps={!props.units ? undefined : { endAdornment: <InputAdornment>{this.props.i18n.instance.t(props.units)}</InputAdornment> }}
          />
        case 'text':
          return <TextField
            key={name}
            fullWidth
            type={props.inputType}
            helperText=" "
            label={this.props.i18n.instance.t(props.label)}
            onInput={e => this.notify(name, this.value[name] = e.target.value)}
            defaultValue={props.default === undefined ? undefined : String(props.default)}
            InputProps={!props.suffix ? undefined : { endAdornment: <InputAdornment>{this.props.i18n.instance.t(props.suffix)}</InputAdornment> }}
          />
        case 'boolean':
          return <FormControl
            key={name}
            fullWidth
          >
            <FormControlLabel
              label={this.props.i18n.instance.t(props.label)}
              control={
                <Checkbox
                  color="primary"
                  onChange={(e, checked) => this.notify(name, this.value[name] = checked)}
                />
              }
            />
          </FormControl>
        case 'select':
          return <FormControl
            key={name}
            fullWidth
          >
            <InputLabel>{this.props.i18n.instance.t(props.label)}</InputLabel>
            <Select
              value={this.value[name]}
              onChange={e => this.notify(name, this.value[name] = e.target.value)}
            >
              {Object.entries(props.options).map(([value, label]) =>
                <MenuItem key={value} value={value}>{this.props.i18n.instance.t(label)}</MenuItem>)
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
            label={this.props.i18n.instance.t(props.label)}
            value={this.value[name] === undefined ? '' : (this.value[name] / props.scale).toFixed(2)}
            InputProps={!props.units ? undefined : { endAdornment: <InputAdornment>{this.props.i18n.instance.t(props.units)}</InputAdornment> }}
          />
        case 'text':
          return <TextField
            key={name}
            fullWidth
            helperText=" "
            label={this.props.i18n.instance.t(props.label)}
            value={this.value[name] === undefined ? '' : this.value[name]}
            InputProps={!props.suffix ? undefined : { endAdornment: <InputAdornment>{this.props.i18n.instance.t(props.suffix)}</InputAdornment> }}
          />
      }
  }

  calculate() {
    this.calculators.forEach(v => v())
    if (this.props.controller)
      this.props.controller.value = this.value
  }

  notify(name, value) {
    this.setState({ [name]: value })
  }
}




import { connect } from 'react-redux'

function mapStateToProps(state) {
  return { i18n: state.i18n }
}

export default connect(
  mapStateToProps
)(Calculator)