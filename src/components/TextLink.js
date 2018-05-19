import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { WithRoute } from '~/context/RouteContext'

function TextLink({ classes, underlined, ...props }) {
  if (props.to) return (
    <WithRoute>
      {route =>
        <Typography
          component={Link}
          className={!underlined ? classes.link : undefined}
          color={
            route.location.pathname === props.to
              ? 'primary'
              : undefined
          }
          {...props}
        />
      }
    </WithRoute>
  )
  else return (
    <Typography {...props} />
  )
}

const styles = theme => ({
  link: {
    textDecoration: 'none'
  }
})


export default withStyles(styles)(TextLink)