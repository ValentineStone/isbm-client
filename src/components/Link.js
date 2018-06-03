import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'

import cx from '~/utils/cx'

function Link({ classes, ...props }) {
  return <Link {...props} className={cx(classes.link, props.className)} />
}

const styles = {
  link: {
    textDecoration: 'none'
  }
}


export default withStyles(styles)(Link)