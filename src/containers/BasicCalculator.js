import React from 'react'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import withWidth from '@material-ui/core/withWidth'

import Calculator from '~/containers/Calculator'
import basicCalc, { calc } from '~/calculators/basic.js'

class BasicCalculator extends React.Component {
  controller = {}
  state = { price: '' }

  calculate = () => {
    const price = calc(this.controller.value) || ''
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
          >
            {t`Calculate`}
          </Button>
          <TextField fullWidth label={t`Price`} value={this.state.price} />
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
  mapStateToProps
)(BasicCalculator))