import React from 'react'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import cx from '~/utils/cx'

class RecordList extends React.PureComponent {
  handleRecordClick = (record, index, array) => (...args) => {
    if (this.props.ListItemProps && this.props.ListItemProps.onClick)
      this.props.ListItemProps.onClick(...args)
    if (this.props.onRecordClick)
      this.props.onRecordClick(record, index, array)
  }

  render() {
    const activeProps = {
      //variant: 'raised',
      color: 'primary',
      ...this.props.ActiveListItemProps
    }
    return (
      <List
        {...this.props.ListProps}
      >
        {this.props.records.map((record, index, array) => {
          const id = record[this.props.idKey] || record.id
          const isActive = Array.isArray(this.props.active)
            ? this.props.active.includes(id)
            : this.props.active === id
          return (
            <ListItem
              key={id}
              component={Button}
              {...this.props.ListItemProps}
              {...(isActive && activeProps)}
              onClick={this.handleRecordClick(record, index, array)}
            >
              <ListItemText
                disableTypography
                className={this.props.classes.listItemText}
                primary={
                  <Typography
                    noWrap
                    color="inherit"
                    variant="subheading"
                    children={record[this.props.primaryKey]}
                  />
                }
                secondary={
                  <Typography
                    noWrap
                    color="inherit"
                    variant="body1"
                    children={record[this.props.secondaryKey]}
                  />
                }
              />
            </ListItem>
          )
        })}
      </ List>
    )
  }
}


const styles = {
  listItemText: {
    textTransform: 'none'
  }
}

export default withStyles(styles)(RecordList)