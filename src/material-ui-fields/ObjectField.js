import React from 'react'
import ObjectFieldBase from '/react-base-fields/ObjectField'
import contextify from '/react-base-fields/contextify'

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

export default contextify({
  providesParent: true,
  forcesNameOverride: true,
  consumesName: true,
  consumesParent: true
})(ObjectField)