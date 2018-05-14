import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

function FormBase(props) {
  const Base = props.underlay ? Paper : 'div'
  return (
    <Base className={props.classes.root}>
      <form onSubmit={props.onSubmit}>
        {props.title && (
          <Typography
            variant="headline"
            align="center"
            className={props.classes.title}
          >
            {props.title}
          </Typography>
        )}
        {props.children}
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