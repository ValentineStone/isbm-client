import React from 'react'

import Generic from './Generic'
import Development from '/Dev'

export default class ShapeshifterView extends React.PureComponent {
  render() {
    const pageName = this.props.location.pathname.slice(1)
    switch (pageName) {
      case 'orders':
      case 'products':
      case 'clients':
      case 'warehouse':
      case 'tasks':
      case 'settings':
      case 'calculator':
        return <Generic pageName={pageName} />
      case 'development':
      default:
        return <Development />
    }
  }
}