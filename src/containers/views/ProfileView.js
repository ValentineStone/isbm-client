import React from 'react'

import LogOutIcon from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'

import IconLink from '~/components/IconLink'
import TextLink from '~/components/TextLink'
import Translated from '~/containers/Translated'

function ProfileView(props) {
  return <>
    <Typography>
      {props.user.alias}
    </Typography>
    <IconLink
      Icon={LogOutIcon}
      onClick={props.logOutUser}
    />
  </>
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