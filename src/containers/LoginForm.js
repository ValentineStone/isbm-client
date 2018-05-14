import React from 'react'
import LoginForm from '~/components/LoginForm'
import { connect } from 'react-redux'
import authenticateUser from '~/actions/authenticateUser'

export default connect(
  undefined,
  { onSubmit: authenticateUser }
)(LoginForm)