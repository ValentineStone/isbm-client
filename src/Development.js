import React from 'react'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Inspector from '/components/Inspector.js'

import TextField from '/material-ui-fields/TextField.js'
import ArrayField from '/material-ui-fields/ArrayField.js'
import ObjectField from '/material-ui-fields/ObjectField.js'
import MasterField from '/material-ui-fields/MasterField.js'

import { withTranslation, t } from '/react-base-i18n.js'

import server from '/server.js'

class DevelopmentView extends React.PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <MasterField value={this.state.formValue} onChange={console.log}>
        <ArrayField addLabel={t`Add user`}>
          <ObjectField>
            <TextField name="a" />
          </ObjectField>
        </ArrayField>
      </MasterField>
    )
  }
}

export default withTranslation()(DevelopmentView)
