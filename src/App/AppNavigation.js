import React from 'react'
import { Link } from 'react-router-dom'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import AppBar from '@material-ui/core/AppBar'

import WarehouseIcon from '@material-ui/icons/Store'
import SettingsIcon from '@material-ui/icons/SettingsSharp'
import ReceiptIcon from '@material-ui/icons/Receipt'
import TasksIcon from '@material-ui/icons/AssignmentTurnedIn'
import ProductsIcon from '@material-ui/icons/CropOriginal'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import ClientsIcon from '@material-ui/icons/Group'
import LogOutIcon from '@material-ui/icons/ExitToApp'

import IconLink from '~/components/IconLink'
import TextLink from '~/components/TextLink'
import Translated from '~/containers/Translated'

import cx from '~/utils/cx'

class AppNavigation extends React.PureComponent {
  render() {
    return (
      <AppBar
        position="sticky"
        color="default"
        className={this.props.classes.appBar}
      >
        <Grid
          container
          className={this.props.classes.toolbar}
          justify={this.props.width === 'xs' ? 'center' : undefined}
        >
          <Grid item>
            <IconLink Icon={ReceiptIcon} to="/orders" />
            {/*<IconLink Icon={ProductsIcon} to="/products" />*/}
            <IconLink Icon={ClientsIcon} to="/clients" />
            <IconLink Icon={WarehouseIcon} to="/warehouse" />
            <IconLink Icon={TasksIcon} to="/tasks" />
            <IconLink Icon={ProfileIcon} to="/profile" />
            <IconLink Icon={SettingsIcon} to="/settings" />
          </Grid>
          {this.props.width !== 'xs' &&
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
              <TextLink to="/profile" underlined>
                {this.props.user.alias}
              </TextLink>
              <IconLink
                Icon={LogOutIcon}
                onClick={this.props.logOutUser}
              />
            </Grid>
          }
        </Grid>
      </AppBar>
    )
  }
}

const styles = theme => ({
  userControls: {
    width: 'unset',
    flex: 1
  },
  toolbar: {
    padding: '0 8px'
  },
  appBar: {
    '@media print': { display: 'none !important' },
    background: theme.palette.background.paper
  }
})

export default withStyles(styles)(withWidth()(AppNavigation))