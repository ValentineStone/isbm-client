import React from 'react'
import Inspector from '~/components/Inspector'

export default function InspectorEditor(props) {
  return (
    <Inspector
      noPaper
      expandLevel={1}
      data={props.formApi.values}
    />
  )
}