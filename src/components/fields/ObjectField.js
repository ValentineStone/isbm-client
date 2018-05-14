import React from 'react'
import ObjectFieldBase from '../base-fields/ObjectField'
import contextify from '../base-fields/contextify'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

class ObjectField extends ObjectFieldBase { }


const implementation = {}



implementation.ChildList = props => (
  <List>
    {props.children}
  </List>
)
implementation.ChildList.displayName =
  'ObjectFieldImplementation.ChildList'

implementation.EmptyChildListItem = props => (
  <ListItem>
    No Fields Present
  </ListItem>
)
implementation.EmptyChildListItem.displayName =
  'ObjectFieldImplementation.EmptyChildListItem'


const childListItemStyles = {
  listItemRoot: {
    display: 'block'
  },
  listItemButtons: {
    textAlign: 'right'
  }
}

implementation.ChildListItem = props => (
  <ListItem disableGutters dense classes={{ root: props.classes.listItemRoot }}>
    {props.nameLabels && <Typography variant="button">{props.name}</Typography>}
    {props.children}
  </ListItem>
)
implementation.ChildListItem.displayName =
  'ObjectFieldImplementation.ChildListItem'
implementation.ChildListItem =
  withStyles(childListItemStyles)(implementation.ChildListItem)

ObjectField.implementation = implementation

export default contextify({
  providesParent: true,
  forcesNameOverride: true,
  consumesName: true,
  consumesParent: true
})(ObjectField)