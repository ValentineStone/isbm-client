import React from 'react'
import Link from '~/containers/NavLink'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import RouteContext from '~/context/RouteContext'

function TextLink({
  classes,
  underlined,
  activeColor = 'primary',
  color: defaultColor,
  ...props
}) {
  if (props.to) return (
    <RouteContext.Consumer>
      {route =>
        <Typography
          component={Link}
          className={!underlined ? classes.link : undefined}
          color={
            route.location.pathname === props.to
              ? activeColor
              : defaultColor
          }
          {...props}
        />
      }
    </RouteContext.Consumer>
  )
  else return (
    <Typography {...props} />
  )
}

const styles = {
  link: {
    textDecoration: 'none'
  }
}


export default withStyles(styles)(TextLink)