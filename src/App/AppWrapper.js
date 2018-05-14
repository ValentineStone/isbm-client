import React from 'react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

export default class AppWrapper extends React.PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        <CssBaseline />
        {this.props.children}
      </MuiThemeProvider >
    )
  }
}