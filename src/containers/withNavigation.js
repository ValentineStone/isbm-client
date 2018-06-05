import React from 'react'
import { connect } from 'react-redux'
import displayNameOf from '~/utils/displayNameOf'
import navigate from '~/actions/navigate'

const withNavigation = () => Component => {
  const HOC = connect(
    ({ navigation }) => ({ navigation }),
    { navigate }
  )(Component)
  HOC.displayName = `withNavigation(${displayNameOf(Component)})`
  return HOC
}

export default withNavigation