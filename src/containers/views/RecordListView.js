import React from 'react'

import { Link } from 'react-router-dom'

import connectRoute from '~/components/connectRoute'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

import AddIcon from '@material-ui/icons/Add'

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

  static defaultProps = {
    editorRootPaper: Paper
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

  handleDeselect = reason => {
    this.props.setParams({ id: undefined })
  }

  handleEditorChange = record => {
    if (record) {
      this.recordList.setRecord(this.props.id, record)
    }
    else {
      this.recordList.setRecord(this.props.id, undefined)
      this.props.setParams({
        id: undefined
      })
    }
  }

  handleAdd = () => this.props.onAdd().then(record => {
    this.recordList.addRecord(record)
    this.props.setParams({
      id: record.id
    })
  })

  setRecordListRef = recordList => this.recordList = recordList

  render() {

    const {
      width,
      classes,
      id,
      search,
      children,
      onAdd,
      ...RecordListprops
    } = this.props

    const listVisible = width !== 'xs' || !id
    const editorVisible = width !== 'xs' || id
    const listPlateVisible = width !== 'xs' && listVisible
    const EditorRoot = this.props.editorRootPaper ? Paper : 'div'
    return (
      <Translated>
        {t =>
          <>
            <section
              className={classes.listSection}
              style={{ display: listVisible ? 'flex' : 'none' }}
            >
              {listPlateVisible &&
                <Paper className={classes.listPlate} elevation={0}>
                  <Typography variant="subheading" color="secondary">
                    {t`app.name`}
                  </Typography>
                </Paper>
              }
              <div className={classes.listHeader}>
                <Button fullWidth color="primary" onClick={this.handleAdd}>
                  <AddIcon style={{ marginRight: 8 }} />
                  {t`Add record`}
                </Button>
                <TextField
                  placeholder={t`Search`}
                  fullWidth
                  value={search}
                  onInput={this.handleSearchInput}
                />
              </div>
              <RecordList
                listRef={this.setRecordListRef}
                className={classes.list}
                filter={this.state.search}
                active={id}
                onRecordClick={this.handleRecordClick}
                {...RecordListprops}
              />
              <Divider />

            </section>
            {editorVisible &&
              <section className={classes.editorSection}>
                <EditorRoot className={
                  EditorRoot === Paper
                    ? classes.editorPaper
                    : classes.editorRootDiv
                }>
                  {!listVisible &&
                    <Button fullWidth onClick={this.handleDeselect}>
                      {t`Back to list`}
                    </Button>
                  }
                  {id
                    ? children(id, this.handleEditorChange)
                    : (
                      <Typography variant="subheading">
                        {t`Select an item to edit`}
                      </Typography>
                    )
                  }
                </EditorRoot>
              </section>
            }
          </>
        }
      </Translated>
    )
  }
}

const styles = {
  listSection: {
    '@media print': { display: 'none !important' },
    width: '100%',
    maxWidth: 300,
    overflowY: 'auto',
    position: 'fixed',
    bottom: 0,
    top: 96,
    '@media (max-width:599.95px)': {
      maxWidth: 'unset'
    },

    display: 'flex',
    flexDirection: 'column',
  },
  listPlate: {
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
    marginRight: 300,
    padding: 8,
    '@media (max-width:599.95px)': {
      marginLeft: 'unset',
    },
    '@media (max-width:1049.95px)': {
      marginRight: 'unset',
    },
  },
  editorPaper: {
    margin: '0 auto',
    padding: 16,
    maxWidth: 450,
  },
  editorRootDiv: {
    margin: '0 auto',
    maxWidth: 'max-content',
  },
  list: {
    //minHeight: 500,

    flex: 1,
  },
  listHeader: {
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