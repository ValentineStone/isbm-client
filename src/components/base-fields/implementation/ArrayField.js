import React from 'react'
import ArrayFieldBase from '../ArrayField'
import contextify from '../contextify'

class ArrayField extends ArrayFieldBase { }

const implementation = {}
const Link = props => <button type="button" {...props} />
implementation.ChildList = props => <>
  <Link onClick={props.parent.addField}>Add Field</Link>
  <ol>{props.children}</ol>
</>
implementation.ChildList.displayName = 'ArrayFieldImplementation.ChildList'
implementation.EmptyChildListItem = props => <li>No Fields Present</li>
implementation.EmptyChildListItem.displayName =
  'ArrayFieldImplementation.EmptyChildListItem'
implementation.ChildListItem = props => (
  <li>
    <div>
      {props.isFirst ||
        <Link onClick={() => props.parent.moveFieldUp(props.name)}>
          Move Up
        </Link>
      }
      {props.isLast ||
        <Link onClick={() => props.parent.moveFieldDown(props.name)}>
          Move Down
        </Link>
      }
      <Link onClick={() => props.parent.removeField(props.name)}>Remove</Link>
    </div>
    {props.children}
  </li>
)
implementation.ChildListItem.displayName =
  'ArrayFieldImplementation.ChildListItem'

ArrayField.implementation = implementation

export default contextify({
  providesParent: true,
  providesNamePerChild: true,
  consumesName: true,
  consumesParent: true
})(ArrayField)