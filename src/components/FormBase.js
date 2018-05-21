import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import cx from '~/utils/cx'

function FormBase({
  underlay,
  classes,
  onSubmit,
  title,
  children,
  className,
  ...restProps
}) {
  const Base = underlay ? Paper : 'div'
  return (
    <Base
      {...restProps}
      className={cx(classes.root, className)}
    >
      <form onSubmit={onSubmit}>
        {title && (
          <Typography
            variant="headline"
            align="center"
            className={classes.title}
          >
            {title}
          </Typography>
        )}
        {children}
      </form>
    </Base>
  )
}

export default withStyles({
  root: {
    width: '100%',
    maxWidth: 400,
    margin: '0 auto',
    padding: '2em'
  },
  title: {
    padding: '.25em 1em'
  }
})(FormBase)