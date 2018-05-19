import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'

import { WithRoute } from '~/context/RouteContext'

export default function IconLink({ Icon, IconProps, ...props }) {
  if (props.to) return (
    <IconButton {...props} component={Link}>
      <WithRoute>
        {route =>
          <Icon
            color={
              route.location.pathname === props.to
                ? 'primary'
                : undefined
            }
            {...IconProps}
          />
        }
      </WithRoute>
    </IconButton>
  )
  else return (
    <IconButton {...props}>
      <Icon {...IconProps} />
    </IconButton>
  )
}