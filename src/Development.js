import React from 'react'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Inspector from '/components/Inspector.js'

import Form from '/components/Form.js'
import calc from '/forms/calc.jsx'

import I18n from '/i18n.js'

import server from '/server.js'

class DevelopmentView extends React.PureComponent {
  constructor() {
    super()
  }

  render() {
    return (
      <Paper style={{ padding: '1em', maxWidth: 500, margin: '0 auto' }}>
        <Form model={calc} onInput={console.log} />
      </Paper>
    )
  }
}

export default I18n.translate(DevelopmentView)
