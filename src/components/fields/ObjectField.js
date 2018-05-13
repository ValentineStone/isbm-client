import React from 'react'
import ObjectFieldBase from '~/react-base-fields/ObjectField'
import contextify from '~/react-base-fields/contextify'

import List, { ListItem } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

class ObjectField extends ObjectFieldBase { }

const implementation = {}

implementation.ChildList = props => <List>{props.children}</List>

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
  <ListItem classes={{ root: props.classes.listItemRoot }}>
    <Typography
      variant="button"
    >
      {props.name}
    </Typography>
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