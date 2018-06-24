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

import EditorView from '~/containers/views/RecordEditorWithListView'
import InspectorEditor from '~/containers/editors/InspectorEditor'
import ClientEditor from '~/containers/editors/ClientEditor'

import Translated from '~/containers/Translated'

import faviconDark from '~/assets/favicon-dark.png'
import faviconLight from '~/assets/favicon-light.png'

function clientTransform(record) {
  const displayName = []
  if (record.firstName) displayName.push(record.firstName)
  if (record.lastName) displayName.push(record.lastName)
  record.displayName = displayName.join(' ') || '*'
  return record
}

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
                <EditorView
                  recordType="Client"
                  primaryRecordProp="displayName"
                  secondaryRecordProp="note"
                  recordTransform={clientTransform}
                  Editor={ClientEditor}
                />
              </Route>
              <Route path="/warehouse">
                <EditorView
                  recordType="Material"
                  primaryRecordProp="name"
                  secondaryRecordProp="art"
                  Editor={InspectorEditor}
                />
              </Route>
              <Route path="/orders">
                <EditorView
                  recordType="Order"
                  primaryRecordProp="summary"
                  secondaryRecordProp="note"
                  Editor={InspectorEditor}
                />
              </Route>
              <Route path="/tasks">
                <EditorView
                  recordType="Task"
                  primaryRecordProp="summary"
                  secondaryRecordProp="date"
                  Editor={InspectorEditor}
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