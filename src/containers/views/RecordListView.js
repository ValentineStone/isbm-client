import React from 'react'

import { Link } from 'react-router-dom'

import connectRoute from '~/components/connectRoute'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import escapeRegExp from 'lodash/escapeRegExp'

import Translated from '~/containers/Translated'
import RecordList from '~/components/InfiniteRecordList'

let RecordListView = class RecordListView extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    const { search } = props
    if (search !== state.search) {
      if (search) {
        const regExp = new RegExp(
          escapeRegExp(search)
            .replace(/е|ё/g, '(е|ё)'),
          'i'
        )
        const filter = records => records.filter(
          record => (
            (record[props.primaryKey] || '').match(regExp)
            || (record[props.secondaryKey] || '').match(regExp)
          )
        )
        return { search, filter }
      }
      return { search, filter: undefined }
    }
    return null
  }
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleRecordClick = ({ id }) => this.props.setParams({
    id: id === this.props.id
      ? undefined
      : id
  })

  handleSearchInput = e => this.props.setParams({
    search: e.target.value || undefined
  })



  hiddenRecordsMessage = count => (
    <Translated>
      {t => count === 1
        ? count + ' ' + t`item hidden`
        : count + ' ' + t`items hidden`
      }
    </Translated>
  )


  render() {

    const {
      width,
      classes,
      id,
      search,
      children,
      ...RecordListprops
    } = this.props

    const listVisible = width !== 'xs' || !id
    const editorVisible = width !== 'xs' || id
    const listHeaderVisible = width !== 'xs' && listVisible
    return (
      <>
        {listVisible &&
          <Paper className={classes.listHeader} elevation={0}>
            <Typography variant="subheading" color="secondary">
              <Translated>app.name</Translated>
            </Typography>
          </Paper>
        }
        {listVisible &&
          <section className={classes.listSection}>
            <Paper className={classes.searchBar} square>
              <Translated>
                {t =>
                  <TextField
                    placeholder={t`Search`}
                    fullWidth
                    value={search}
                    onInput={this.handleSearchInput}
                  />
                }
              </Translated>
            </Paper>
            <RecordList
              ListProps={{ disablePadding: true }}
              className={classes.list}
              filter={this.state.filter}
              active={id}
              onRecordClick={this.handleRecordClick}
              hiddenRecordsMessage={this.hiddenRecordsMessage}
              {...RecordListprops}
            />
          </section>
        }
        {editorVisible &&
          <Paper
            className={classes.editorSection}
            component="section"
          >
            {!listVisible &&
              <Button to="?" fullWidth component={Link}>
                <Translated>Back to list</Translated>
              </Button>
            }
            {id
              ? children(id)
              : (
                <Typography variant="subheading">
                  <Translated>Select an item to edit</Translated>
                </Typography>
              )
            }
          </Paper>
        }
      </>
    )
  }
}

const styles = {
  listSection: {
    width: '100%',
    maxWidth: 300,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    bottom: 0,
    top: 96,
    '@media (max-width:599.95px)': {
      maxWidth: 'unset'
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
  editorSection: {
    marginLeft: 300,
    padding: 16,
    '@media (max-width:599.95px)': {
      marginLeft: 'unset',
    },
  },
  list: {
    flex: 1,
    display: 'flex'
  },
  searchBar: {
    padding: 16
  }
}

RecordListView = withStyles(styles)(
  withWidth()(
    RecordListView
  )
)

export default connectRoute({
  withPersistentRoute: true,
  mapParamsToProps(params) {
    return {
      id: params.id,
      search: params.search || ''
    }
  }
})(RecordListView)