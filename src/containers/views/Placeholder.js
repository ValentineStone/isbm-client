import React from 'react'

import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'

function Placeholder(props) {
  const pathname = props.location.pathname.slice(1) || 'Main'
  const slashIndex = pathname.indexOf('/')
  const pageName = pathname[0].toUpperCase() + pathname.slice(1, slashIndex > 0 ? slashIndex : undefined)
  return (
    <div>
      <Typography
        variant={
          props.width === 'xs'
            ? 'display3'
            : 'display4'
        }
      >
        {pageName}
      </Typography>
      <Typography color="textSecondary" component="div">
        <pre>
          {JSON.stringify(props, null, 2)}
        </pre>
      </Typography>
    </div>
  )
}

export default withWidth()(Placeholder)