import React from 'react'
import {
  Route as ReactRouterRoute,
  Switch as ReactRouterSwitch,
  Redirect
} from 'react-router-dom'

import displayNameOf from '~/utils/displayNameOf'

const RouteContext = React.createContext(null)
RouteContext.Provider.displayName = 'RouteContext.Provider'
RouteContext.Consumer.displayName = 'RouteContext.Consumer'
export default RouteContext

export function Provider(props) {
  return (
    <ReactRouterRoute {...props}>
      {route =>
        <RouteContext.Provider value={route}>
          {props.children}
        </RouteContext.Provider>
      }
    </ReactRouterRoute>
  )
}
Provider.displayName = 'RouteContextRootProvider'


export const withRouteContext = () => Component => {
  function WithRouteContext(props) {
    return (
      <RouteContext.Consumer>
        {route => <Component {...props} {...route} />}
      </RouteContext.Consumer>
    )
  }
  WithRouteContext.displayName = `withRouteContext(${displayNameOf(Component)})`
  return WithRouteContext
}

export const Route = withRouteContext()(ReactRouterRoute)
export const Switch = withRouteContext()(ReactRouterSwitch)

export const withPersistentRoute = ({
  redirectProps,
  withRouteProps = false
}) => Component => {
  let lastLocation = undefined
  class WithPersistentRoute extends React.Component {
    constructor(props) {
      super(props)
      this.initialRedirect = lastLocation
    }
    render() {
      const initialRedirect = this.initialRedirect
      this.initialRedirect = undefined
      const { match, location, history, ...componentProps } = this.props
      const routeProps = { match, location, history }
      if (initialRedirect)
        return <Redirect {...redirectProps} to={initialRedirect} />
      else
        return <Component {...this.props} {...(withRouteProps && routeProps)} />
    }
    componentDidUpdate() {
      lastLocation = this.props.location
    }
  }
  WithPersistentRoute.displayName =
    `withPersistentRoute(${displayNameOf(Component)})`
  return withRouteContext()(WithPersistentRoute)
}