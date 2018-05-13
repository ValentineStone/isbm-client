import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import StoreInspector from '~/containers/StoreInspector'

import Translated from '~/containers/Translated'

import AppHeader from '../containers/AppHeader'
import AppNavigation from './AppNavigation'
import AppContent from './AppContent'

const titleElement = document.querySelector('title')
export default class App extends React.PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        <CssBaseline />
        <Translated>
          {t => ReactDOM.createPortal(t`app.name`, titleElement)}
        </Translated>
        <AppHeader />
        <AppNavigation />
      </MuiThemeProvider >
    )
  }
}