import React from 'react'

import LogOutIcon from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import IconLink from '~/components/IconLink'
import TextLink from '~/components/TextLink'
import Translated from '~/containers/Translated'

function ProfileView(props) {
  return (
    <div style={{ padding: 16 }}>
      <Typography
        variant="title"
        color="secondary"
        align="center"
        gutterBottom
      >
        {props.user.alias}
      </Typography>
      <Button
        style={{ margin: 'auto', display: 'block' }}
        onClick={props.logOutUser}
      >
        <Translated>Log out</Translated>
      </Button>
    </div>
  )
}

import { connect } from 'react-redux'
import logOutUser from '~/actions/logOutUser'

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  { logOutUser }
)(ProfileView)