import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'

import { WithRoute } from '~/context/RouteContext'

export default function IconLink({ icon: Icon, action, to }) {
  if (to) return (
    <IconButton to={to} component={Link}>
      <WithRoute>
        {route =>
          <Icon
            color={
              route.location.pathname === to
                ? 'primary'
                : undefined
            }
          />
        }
      </WithRoute>
    </IconButton>
  )
  else return (
    <IconButton onClick={action}>
      <Icon />
    </IconButton>
  )
}