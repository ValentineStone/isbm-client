import React from 'react'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ContainerDimensions from 'react-container-dimensions'
import Infinite from 'react-infinite'
import Translated from '~/containers/Translated'

import escapeRegExp from 'lodash/escapeRegExp'

import cx from '~/utils/cx'


import CircularProgress from '@material-ui/core/CircularProgress'

const RECORD_HEIGHT = 68
const HIDDEN_RECORDS_MESSAGE_HEIGHT = 40

class InfiniteRecordListItem extends React.Component {
  render() {
    const {
      primary,
      secondary,
      className,
      ...props
    } = this.props
    return (
      <ListItem component={Button} {...props} className={className}>
        <ListItemText
          disableTypography
          primary={
            <Typography
              noWrap
              color="inherit"
              variant="subheading"
              children={primary || <Translated>No name</Translated>}
            />
          }
          secondary={
            <Typography
              noWrap
              color="inherit"
              variant="body1"
              children={secondary}
            />
          }
        />
      </ListItem>
    )
  }
}

class InfiniteRecordList extends React.PureComponent {
  static defaultProps = {
    initialRecords: [],
    loadAdditionalRecords: () => null,
    idKey: 'id',
    hiddenRecordsMessage: count => (
      <Translated>
        {t => count === 1
          ? count + ' ' + t`item hidden`
          : count + ' ' + t`items hidden`
        }
      </Translated>
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (props.filter !== state.lastFilter) {
      let filter = props.filter
      if (filter && typeof filter === 'string') {
        const filterText = filter
        const filterRegExp = new RegExp(
          escapeRegExp(filterText)
            .replace(/е|ё/g, '(е|ё)'),
          'i'
        )
        const filterProps = props.filterProps
        filter = arr => arr.filter(
          obj => {
            if (filterProps)
              return filterProps.some(
                prop => typeof obj[prop] === 'string'
                  ? obj[prop].match(filterRegExp)
                  : false
              )
            else
              return Object.values(obj).some(
                str => typeof str === 'string'
                  ? str.match(filterRegExp)
                  : false
              )
          }
        )
      }
      return {
        filter,
        lastFilter: props.filter,
        visibleRecords: filter
          ? filter(state.records)
          : state.records
      }
    }
    return null
  }

  componentDidMount() {
    this.mounted = true
    if (this.props.listRef)
      this.props.listRef(this)
  }
  componentWillUnmount() {
    this.mounted = false
    if (this.props.listRef)
      this.props.listRef(undefined)
  }

  constructor(props) {
    super(props)
    this.state = {
      records: props.initialRecords,
      visibleRecords: props.initialRecords,
      isLoading: false,
      canLoadMore: true
    }

    this.IndexedRecord = ({ index }) =>
      this.renderRecord(index)
    this.IndexedRecord.displayName = 'IndexedRecord'
  }

  setRecord = (recordId, newRecord) => {
    this.setState(state => {
      const findRecord = record => record[this.props.idKey] === recordId

      const newRecords = [...state.records]
      const recordIndex = state.records.findIndex(findRecord)
      if (recordIndex >= 0)
        if (newRecord)
          newRecords.splice(recordIndex, 1, newRecord)
        else
          newRecords.splice(recordIndex, 1)

      const newVisibleRecords = [...state.visibleRecords]
      const visibleRecordIndex = state.visibleRecords.findIndex(findRecord)
      if (visibleRecordIndex >= 0)
        if (newRecord)
          newVisibleRecords.splice(visibleRecordIndex, 1, newRecord)
        else
          newVisibleRecords.splice(visibleRecordIndex, 1)

      return {
        records: newRecords,
        visibleRecords: newVisibleRecords
      }
    })
  }

  addRecord = newRecord => {
    this.setState(state => ({
      records: [newRecord, ...state.records],
      visibleRecords: [newRecord, ...state.visibleRecords]
    }))
  }

  handleInfiniteLoad = async () => {
    this.setState({ isLoading: true })
    let records = this.state.records
    let loadMore = true
    let visibleRecords
    let additionalRecords
    let canLoadMore = true

    do {
      additionalRecords =
        await this.props.loadAdditionalRecords(records)
      canLoadMore = Boolean(additionalRecords && additionalRecords.length)
      if (!this.mounted) return
      if (!canLoadMore) break
      records = records.concat(additionalRecords)
      visibleRecords = this.state.filter
        ? this.state.filter(records)
        : records
      this.setState({ records })
    } while (visibleRecords.length <= this.state.visibleRecords.length)

    this.setState((state, props) => ({
      canLoadMore,
      isLoading: false,
      visibleRecords: state.filter
        ? state.filter(records)
        : records
    }))
  }

  handleRecordClick = (record, index, array) => (...args) => {
    if (this.props.ListItemProps && this.props.ListItemProps.onClick)
      this.props.ListItemProps.onClick(...args)
    if (this.props.onRecordClick)
      this.props.onRecordClick(record, index, array)
  }

  renderRecord = index => {
    const records = this.state.visibleRecords
    const record = records[index]
    const id = record[this.props.idKey]
    const isActive = id && (
      Array.isArray(this.props.active)
        ? this.props.active.includes(id)
        : this.props.active === id
    )

    let activeProps = undefined
    if (isActive) {
      activeProps = {
        color: 'primary',
        ...this.props.ActiveListItemProps
      }
    }
    return (
      <InfiniteRecordListItem
        {...this.props.ListItemProps}
        {...activeProps}
        onClick={this.handleRecordClick(record, index, records)}
        primary={record[this.props.primaryKey]}
        secondary={record[this.props.secondaryKey]}
        className={this.props.classes.item}
      />
    )
  }

  renderIndexedRecord = (record, index) => (
    React.createElement(
      this.IndexedRecord,
      { index, key: index }
    )
  )

  needsIndexedRecordsRerender = () => {
    const needsThat =
      this.lastRecordsRendered !== this.state.visibleRecords
      || !this.renderedIndexRecords
    this.lastRecordsRendered = this.state.visibleRecords
    return needsThat
  }

  renderIndexedRecords = () => {
    const shouldReRender = this.needsIndexedRecordsRerender()
    if (shouldReRender)
      this.renderedIndexRecords =
        this.state.visibleRecords.map(this.renderIndexedRecord)
    return this.renderedIndexRecords
  }

  render() {
    let infiniteItems = this.renderIndexedRecords()
    const hiddenRecordsCount =
      this.state.records.length
      - this.state.visibleRecords.length
    const hasHidenRecords = hiddenRecordsCount > 0
    return (
      <List
        {...this.props.ListProps}
        disablePadding
        className={cx(
          this.props.classes.root,
          this.props.className,
          this.props.ListProps && this.props.ListProps.className
        )}
      >
        <ContainerDimensions>
          {({ height }) =>
            <Infinite
              containerHeight={(height - (hasHidenRecords ? HIDDEN_RECORDS_MESSAGE_HEIGHT : 0)) || 1}
              elementHeight={RECORD_HEIGHT}
              infiniteLoadBeginEdgeOffset={
                this.state.canLoadMore
                  ? RECORD_HEIGHT
                  : undefined
              }
              onInfiniteLoad={
                this.state.canLoadMore
                  ? this.handleInfiniteLoad
                  : undefined
              }
              isInfiniteLoading={
                this.state.canLoadMore
                && this.state.isLoading
              }
              loadingSpinnerDelegate={
                <div className={this.props.classes.loadingSpinner}>
                  <CircularProgress />
                </div>
              }
            >
              {infiniteItems}
            </Infinite>
          }
        </ContainerDimensions>
        {hasHidenRecords &&
          <Paper className={this.props.classes.hiddenCounter}>
            <Typography noWrap>
              {this.props.hiddenRecordsMessage(hiddenRecordsCount)}
            </Typography>
          </Paper>
        }
      </ List >
    )
  }
}


const styles = {
  item: {
    textTransform: 'none',
    height: RECORD_HEIGHT
  },
  hiddenCounter: {
    height: HIDDEN_RECORDS_MESSAGE_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  noFocusOutline: {
    '&:focus': {
      outline: 'none'
    }
  },
  root: {
    flex: 1,
    overflow: 'hidden'
  },
  loadingSpinner: {
    margin: '0 auto',
    width: 'min-content'
  }
}

export default withStyles(styles)(InfiniteRecordList)