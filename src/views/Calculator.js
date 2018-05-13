import React from 'react'
import Paper from '@material-ui/core/Paper'
import Calcuator from '~/components/Calculator'
import embroideryCalculatorModel from '~/forms/embroidery.jsx'

class CalculatorView extends React.PureComponent {
  render() {
    return <Paper style={{ padding: '1em', maxWidth: 320, margin: '0 auto' }}>
      <Calcuator model={embroideryCalculatorModel} />
    </Paper>
  }
}

export default CalculatorView