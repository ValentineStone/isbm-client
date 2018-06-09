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


const persistentLocationsJson = localStorage.getItem('persistentLocations')
const persistentLocations = persistentLocationsJson
  ? JSON.parse(persistentLocationsJson)
  : {}

export const withPersistentRoute = ({
  redirectProps,
  withRouteProps = false
}) => Component => {
  class withPersistentRoute extends React.Component {
    constructor(props) {
      super(props)
      this.initialRedirect = persistentLocations[this.props.location.pathname]
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
      persistentLocations[this.props.location.pathname] = this.props.location
      localStorage.setItem(
        'persistentLocations',
        JSON.stringify(persistentLocations)
      )
    }
  }
  withPersistentRoute.displayName =
    `withPersistentRoute(${displayNameOf(Component)})`
  return withRouteContext()(withPersistentRoute)
}