import React from 'react'
import { withStyles } from '@material-ui/core/styles'

function AppContent({ classes, ...props }) {
  return (
    <main className={props.classes.main} {...props} />
  )
}

const styles = {
  main: {
    padding: 8
  }
}


export default withStyles(styles)(AppContent)