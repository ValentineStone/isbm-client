import React from 'react'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Inspector from '/components/Inspector'

import TextField from '/material-ui-fields/TextField'
import ArrayField from '/material-ui-fields/ArrayField'
import ObjectField from '/material-ui-fields/ObjectField'
import MasterField from '/material-ui-fields/MasterField'

import { withTranslation, t } from '/app/i18n'

class DevelopmentView extends React.PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <MasterField value={this.state.formValue}>
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
