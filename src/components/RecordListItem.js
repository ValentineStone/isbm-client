import React from 'react'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { AutoSizer, List as AutoList } from 'react-virtualized'

import cx from '~/utils/cx'


class LongRecordList extends React.PureComponent {
  handleRecordClick = (record, index, array) => (...args) => {
    if (this.props.ListItemProps && this.props.ListItemProps.onClick)
      this.props.ListItemProps.onClick(...args)
    if (this.props.onRecordClick)
      this.props.onRecordClick(record, index, array)
  }

  renderRecord = ({ index, key, style }) => {
    const array = this.props.records
    const record = array[index]
    const id = record[this.props.idKey] || record.id
    const isActive = Array.isArray(this.props.active)
      ? this.props.active.includes(id)
      : this.props.active === id

    let activeProps = undefined
    if (isActive) {
      activeProps = {
        color: 'primary',
        ...this.props.ActiveListItemProps
      }
    }

    let listItemStyle = style
    if (isActive) {
      listItemStyle = {
        ...activeProps.style,
        ...listItemStyle
      }
    }
    if (this.props.ListItemProps && this.props.ListItemProps.style) {
      listItemStyle = {
        ...this.props.ListItemProps.style,
        ...listItemStyle
      }
    }
    return (
      <ListItem
        key={key}
        component={Button}
        {...this.props.ListItemProps}
        {...activeProps}
        style={listItemStyle}
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
  }

  render() {
    return (
      <List
        {...this.props.ListProps}
        className={cx(
          this.props.classes.root,
          this.props.ListProps && this.props.ListProps.className
        )}
      >
        <AutoSizer>
          {({ width, height }) => {
            return (
              <AutoList
                width={width}
                height={height}
                rowHeight={70}
                rowCount={this.props.records.length}
                rowRenderer={this.renderRecord}
                className={this.props.classes.noFocusOutline}
                rerenderOn_active={this.props.active}
              />
            )
          }
          }
        </AutoSizer>
      </ List>
    )
  }
}


const styles = {
  listItemText: {
    textTransform: 'none'
  },
  noFocusOutline: {
    '&:focus': {
      outline: 'none'
    }
  },
  root: {
    flex: 1,
    overflow: 'hidden'
  }
}

export default withStyles(styles)(LongRecordList)