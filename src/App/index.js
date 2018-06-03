import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import Translated from '~/containers/Translated'

import AppHeader from './AppHeader'
import AppNavigation from './AppNavigation'
import AppContent from './AppContent'
import AppWrapper from './AppWrapper'
import LoginForm from '~/containers/LoginForm'

import UnknownView from '~/containers/views/UnknownView'
import DevelopmentView from '~/containers/views/DevelopmentView'
import ClientsView from '~/containers/views/ClientsView'
import ProfileView from '~/containers/views/ProfileView'

let App = function App(props) {
  if (!props.initialized)
    return null
  return (
    <AppWrapper theme={props.theme}>
      <AppHeader
        showDev={props.user.username}
        navigationVisible={Boolean(props.user.username)}
      />
      {props.user.username &&
        <AppNavigation
          user={props.user}
          logOutUser={props.logOutUser}
        />
      }
      {!props.user.username
        ? <LoginForm />
        : (
          <Switch>
            <Route path="/development" component={DevelopmentView} />
            <Route path="/clients" component={ClientsView} />
            <Route path="/profile" component={ProfileView} />
            <Route component={UnknownView} />
          </Switch>
        )
      }
    </AppWrapper >
  )
}

const styles = {
  appContent: {
    padding: '0 1em'
  }
}

App = withStyles(styles)(App)


import { connect } from 'react-redux'
import logOutUser from '~/actions/logOutUser'

function mapStateToProps(state) {
  return {
    theme: state.theme,
    user: state.user,
    initialized: state.initialized
  }
}

export default connect(
  mapStateToProps,
  { logOutUser }
)(App)