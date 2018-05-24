import React from 'react'

import { Link, Route, Redirect } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
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
}]
for (let i = 0; i < 10; i++)
  list.push({
    id: String(Math.random()),
    fullname: 'Customer ' + i,
    latestOrder: 'Order ' + i
  })

class ClientsView extends React.Component {
  state = { filter: '' }
  render() {
    return (
      <Route path="/clients/:id">
        {({ match, history }) => {
          const selectedId = match ? match.params.id : undefined
          const selectedItem = list.find(v => v.id === selectedId)
          const listVisible = this.props.width !== 'xs' || !selectedId
          const editorVisible = this.props.width !== 'xs' || selectedId
          const listHeaderVisible = this.props.width !== 'xs' && listVisible
          const EditorBase = this.props.width === 'xs' ? 'div' : Paper
          return (
            <div className={this.props.classes.root}>
              {listHeaderVisible &&
                <AppBar
                  position="static"
                  color="default"
                  elevation={0}
                  className={this.props.classes.listHeader}
                >
                  <Typography variant="display1">
                    Clients
                  </Typography>
                </AppBar>
              }
              {listVisible &&
                <div className={this.props.classes.listColumn}>
                  <Paper style={{ position: 'sticky', top: 0, padding: 16, zIndex: 1 }}>
                    <TextField
                      placeholder="Search"
                      fullWidth
                      value={this.state.filter}
                      onInput={(e) => {
                        this.setState({ filter: e.target.value })
                      }}
                    />
                  </Paper>
                  <RecordList
                    ListProps={{ disablePadding: true }}
                    primaryKey="fullname"
                    secondaryKey="latestOrder"
                    records={
                      this.state.filter
                        ? list.filter(v =>
                          v.fullname.match(new RegExp(this.state.filter, 'i'))
                          || v.latestOrder.match(new RegExp(this.state.filter, 'i'))
                        )
                        : list
                    }
                    active={match && match.params.id}
                    onSelected={id => history.push(`/clients/${id}`)}
                  />
                </div>
              }
              {editorVisible &&
                <div className={this.props.classes.editorColumn}>
                  <EditorBase className={this.props.classes.editorPaper}>
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
                      : selectedId
                        ? (
                          <Redirect to="/clients" />
                        )
                        : (
                          <Typography variant="display1">
                            Select an item
                          </Typography>
                        )
                    }
                  </EditorBase>
                </div>
              }
            </div>
          )
        }}
      </Route>
    )
  }
}

const styles = theme => {
  const styles = {
    root: {
    },
    listColumn: {
      width: '100%',
      maxWidth: 300,
      overflowY: 'auto',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100%'
      },
      [theme.breakpoints.up('sm')]: {
        position: 'fixed',
        bottom: 0,
        top: 96,
      }
    },
    listHeader: {
      position: 'fixed',
      top: 48,
      width: 300,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 'unset',
    },
    editorColumn: {
      marginLeft: 300,
      height: 1500,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginLeft: 'unset',
      }
    },
    editorPaper: {
      padding: 16
    }
  }
  if (theme.palette.type === 'light') {
    styles.listColumn.borderRight = '1px solid #ccc'
    styles.listHeader.borderRight = '1px solid #ccc'
  }
  return styles
}

export default withStyles(styles)(withWidth()(ClientsView))