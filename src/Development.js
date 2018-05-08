import React from 'react'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Inspector from '/components/Inspector.js'

import TextField from '/material-ui-fields/TextField.js'
import ArrayField from '/material-ui-fields/ArrayField.js'
import ObjectField from '/material-ui-fields/ObjectField.js'
import MasterField from '/material-ui-fields/MasterField.js'

import { withTranslation } from '/react-base-i18n.js'

import server from '/server.js'

class DevelopmentView extends React.PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    setInterval(() => {
      const count = Math.round(Math.random() * 2 + 1)
      const array = new Array(count)
      for (let i = 0; i < count; i++)
        array[i] = { b: Math.random() }
      this.setState({ formValue: array })
    }, 1000)
  }

  onChange(value) {
    console.log('console.log =', JSON.stringify(value, null, 2))
  }

  render() {
    return (
      <MasterField value={this.state.formValue} onChange={console.log}>
        <ArrayField>
          <ObjectField>
            <TextField name="a" />
          </ObjectField>
        </ArrayField>
      </MasterField>
    )
  }
}

export default withTranslation()(DevelopmentView)
