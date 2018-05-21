import React from 'react'

import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'

function Development(props) {
  return (
    <Typography variant="display4">
      {props.width}
    </Typography>
  )
}

export default withWidth()(Development)