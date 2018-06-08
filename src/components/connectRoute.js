import React from 'react'
import qs from 'qs'
import displayNameOf from '~/utils/displayNameOf'
import { withPersistentRoute, withRoute } from '~/context/router'

/*TODO: optimize rerender, add ability to decide to push or replace href*/

const searchToParams = search => qs.parse(
  search, {
    ignoreQueryPrefix: true,
    strictNullHandling: true
  }
)

const paramsToSearch = params => qs.stringify(
  params, {
    addQueryPrefix: true,
    strictNullHandling: true
  }
)

const connectRoute = ({
  mapParamsToProps = v => v,
  setParamsProp = 'setParams',
  withRouteProps = false,
  withPersistentRoute: persistent = false
}) => Component => {
  class ConnectRoute extends React.Component {
    static getDerivedStateFromProps(props, state) {
      if (props.location.search !== state.search) {
        return {
          params: searchToParams(props.location.search),
          search: props.location.search
        }
      }
      else return null
    }
    constructor(props) {
      super(props)
      this.state = {}
      this.setParams = { [setParamsProp]: this.setParams }
    }
    setParams = updater => {
      this.setState(state => {
        let params
        if (typeof updater === 'function') {
          params = Object.assign(
            state.params,
            updater(state.params)
          )
        }
        else {
          params = Object.assign(state.params, updater)
        }
        return { params }
      })
    }
    componentDidUpdate(prevProps, prevState) {
      const search = paramsToSearch(this.state.params)
      if (this.state.search !== search)
        this.props.history.replace(search || '?')
    }
    render() {
      const { match, location, history, ...componentProps } = this.props
      const routeProps = { match, location, history }
      return (
        <Component
          {...componentProps}
          {...(withRouteProps && routeProps)}
          {...mapParamsToProps(this.state.params)}
          {...this.setParams}
        />
      )
    }
  }
  ConnectRoute.displayName = `connectRoute(${displayNameOf(Component)})`
  return persistent
    ? withPersistentRoute({ withRouteProps: true })(ConnectRoute)
    : withRoute()(ConnectRoute)
}

export default connectRoute