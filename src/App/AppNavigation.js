import React from 'react'
import { Link } from 'react-router-dom'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import StoreIcon from '@material-ui/icons/Store'
import SettingsIcon from '@material-ui/icons/Settings'
import ReceiptIcon from '@material-ui/icons/Receipt'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import CropOriginalIcon from '@material-ui/icons/CropOriginal'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LogOutIcon from '@material-ui/icons/ExitToApp'

import IconLink from '~/components/IconLink'
import TextLink from '~/components/TextLink'
import Translated from '~/containers/Translated'

class AppNavigation extends React.PureComponent {
  render() {
    return (
      <Grid container className={this.props.classes.toolbar}>
        <Grid item>
          <IconLink Icon={ReceiptIcon} to="/orders" />
          <IconLink Icon={CropOriginalIcon} to="/products" />
          <IconLink Icon={AccountCircleIcon} to="/clients" />
          <IconLink Icon={StoreIcon} to="/warehouse" />
          <IconLink Icon={AssignmentTurnedInIcon} to="/tasks" />
          <IconLink Icon={SettingsIcon} to="/settings" />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justify="flex-end"
          wrap="nowrap"
          classes={{
            container: this.props.classes.userControls
          }}
        >
          <Translated>
            {t =>
              <>
                <Typography className={this.props.classes.welcome}>
                  {t`Welcome`}
                </Typography>
                <TextLink to="/profile" underlined>
                  {this.props.user.alias}
                </TextLink>
                <IconLink
                  Icon={LogOutIcon}
                  onClick={this.props.logOutUser}
                />
              </>
            }
          </Translated>
        </Grid>
      </Grid>
    )
  }
}

const styles = {
  userControls: {
    width: 'unset',
    flex: 1
  },
  welcome: {
    marginRight: '.5em'
  },
  toolbar: {
    padding: '0 1em'
  }
}

export default withStyles(styles)(AppNavigation)