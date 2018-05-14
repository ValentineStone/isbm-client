import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { WithRoute } from '~/context/RouteContext'

function AppContent(props) {
  return (
    <main className={props.classes.main}>
      {props.children}
    </main>
  )
}

const styles = {
  main: {
    padding: '1em',
    overflowX: 'auto'
  }
}


export default withStyles(styles)(AppContent)