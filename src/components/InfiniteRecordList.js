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
              children={primary}
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
    hiddenRecordsMessage: count => count + ' items hidden'
  }

  static getDerivedStateFromProps(props, state) {
    if (props.filter !== state.lastFilter) {
      return {
        lastFilter: props.filter,
        visibleRecords: props.filter
          ? props.filter(state.records)
          : state.records
      }
    }
    return null
  }

  componentDidMount() {
    this.mounted = true
  }
  componentWillUnmount() {
    this.mounted = false
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
      visibleRecords = this.props.filter
        ? this.props.filter(records)
        : records
      this.setState({ records })
    } while (visibleRecords.length <= this.state.visibleRecords.length)

    this.setState((state, props) => ({
      canLoadMore,
      isLoading: false,
      visibleRecords: props.filter
        ? props.filter(records)
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
    const isActive = Array.isArray(this.props.active)
      ? this.props.active.includes(id)
      : this.props.active === id

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
    const hasHidenRecords = Boolean(hiddenRecordsCount)
    return (
      <List
        {...this.props.ListProps}
        className={cx(
          this.props.classes.root,
          this.props.ListProps && this.props.ListProps.className
        )}
      >
        <ContainerDimensions>
          {({ height }) =>
            <Infinite
              containerHeight={height - (hasHidenRecords ? HIDDEN_RECORDS_MESSAGE_HEIGHT : 0)}
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