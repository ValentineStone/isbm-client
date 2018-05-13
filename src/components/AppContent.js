import React from 'react'

import { Route } from 'react-router-dom'

//import ShapeshifterView from '~/views/Shapeshifter'
import RouteContext from '~/context/RouteContext'

export default class AppContent extends React.PureComponent {
  render() {
    return (
      <main style={{ padding: '1em', overflowX: 'auto' }}>
        <RouteContext.Consumer>
          {//() => <Route path="/" component={ShapeshifterView} />
          }
        </RouteContext.Consumer>
      </main>
    )
  }
}