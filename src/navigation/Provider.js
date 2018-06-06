import React from 'react'
import NavigationContext from './NavigationContext'
import { getNavState, isSameNavState } from './navState'
import navigate from './navigate'
import isEqual from 'lodash/isEqual'

export class NavigationProvider extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { nav: this.createNav(getNavState()) }
  }
  componentDidMount() {
    window.addEventListener(
      'onpopstate',
      this.onpopstateListener,
      { passive: true }
    )
  }
  componentWillUnmount() {
    window.removeEventListenerstener(
      'onpopstate',
      this.onpopstateListener
    )
  }
  render() {
    return (
      <NavigationContext.Provider value={this.state.nav}>
        {this.props.children}
      </NavigationContext.Provider>
    )
  }
  createNav = navState => Object.assign(
    options => this.navigate(options, navState),
    navState
  )
  onpopstateListener = () => this.handleNavStateChange()
  handleNavStateChange = (newNavState = getNavState()) => {
    this.setState(state => {
      if (isSameNavState(newNavState, state.nav))
        return null
      else {
        return { nav: this.createNav() }
      }
    })
  }

  navigate(options, navState) {
    if (typeof options === 'string')
      options = { path: options }
    const newNavState = navigate(options, navState)
    handleNavStateChange(newNavState)
  }
}