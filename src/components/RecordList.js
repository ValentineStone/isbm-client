import React from 'react'

import { Link, Route } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'

import ClientsIcon from '@material-ui/icons/Group'

import Translated from '~/containers/Translated'

function RecordList(props) {
  const activeProps = {
    variant: 'raised',
    color: 'primary',
    ...props.ActiveListItemProps
  }
  return (
    <List {...props.ListProps}>
      {props.records.map((record, index, array) => {
        const id = record[props.idKey] || record.id
        const isActive = Array.isArray(props.active)
          ? props.active.includes(id)
          : props.active === id
        const textClass = isActive
          ? props.classes.listItemTextSelected
          : props.classes.listItemText
        const onRecordClick = (...args) => {
          if (props.ListItemProps && props.ListItemProps.onClick)
            props.ListItemProps.onClick(...args)
          if (props.onSelected)
            props.onSelected(id, record, index, array)
        }
        return (
          <ListItem
            key={id}
            component={Button}
            {...(isActive && activeProps)}
            {...props.ListItemProps}
            onClick={onRecordClick}
          >
            <ListItemText
              primary={record[props.primaryKey]}
              secondary={record[props.secondaryKey]}
              classes={{ primary: textClass, secondary: textClass }}
            />
          </ListItem>
        )
      })}
    </ List>
  )
}


const styles = {
  listItemText: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textTransform: 'none'
  },
  listItemTextSelected: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textTransform: 'none',
    color: 'white'
  }
}

export default withStyles(styles)(RecordList)