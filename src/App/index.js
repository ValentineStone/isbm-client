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
  return (
    <AppWrapper theme={props.theme}>
      <div className={props.classes.appRoot}>
        <AppHeader
          className={props.classes.appHeader}
          showDev={!props.user.guest}
          navigationVisible={Boolean(props.user.username)}
        />
        {props.user.username &&
          <AppNavigation
            user={props.user}
            logOutUser={props.logOutUser}
          />
        }
        <main className={props.classes.appContent}>
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
        </main>
      </div>
    </AppWrapper >
  )
}

const styles = {
  appHeader: {
    display: 'table-row',
    border: '3px solid yellow'
  },
  appContent: {
    display: 'table-row',
    height: '100%',
    border: '3px solid red'
  },
  appRoot: {
    display: 'table',
    width: '100%',
    height: '100%',
    border: '3px solid purple'
  }
}

App = withStyles(styles)(App)


import { connect } from 'react-redux'
import logOutUser from '~/actions/logOutUser'

function mapStateToProps(state) {
  return { theme: state.theme, user: state.user }
}

export default connect(
  mapStateToProps,
  { logOutUser }
)(App)