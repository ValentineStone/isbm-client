import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'

import RouteContext from '~/containers/RouteContext'

export default function IconLink({ icon: Icon, action, to }) {
  if (to) return (
    <IconButton to={to} component={Link}>
      <RouteContext.Consumer>
        {({ location: { pathname } }) =>
          <Icon color={pathname === to ? 'primary' : undefined} />
        }
      </RouteContext.Consumer>
    </IconButton>
  )
  else return (
    <IconButton onClick={action}>
      <Icon />
    </IconButton>
  )
}