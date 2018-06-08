import React from 'react'
import { Link, Route } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'

import RouteContext from '~/context/router'
import pure from '~/utils/pure'

function IconLink({
  Icon,
  IconProps,
  activeColor = 'primary',
  ...props
}) {
  if (props.to) return (
    <IconButton {...props} component={Link}>
      <RouteContext.Consumer>
        {route =>
          <Icon
            color={
              route.location.pathname.startsWith(props.to)
                ? activeColor
                : undefined
            }
            {...IconProps}
          />
        }
      </RouteContext.Consumer>
    </IconButton>
  )
  else return (
    <IconButton {...props}>
      <Icon {...IconProps} />
    </IconButton>
  )
}

export default IconLink