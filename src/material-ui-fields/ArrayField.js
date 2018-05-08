import React from 'react'
import ArrayFieldBase from '/react-base-fields/ArrayField.js'
import contextify from '/react-base-fields/contextify.js'

import List, { ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles'

import AddIcon from 'material-ui-icons/Add'
import RemoveIcon from 'material-ui-icons/Clear'
import MoveDownIcon from 'material-ui-icons/ArrowDownward'
import MoveUpIcon from 'material-ui-icons/ArrowUpward'

class ArrayField extends ArrayFieldBase { }

const implementation = {}

const childListStyles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

implementation.ChildList = props => (
  <List>
    <ListItem divider={Boolean(props.fieldCount)}>
      <Button
        fullWidth
        onClick={props.parent.addField}
      >
        <AddIcon className={props.addLabel ? props.classes.leftIcon : undefined} />
        {props.addLabel}
      </Button>
    </ListItem>
    {props.children}
  </List>
)
implementation.ChildList.displayName = 'ArrayFieldImplementation.ChildList'
implementation.ChildList = withStyles(childListStyles)(implementation.ChildList)

implementation.EmptyChildListItem =
  props => <ListItem />
implementation.EmptyChildListItem.displayName =
  'ArrayFieldImplementation.EmptyChildListItem'


const childListItemStyles = {
  listItemContainer: {
    width: '100%'
  },
  listItemButtons: {
    textAlign: 'right'
  }
}

implementation.ChildListItem = props => <>
  <ListItem divider={!props.isLast}>
    <div className={props.classes.listItemContainer}>
      {props.children}
      <div className={props.classes.listItemButtons}>
        {props.isFirst ||
          <IconButton onClick={() => props.parent.moveFieldUp(props.name)}>
            <MoveUpIcon />
          </IconButton>
        }
        {props.isLast ||
          <IconButton onClick={() => props.parent.moveFieldDown(props.name)}>
            <MoveDownIcon />
          </IconButton>
        }
        <IconButton onClick={() => props.parent.removeField(props.name)}>
          <RemoveIcon />
        </IconButton>
      </div>
    </div>
  </ListItem>
</>
implementation.ChildListItem.displayName =
  'ArrayFieldImplementation.ChildListItem'
implementation.ChildListItem = withStyles(childListItemStyles)(implementation.ChildListItem)

ArrayField.implementation = implementation

export default contextify({
  providesParent: true,
  providesNamePerChild: true,
  consumesName: true,
  consumesParent: true
})(ArrayField)