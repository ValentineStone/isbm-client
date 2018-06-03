import React from 'react'

import { Link, Route, Redirect, withRouter } from 'react-router-dom'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import queryString from 'query-string'
import escapeStringRegexp from 'escape-string-regexp'

import Translated from '~/containers/Translated'
import RecordList from '~/components/RecordList'

import RecordEditor from '~/components/RecordEditor'

const list = [{
  id: '384902mfck2ojwdefgdec',
  fullname: 'Jhon Bob Smith',
  latestOrder: '12.02.2018 Blue frame with pink flowers, Rainbow Dash, Pinkipe Pie, Fluttershy',
  secrectData: 'this is secret information',
  additinalData: '557575-34'
}, {
  id: '234u98nyuqwdeohfhu82t',
  fullname: 'Leonid Valentine Olegovich Romanovsky',
  latestOrder: '28.04.2018 Print of Twilight Sparkle, Rarity & Applejack, heavy metal frame'
}, {
  id: '3940tucv9iweqrjfciwe',
  fullname: 'Vegtam Rainbow',
  latestOrder: '21.04.2018 Print of family'
}, {
  id: 'f543902-c3eujgiwef09g',
  fullname: 'Painkie Pie',
  latestOrder: '02.05.2018 Mirror\t framed with pink'
}]
for (let i = 0; i < 30; i++)
  list.push({
    id: 'customer[' + i + ']',
    fullname: 'Customer ' + i,
    latestOrder: 'Order ' + i
  })

class ClientsView extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.search === nextProps.location.search)
      return null
    else
      return {
        search: nextProps.location.search,
        searchParsed: queryString.parse(nextProps.location.search)
      }
  }
  constructor(props) {
    super(props)
    this.state = { filter: queryString.parse(props.location.search).filter || '' }
  }
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
          const regExp = new RegExp(escapeStringRegexp(this.state.filter), 'i')
          return (
            <div className={this.props.classes.root}>
              {listHeaderVisible &&
                <Paper
                  position="static"
                  color="default"
                  elevation={0}
                  className={this.props.classes.listHeader}
                >
                  <Typography variant="subheading" color="secondary">
                    <Translated>app.name</Translated>
                  </Typography>
                </Paper>
              }
              {listVisible &&
                <div className={this.props.classes.listColumn}>
                  <div>
                    <Paper style={{ padding: 16, position: 'relative', zIndex: 1 }} square>
                      <TextField
                        placeholder="Search"
                        fullWidth
                        value={this.state.filter}
                        onInput={(e) => {
                          this.setState({ filter: e.target.value })
                          this.state.searchParsed.filter = e.target.value
                          this.props.history.push('?' + queryString.stringify(this.state.searchParsed))
                        }}
                      />
                    </Paper>
                  </div>
                  <div className={this.props.classes.listColumnFlexItem}>
                    <RecordList
                      ListProps={{ disablePadding: true }}
                      primaryKey="fullname"
                      secondaryKey="latestOrder"
                      records={
                        this.state.filter && regExp
                          ? list.filter(v =>
                            v.fullname.match(regExp)
                            || v.latestOrder.match(regExp)
                          )
                          : list
                      }
                      active={match && match.params.id}
                      onRecordClick={id => {
                        if (id === selectedId)
                          history.push(`/clients`)
                        else
                          history.push(`/clients/${id}`)
                      }}
                    />
                  </div>
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
                        <RecordEditor
                          value={selectedItem}
                        >
                          {[
                            ['fullname', { label: 'Full name' }],
                            ['latestOrder', { label: 'Latest order' }],
                            ['id', { label: 'ID' }],
                            <Button fullWidth size="small" to={`/orders/&{selectedItem.id}`} component={Link}>
                              To order
                            </Button>
                          ]}
                        </RecordEditor>
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
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100%'
      },
      [theme.breakpoints.up('sm')]: {
        position: 'fixed',
        bottom: 0,
        top: 96,
      },
    },
    listHeader: {
      position: 'fixed',
      top: 48,
      width: 300,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
    },
    listColumnFlexItem: {
      flex: 1,
      overflow: 'auto',
      /*
      '&::-webkit-scrollbar': {
        width: 10,
      },
      '&::-webkit-scrollbar-track:hover': {
        background: 'rgba(0,0,0,.1)',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0,0,0,.25)',
      }
      */
    }
  }
  if (theme.palette.type === 'light') {
    //styles.listColumn.borderRight = '1px solid #ccc'
    //styles.listHeader.borderRight = '1px solid #ccc'
  }
  return styles
}

export default (
  withStyles(styles)(
    withWidth()(
      withRouter(
        ClientsView
      )
    )
  )
)