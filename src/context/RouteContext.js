import React, { Component } from 'react'

import displayNameOf from '~/utils/displayNameOf'

const RouteContext = React.createContext(null)

export default RouteContext
export const withRouteContextConsumer = () => Component => {
  const HOC = props => (
    <RouteContext.Consumer>
      {route => <Component {...props} route={route} />}
    </RouteContext.Consumer>
  )
  HOC.displayName = `WithRoute(${displayNameOf(Component)})`
  return HOC
}