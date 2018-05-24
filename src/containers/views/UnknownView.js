import React from 'react'

import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'
import Grid from '@material-ui/core/Grid'
import manRunGif from '~/assets/manrun.gif'

import Translated from '~/containers/Translated'

function Unknown(props) {
  const pathname = props.location.pathname.slice(1) || 'Main'
  const slashIndex = pathname.indexOf('/')
  const pageName = pathname[0].toUpperCase() + pathname.slice(1, slashIndex > 0 ? slashIndex : undefined)
  return (
    <Translated>
      {t =>
        <>
          <Typography variant="display1">
            {t`Error`} 404:
          </Typography>
          <Typography
            variant={
              props.width === 'xs'
                ? 'display3'
                : 'display4'
            }
          >
            {pageName}
          </Typography>
          <Typography variant="subheading">
            {t`This page does not exist, our staff is on the case`}
          </Typography>
        </>
      }
    </Translated>
  )
}

export default withWidth()(Unknown)