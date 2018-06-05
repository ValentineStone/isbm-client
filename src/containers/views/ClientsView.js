import React from 'react'

import { Link, Route, Redirect, withRouter } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import qs from 'qs'
import escapeStringRegexp from 'escape-string-regexp'

import Translated from '~/containers/Translated'
import RecordList from '~/components/InfiniteRecordList'
import ClientEditor from '~/components/editors/ClientEditor'
import withPersistentNavigation from '~/containers/withPersistentNavigation'

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
for (let i = 0; i < 1000; i++)
  list.push({
    id: 'customer[' + i + ']',
    fullname: 'Customer ' + i,
    latestOrder: 'Order ' + i
  })

let ClientsView = class ClientsView extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const search = props.navigation.params.search || ''
    if (search !== state.search)
      return { search }
    else
      return null
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    //console.log(this.props.navigation.params)
    const selectedId = this.props.navigation.params.selected
    const selectedItem = list.find(v => v.id === selectedId)
    const listVisible = this.props.width !== 'xs' || !selectedId
    const editorVisible = this.props.width !== 'xs' || selectedId
    const listHeaderVisible = this.props.width !== 'xs' && listVisible
    const EditorBase = this.props.width === 'xs' ? 'div' : Paper
    const regExp = new RegExp(escapeStringRegexp(this.state.search), 'i')
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
                  value={this.state.search}
                  onInput={
                    e => this.props.navigate('.', {
                      search: e.target.value || undefined
                    }, { replace: true, mergeParams: true })
                  }
                />
              </Paper>
            </div>
            <RecordList
              ListProps={{ disablePadding: true }}
              className={this.props.classes.listColumnFlexItem}
              primaryKey="fullname"
              secondaryKey="latestOrder"
              records={
                this.state.search && regExp
                  ? list.filter(v =>
                    v.fullname.match(regExp)
                    || v.latestOrder.match(regExp)
                  )
                  : list
              }
              active={selectedId}
              onRecordClick={({ id }) => {
                if (id === selectedId)
                  this.props.navigate('/clients', {
                    selected: undefined
                  }, { mergeParams: true })
                else this.props.navigate('/clients', {
                  selected: id
                }, { mergeParams: true })
              }}
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
                  <ClientEditor value={selectedItem} />
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
        maxWidth: 'unset'
      },
      [theme.breakpoints.up('sm')]: {
      },
      position: 'fixed',
      bottom: 0,
      top: 96,
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
        marginLeft: 'unset',
      }
    },
    editorPaper: {
      padding: 16
    },
    listColumnFlexItem: {
      flex: 1,
      display: 'flex',
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

ClientsView = withStyles(styles)(
  withWidth()(
    ClientsView
  )
)

export default withPersistentNavigation()(ClientsView)