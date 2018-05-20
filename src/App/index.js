import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Translated from '~/containers/Translated'

import AppHeader from './AppHeader'
import AppNavigation from './AppNavigation'
import AppContent from './AppContent'
import AppWrapper from './AppWrapper'
import LoginForm from '~/containers/LoginForm'

import UnknownView from '~/containers/views/Unknown'
import DevelopmentView from '~/containers/views/Development'

function App(props) {
  return (
    <AppWrapper theme={props.theme}>
      <AppHeader showDev={!props.user.guest} />
      {!props.user.username
        ? <LoginForm />
        : <>
          <AppNavigation user={props.user} logOutUser={props.logOutUser} />
          <AppContent>
            <Switch>
              <Route path="/development" component={DevelopmentView} />
              <Route component={UnknownView} />
            </Switch>
          </AppContent>
        </>
      }
    </AppWrapper >
  )
}





import { connect } from 'react-redux'
import logOutUser from '~/actions/logOutUser'

function mapStateToProps(state) {
  return { theme: state.theme, user: state.user }
}

export default connect(
  mapStateToProps,
  { logOutUser }
)(App)