import React from 'react'
import withPropsBasedKey from '~/components/withPropsBasedKey'

import { Form } from 'react-form'
import TextField from '~/components/form/TextField'
import Inspector from '~/components/Inspector'
import Translated from '~/containers/Translated'



class ClientEditor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
  }
}


export default withPropsBasedKey({
  needsNewKey: (props, prevProps) => props.value !== prevProps.value
})(ClientEditor)