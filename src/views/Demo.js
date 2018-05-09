import React from 'react'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'

import Wiki from '/components/Wiki'

class DemoView extends React.PureComponent {
  constructor() {
    super()
    this.state = { page: 'Daria' }
  }
  render() {
    return <>
      <TextField
        style={{ marginBottom: '1em' }}
        fullWidth
        placeholder="Page title"
        value={this.state.page}
        onInput={evt => this.setState({ page: evt.target.value.replace(/ /g, '_') })}
      />
      <Wiki page={this.state.page} />
    </>
  }
}

export default DemoView