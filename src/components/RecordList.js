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
  render() {
    const activeProps = {
      //variant: 'raised',
      color: 'primary',
      ...this.props.ActiveListItemProps
    }
    return (
      <div
        className={cx(this.props.classes.root, this.props.className)}
        style={this.props.style}
      >
        {React.Children.count(this.props.children)
          ? (
            <Paper
              className={this.props.classes.children}
              {...this.props.ChildrenPaperProps}
            >
              {this.props.children}
            </Paper>
          )
          : null
        }
        <List
          className={this.props.classes.list}
          {...this.props.ListProps}
          style={{ overflow: 'auto' }}
        >
          {this.props.records.map((record, index, array) => {
            const id = record[this.props.idKey] || record.id
            const isActive = Array.isArray(this.props.active)
              ? this.props.active.includes(id)
              : this.props.active === id
            const onRecordClick = (...args) => {
              if (this.props.ListItemProps && this.props.ListItemProps.onClick)
                this.props.ListItemProps.onClick(...args)
              if (this.props.onRecordClick)
                this.props.onRecordClick(id, record, index, array)
            }
            return (
              <ListItem
                key={id}
                component={Button}
                {...this.props.ListItemProps}
                {...(isActive && activeProps)}
                onClick={onRecordClick}
              >
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      noWrap
                      color="inherit"
                      variant="subheading"
                      className={this.props.classes.listItemText}
                    >
                      {record[this.props.primaryKey]}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      noWrap
                      color="inherit"
                      variant="body1"
                      className={this.props.classes.listItemText}
                    >
                      {record[this.props.secondaryKey]}
                    </Typography>
                  }
                />
              </ListItem>
            )
          })}
        </ List>
      </div>
    )
  }
}


const styles = {
  listItemText: {
    textTransform: 'none'
  },
  children: {
    padding: 16
  },
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    flex: 1
  }
}

export default withStyles(styles)(RecordList)