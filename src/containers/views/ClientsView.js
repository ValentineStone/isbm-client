import React from 'react'

import { Link, Route } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import ClientsIcon from '@material-ui/icons/Group'

import Translated from '~/containers/Translated'
import RecordList from '~/components/RecordList'

const list = [{
  id: String(Math.random()),
  fullname: 'Jhon Bob Smith',
  latestOrder: '12.02.2018 Blue frame with pink flowers, Rainbow Dash, Pinkipe Pie, Fluttershy'
}, {
  id: String(Math.random()),
  fullname: 'Leonid Valentine Olegovich Romanovsky',
  latestOrder: '28.04.2018 Print of Twilight Sparkle, Rarity & Applejack, heavy metal frame'
}, {
  id: String(Math.random()),
  fullname: 'Vegtam Rainbow',
  latestOrder: '21.04.2018 Print of family'
}, {
  id: String(Math.random()),
  fullname: 'Painkie Pie',
  latestOrder: '02.05.2018 Mirror framed with pink'
}, {
  id: String(Math.random()),
  fullname: 'Jhon Bob Smith',
  latestOrder: '12.02.2018 Blue frame with pink flowers, Rainbow Dash, Pinkipe Pie, Fluttershy'
}, {
  id: String(Math.random()),
  fullname: 'Leonid Valentine Olegovich Romanovsky',
  latestOrder: '28.04.2018 Print of Twilight Sparkle, Rarity & Applejack, heavy metal frame'
}, {
  id: String(Math.random()),
  fullname: 'Vegtam Rainbow',
  latestOrder: '21.04.2018 Print of family'
}, {
  id: String(Math.random()),
  fullname: 'Painkie Pie',
  latestOrder: '02.05.2018 Mirror framed with pink'
}, {
  id: String(Math.random()),
  fullname: 'Jhon Bob Smith',
  latestOrder: '12.02.2018 Blue frame with pink flowers, Rainbow Dash, Pinkipe Pie, Fluttershy'
}, {
  id: String(Math.random()),
  fullname: 'Leonid Valentine Olegovich Romanovsky',
  latestOrder: '28.04.2018 Print of Twilight Sparkle, Rarity & Applejack, heavy metal frame'
}, {
  id: String(Math.random()),
  fullname: 'Vegtam Rainbow',
  latestOrder: '21.04.2018 Print of family'
}, {
  id: String(Math.random()),
  fullname: 'Painkie Pie',
  latestOrder: '02.05.2018 Mirror framed with pink'
}, {
  id: String(Math.random()),
  fullname: 'Jhon Bob Smith',
  latestOrder: '12.02.2018 Blue frame with pink flowers, Rainbow Dash, Pinkipe Pie, Fluttershy'
}, {
  id: String(Math.random()),
  fullname: 'Jhon Bob Smith',
  latestOrder: '12.02.2018 Blue frame with pink flowers, Rainbow Dash, Pinkipe Pie, Fluttershy'
}, {
  id: String(Math.random()),
  fullname: 'Jhon Bob Smith',
  latestOrder: '12.02.2018 Blue frame with pink flowers, Rainbow Dash, Pinkipe Pie, Fluttershy'
}]

function ClientsView(props) {
  return (
    <Route path="/clients/:id">
      {({ match, history }) => {
        const selectedId = match ? match.params.id : undefined
        const selectedItem = list.find(v => v.id === selectedId)
        const listVisible = props.width !== 'xs' || !selectedId
        const editorVisible = props.width !== 'xs' || selectedId
        const EditorBase = props.width === 'xs' ? 'div' : Paper
        return (
          <Grid container spacing={8} wrap="nowrap">
            {listVisible &&
              <Grid item className={props.classes.listColumn}>
                <RecordList
                  ListProps={{ disablePadding: true }}
                  primaryKey="fullname"
                  secondaryKey="latestOrder"
                  records={list}
                  active={match && match.params.id}
                  onSelected={id => history.push(`/clients/${id}`)}
                />
              </Grid>
            }
            {editorVisible &&
              <Grid item className={props.classes.editorColumn} zeroMinWidth /*style={{ marginLeft: 300 }}*/>
                <EditorBase className={props.classes.editorPaper}>
                  {!listVisible &&
                    <Button to="/clients" component={Link}>
                      Back to list
                  </Button>
                  }
                  {selectedItem
                    ? (
                      <Typography component="pre" style={{ overflow: 'auto' }}>
                        {JSON.stringify(selectedItem, null, 2)}
                      </Typography>
                    )
                    : (
                      <Typography variant="display1">
                        Select an item
                    </Typography>
                    )
                  }
                </EditorBase>
              </Grid>
            }
          </Grid>
        )
      }}
    </Route>
  )
}

const styles = theme => ({
  listColumn: {
    maxWidth: 300,
    width: '100%',
    /*
    position: 'fixed',
    top: 112,
    left: 0,
    maxHeight: 'calc(100% - 112px)',
    overflow: 'auto',
    */
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%'
    }
  },
  editorColumn: {
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  editorPaper: {
    padding: 16
  }
})

export default withStyles(styles)(withWidth()(ClientsView))