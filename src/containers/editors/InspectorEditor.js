import React from 'react'
import Inspector from '~/components/Inspector'

export default function InspectorEditor(props) {
  return (
    <Inspector expandLevel={1} noPaper data={props.formApi.values} />
  )
}