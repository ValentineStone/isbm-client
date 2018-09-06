import React from 'react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'

export default class AppWrapper extends React.PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {this.props.children}
        </MuiPickersUtilsProvider>
      </MuiThemeProvider >
    )
  }
}