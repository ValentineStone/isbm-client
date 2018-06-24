import React from 'react'

import { Link } from 'react-router-dom'

import connectRoute from '~/components/connectRoute'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import Translated from '~/containers/Translated'

let RecordListView = class RecordListView extends React.PureComponent {
  render() {
    const { width, classes } = this.props
    const thinPanelVisible = width !== 'xs' || this.props.panel !== 'thin'
    const flexPanelVisible = width !== 'xs' || this.props.panel === 'flex'
    return (
      <>
        {thinPanelVisible &&
          <Paper className={classes.thinHeader} elevation={0}>
            <Typography variant="subheading" color="secondary">
              <Translated>app.name</Translated>
            </Typography>
          </Paper>
        }
        {thinPanelVisible &&
          <section className={classes.thinPanel}>
            <Typography>Thin panel</Typography>
            <TextField label="Search" fullWidth />
            <Button fullWidth color="primary">Add item</Button>
            <Button fullWidth color="secondary">Edit item</Button>
            <Button fullWidth color="primary">Delete item</Button>
            <Button fullWidth color="secondary">Select multiple</Button>
          </section>
        }
        {flexPanelVisible &&
          <Paper className={classes.flexPanel} component="section">
            <Typography>Flex panel</Typography>
          </Paper>
        }
      </>
    )
  }
}

const styles = {
  thinPanel: {
    width: '100%',
    maxWidth: 300,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    bottom: 0,
    top: 96,
    padding: '0 8px',
    '@media (max-width:599.95px)': {
      maxWidth: 'unset'
    },
    '& > *': {
      marginBottom: 8
    },
  },
  thinHeader: {
    position: 'fixed',
    top: 48,
    width: 300,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexPanel: {
    marginLeft: 300,
    padding: 16,
    '@media (max-width:599.95px)': {
      marginLeft: 'unset',
    },
  },
}

RecordListView = withStyles(styles)(
  withWidth()(
    RecordListView
  )
)

export default RecordListView