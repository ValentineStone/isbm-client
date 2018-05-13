import React from 'react'

import Toolbar from 'material-ui/Toolbar'

import StoreIcon from 'material-ui-icons/Store'
import SettingsIcon from 'material-ui-icons/Settings'
import ReceiptIcon from 'material-ui-icons/Receipt'
import AssignmentTurnedInIcon from 'material-ui-icons/AssignmentTurnedIn'
import CropOriginalIcon from 'material-ui-icons/CropOriginal'
import AccountCircleIcon from 'material-ui-icons/AccountCircle'

import IconLink from './IconLink'

export default class AppNavigation extends React.PureComponent {
  render() {
    return (
      <Toolbar>
        <IconLink icon={ReceiptIcon} to="/orders" />
        <IconLink icon={CropOriginalIcon} to="/products" />
        <IconLink icon={AccountCircleIcon} to="/clients" />
        <IconLink icon={StoreIcon} to="/warehouse" />
        <IconLink icon={AssignmentTurnedInIcon} to="/tasks" />
        <IconLink icon={SettingsIcon} to="/settings" />
      </Toolbar>
    )
  }
}