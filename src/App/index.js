import React from 'react'
import { Redirect, Route } from 'react-router'

import Translated from '~/containers/Translated'

import AppHeader from './AppHeader'
import AppNavigation from './AppNavigation'
import AppContent from './AppContent'
import AppWrapper from './AppWrapper'
import LoginForm from '~/containers/LoginForm'

import BasicCalculator from '~/containers/BasicCalculator'

function App(props) {
  return (
    <AppWrapper theme={props.theme}>
      <AppHeader showDev={!props.user.guest} />
      <AppContent>
        <BasicCalculator />
      </AppContent>
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