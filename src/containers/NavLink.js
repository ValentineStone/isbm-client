import React from 'react'
import navigate from '~/actions/navigate'
import { connect } from 'react-redux'


export default class NavLink extends React.Component {
  onLinkClick = () => this.props.navigate(this.props.to)
  render() {
    const { to, navigate, props, component: Component = 'a' } = this.props
    return <Component {...props} onClick={this.onLinkClick} />
  }
}

export default connect(
  null,
  { navigate }
)(NavLink)