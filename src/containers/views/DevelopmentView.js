import React from 'react'

import Typography from '@material-ui/core/Typography'
import PrintIcon from '@material-ui/icons/Print'
import withWidth from '@material-ui/core/withWidth'
import { withTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

import Inspector from '~/components/Inspector'

function Development(props) {
  return (
    <>
      <IconButton>
        <PrintIcon />
      </IconButton>
      <Inspector data={props.theme} />
    </>
  )
}

export default withWidth()(
  withTheme()(
    Development
  )
)