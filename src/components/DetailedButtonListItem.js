import React from 'react'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ContainerDimensions from 'react-container-dimensions'
import Infinite from 'react-infinite'

import cx from '~/utils/cx'


import CircularProgress from '@material-ui/core/CircularProgress'

const RECORD_HEIGHT = 68
const HIDDEN_RECORDS_MESSAGE_HEIGHT = 40


class InfiniteRecordListItem extends React.Component {
  render() {
    const {
      primary,
      secondary,
      className,
      ...props
    } = this.props
    return (
      <ListItem component={Button} {...props} className={className}>
        <ListItemText
          disableTypography
          primary={
            <Typography
              noWrap
              color="inherit"
              variant="subheading"
              children={primary}
            />
          }
          secondary={
            <Typography
              noWrap
              color="inherit"
              variant="body1"
              children={secondary}
            />
          }
        />
      </ListItem>
    )
  }
}