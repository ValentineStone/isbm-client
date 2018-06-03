import React from 'react'

import displayNameOf from './displayNameOf'

export default () => FunctionalComponent => {
  const Component = class extends React.PureComponent {
    render = () => <FunctionalComponent {...this.props} />
  }
  Component.displayName = `pure(${displayNameOf(FunctionalComponent)})`
  return Component
}