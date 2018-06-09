import React from 'react'
import ReactDOM from 'react-dom'

import LinearProgress from '@material-ui/core/LinearProgress'

import { Route } from 'react-router-dom'
import { Switch } from '~/context/router'

import AppHeader from './AppHeader'
import AppNavigation from './AppNavigation'
import AppContent from './AppContent'
import AppWrapper from './AppWrapper'
import LoginForm from '~/containers/LoginForm'

import UnknownView from '~/containers/views/UnknownView'
import DevelopmentView from '~/containers/views/DevelopmentView'
import ProfileView from '~/containers/views/ProfileView'

import RecordEditorWithListView from '~/containers/views/RecordEditorWithListView'

import Translated from '~/containers/Translated'

import faviconDark from '~/assets/favicon-dark.png'
import faviconLight from '~/assets/favicon-light.png'

let App = class App extends React.PureComponent {
  render() {
    const { props } = this
    if (!props.initialized)
      return <LinearProgress />
    return <>
      {ReactDOM.createPortal(
        <link
          rel="shortcut icon"
          type="image/png"
          href={props.theme.palette.type === 'dark' ? faviconDark : faviconLight}
        />,
        document.head
      )}
      <AppWrapper theme={props.theme}>
        <AppHeader
          showDev={props.user.username}
          AppNavigationVisible={Boolean(props.user.username)}
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
              <Route path="/profile" component={ProfileView} />
              <Route path="/clients">
                <RecordEditorWithListView
                  recordType="Client"
                  primaryRecordProp="fullname"
                  secondaryRecordProp="note"
                />
              </Route>
              <Route path="/warehouse">
                <RecordEditorWithListView
                  recordType="Material"
                  primaryRecordProp="name"
                  secondaryRecordProp="art"
                />
              </Route>
              <Route path="/orders">
                <RecordEditorWithListView
                  recordType="Order"
                  primaryRecordProp="summary"
                  secondaryRecordProp="note"
                />
              </Route>
              <Route path="/tasks">
                <RecordEditorWithListView
                  recordType="Task"
                  primaryRecordProp="summary"
                  secondaryRecordProp="date"
                />
              </Route>
              <Route component={UnknownView} />
            </Switch>
          )
        }
      </AppWrapper >
    </>
  }
}

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