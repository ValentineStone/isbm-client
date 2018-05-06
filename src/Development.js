import React from 'react'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Inspector from '/components/Inspector.js'

import Form from '/components/Form.js'
import calc from '/forms/calc.jsx'

import ObjectField from '/reactive-fields/ObjectField.js'
import TextField from '/reactive-fields/TextField.js'
import ArrayField from '/reactive-fields/ArrayField.js'

import I18n from '/i18n.js'

import server from '/server.js'

class DevelopmentView extends React.PureComponent {
  constructor() {
    super()
  }

  onChange(value) {
    console.log('console.log =', JSON.stringify(value, null, 2))
  }

  render() {
    return (
      <Paper style={{ padding: '1em', maxWidth: 500, margin: '0 auto' }}>
        <ArrayField>
          <ObjectField>
            <TextField name="id" type="number" />
            <TextField name="bio" type="textarea" />
            <ArrayField name="likes">
              <TextField />
            </ArrayField>
          </ObjectField>
        </ArrayField>
      </Paper>
    )
  }
}

export default I18n.translate(DevelopmentView)
