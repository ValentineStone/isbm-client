import React from 'react'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import withWidth from '@material-ui/core/withWidth'
import InputAdornment from '@material-ui/core/InputAdornment'

import Calculator from '~/containers/Calculator'
import basicCalc, { calc, glassTypes } from '~/calculators/basic.js'

import jrpc from '~/actions/jrpc'

const valueAsHTML = value => {
  if (!value)
    return '✗'
  if (value === true)
    return '✓'
  return value
}

const asHTML = object => {
  return (
    '<table><tbody>'
    + Object
      .entries(object)
      .map(v => `<tr><td>${v[0]} </td><td>${valueAsHTML(v[1])}</td></tr>`).join('')
    + '</tbody></table>'
  )
}

class BasicCalculator extends React.Component {
  constructor(props) {
    super(props)

    this.controller = {}
    this.state = { price: '' }

    this.labelsMap = Object.assign({}, ...basicCalc)

  }

  calculate = () => {
    const t = this.props.i18n.instance.t
    const price = calc(this.controller.value) || ''
    if (price) {
      const snapshot = {}
      for (const key in this.controller.value)
        if (this.controller.value[key])
          snapshot[t(this.labelsMap[key].props.label)] = this.controller.value[key]
      const glassKey = t`Glass`
      glassTypes
      snapshot[glassKey] = t(glassTypes[snapshot[glassKey]])
      this.props.jrpc('sendMail', {
        subject: t`Following calculations have been made`,
        html: `<h1>${t`Price`}: ${price.toFixed(2)} ${t`rub`}</h1>` + asHTML(snapshot)
      })
    }
    this.setState({ price })
  }

  render() {
    const t = this.props.i18n.instance.t
    return (
      <Paper style={{ maxWidth: 600, margin: '0 auto', padding: '1em' }}>
        <Calculator
          model={basicCalc}
          style={{ display: this.props.width === 'xs' ? 'block' : 'flex' }}
          sectionStyle={{ padding: '1em' }}
          controller={this.controller}
        />
        <div style={{ padding: '1em' }}>
          <Button
            variant="raised"
            color="primary"
            fullWidth
            onClick={this.calculate}
            style={{ marginBottom: '1em' }}
          >
            {t`Calculate`}
          </Button>
          <TextField
            fullWidth
            label={t`Price`}
            value={typeof this.state.price === 'number'
              ? this.state.price.toFixed(2)
              : this.state.price
            }
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  {t`rub`}
                </InputAdornment>
              )
            }}
          />
          <div style={{ marginTop: '1em', textAlign: 'right' }}>
            <Button onClick={() => location = location}>
              {t`Clear`}
            </Button>
          </div>
        </div>
      </Paper>
    )
  }
}



import { connect } from 'react-redux'

function mapStateToProps(state) {
  return { i18n: state.i18n }
}
export default withWidth()(connect(
  mapStateToProps,
  { jrpc }
)(BasicCalculator))