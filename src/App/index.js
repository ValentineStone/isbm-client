import React from 'react'
import { Redirect, Route } from 'react-router'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { withRoute } from '~/context/RouteContext'
import Translated from '~/containers/Translated'

import AppHeader from './AppHeader'
import AppNavigation from './AppNavigation'
import AppContent from './AppContent'
import AppWrapper from './AppWrapper'
import LoginForm from '~/containers/LoginForm'

function App(props) {
  return (
    <AppWrapper theme={props.theme}>
      <AppHeader showDev={!props.user.guest} />
      {!props.user.username
        ? <LoginForm />
        : <>
          <AppNavigation />
          <AppContent>
            <Translated>
              {t =>
                <Typography variant="display1">
                  {t`Welcome`} {props.user.alias}<br />
                  <Button variant="raised" color="primary" onClick={props.logOutUser}>
                    {t`Log out`}
                  </Button>
                </Typography>
              }
            </Translated>
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
)(withRoute()(App))