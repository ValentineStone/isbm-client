import React from 'react'

import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'
import { withTheme } from '@material-ui/core/styles'

import Inspector from '~/components/Inspector'

function Development(props) {
  return (
    <Inspector data={props.theme} expandLevel={4} />
  )
}

export default withWidth()(
  withTheme()(
    Development
  )
)