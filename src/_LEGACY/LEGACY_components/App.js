import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'

import app from '~/app'

import AppHeader from './AppHeader'
import AppNavigation from './AppNavigation'
import AppContent from './AppContent'


import { withTranslation, t } from '~/app/i18n'
import RouteContext from '~/containers/RouteContext'

const titleElement = document.head.querySelector('title')

class App extends React.PureComponent {
  constructor() {
    super()
    this.state = { theme: app.getTheme() }
    this.onThemeChange = theme => this.setState({ theme })
  }
  componentDidMount() {
    app.on('themechange', this.onThemeChange)
  }
  componentWillUnmount() {
    app.off('themechange', this.onThemeChange)
  }
  render() {
    return (
      <MuiThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <BrowserRouter>
          <Route>
            {route =>
              <RouteContext.Provider value={route}>
                {ReactDOM.createPortal(t`app.name`, titleElement)}
                <AppHeader />
                <AppNavigation />
                <AppContent />
              </RouteContext.Provider>
            }
          </Route>
        </BrowserRouter>
      </MuiThemeProvider >
    )
  }
}

export default withTranslation()(App)