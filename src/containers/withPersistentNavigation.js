import React from 'react'
import displayNameOf from '~/utils/displayNameOf'
import withNavigation from './withNavigation'

const withPersistentNavigation = () => Component => {
  let lastNavigation = undefined
  let HOC = class WithPersistentNavigation extends React.Component {
    static getDerivedStateFromProps(props) {
      lastNavigation = props.navigation
      return null
    }
    constructor(props) {
      super(props)
      this.initialyNavigateTo = lastNavigation
      this.state = {}
    }
    componentDidMount() {
      if (this.initialyNavigateTo) {
        this.props.navigate(
          this.initialyNavigateTo.pathname,
          this.initialyNavigateTo.params,
          { replace: true }
        )
      }
    }
    render() {
      return <Component {...this.props} />
    }
  }
  HOC.displayName = `withPersistentNavigation(${displayNameOf(Component)})`
  HOC = withNavigation()(HOC)
  return HOC
}

export default withPersistentNavigation