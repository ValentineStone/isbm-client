import React from 'react'

import Generic from './Generic.js'
import Demo from './Demo.js'
import Development from '/Development.js'
import Calcuator from './Calculator.js'

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
        return <Generic pageName={pageName} />
      case 'calculator':
        return <Calcuator />
      case 'development':
      default:
        return <Development />
    }
  }
}