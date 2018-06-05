import React from 'react'
import { updateNavigation } from '~/actions/navigate'

export default class NavigationProvider extends React.Component {
  state = {}
  static getDerivedStateFromProps(props) {
    props.store.dispatch(updateNavigation())
    return null
  }
  render() {
    return this.props.children
  }
}