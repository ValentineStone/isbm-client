import React from 'react'
import ObjectFieldBase from './base/ObjectField.js'
import parentContext from './parentContext.js'

class ObjectField extends ObjectFieldBase { }

const implementation = {}
implementation.ChildList = 'ul'
implementation.EmptyChildListItem = props => <li>No Fields Present</li>
implementation.EmptyChildListItem.displayName =
  'ObjectFieldImplementation.EmptyChildListItem'
implementation.ChildListItem = props => (
  <li>
    <div>{props.name}</div>
    {props.children}
  </li>
)
implementation.ChildListItem.displayName =
  'ObjectFieldImplementation.ChildListItem'

ObjectField.implementation = implementation

export default parentContext.contextify({
  consumer: true,
  provider: true
})(ObjectField)