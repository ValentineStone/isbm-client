import React from 'react'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { AutoSizer } from 'react-virtualized'
import Infinite from 'react-infinite'

import cx from '~/utils/cx'


class InfiniteRecordListItem extends React.Component {
  constructor(props) {
    super(props)
    console.log('constructor(InfiniteRecordListItem)')
  }
  render() {
    const {
      primary,
      secondary,
      classes,
      noTextTransformClassName,
      ...props
    } = this.props
    return (
      <ListItem component={Button} {...props}>
        <ListItemText
          disableTypography
          className={noTextTransformClassName}
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


class InfiniteRecordList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.IndexedRecord = ({ index }) =>
      this.renderRecord(index)
    this.IndexedRecord.displayName = 'IndexedRecord'
  }

  listRef = node => console.log(node)

  handleRecordClick = (record, index, array) => (...args) => {
    if (this.props.ListItemProps && this.props.ListItemProps.onClick)
      this.props.ListItemProps.onClick(...args)
    if (this.props.onRecordClick)
      this.props.onRecordClick(record, index, array)
  }

  renderRecord = index => {
    const records = this.props.records
    const record = records[index]
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

    let listItemStyle
    if (isActive) {
      listItemStyle = activeProps.style
    }
    if (this.props.ListItemProps && this.props.ListItemProps.style) {
      listItemStyle = {
        ...this.props.ListItemProps.style,
        ...listItemStyle
      }
    }
    return (
      <InfiniteRecordListItem
        {...this.props.ListItemProps}
        {...activeProps}
        style={listItemStyle}
        onClick={this.handleRecordClick(record, index, records)}
        primary={record[this.props.primaryKey]}
        secondary={record[this.props.secondaryKey]}
        noTextTransformClassName={this.props.classes.noTextTransform}
      />
    )
  }

  renderPreRenderedRecord = (record, index) => React.createElement(
    this.IndexedRecord,
    { index, key: index }
  )

  render() {
    return (
      <List
        {...this.props.ListProps}
        className={cx(
          this.props.classes.root,
          this.props.ListProps && this.props.ListProps.className
        )}
        ref={this.listRef}
      >
        <AutoSizer>
          {({ width, height }) =>
            <div style={{ width }}>
              <Infinite
                containerHeight={height || 141}
                elementHeight={70}
              >
                {this.props.records.map(this.renderPreRenderedRecord)}
              </Infinite>
            </div>
          }
        </AutoSizer>
      </ List>
    )
  }
}


const styles = {
  noTextTransform: {
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

export default withStyles(styles)(InfiniteRecordList)