import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import Translated from '~/containers/Translated'
import Typography from '@material-ui/core/Typography'

let RecordFetcher = class RecordFetcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fetched: null
    }
  }
  render() {
    if (!this.props.id) return null
    if (this.state.fetched === null)
      return (
        <div className={this.props.classes.centered}>
          <CircularProgress size={50} />
        </div>
      )
    else if (this.state.fetched === false)
      return <Translated>No such record exists</Translated>
    else
      return this.props.children(this.state.fetched) || ''
  }

  componentDidUpdate() {
    this.updateRecord()
  }

  componentDidMount() {
    this.updateRecord()
  }

  updateRecord() {
    const { id, type } = this.props
    if (this.state.fetchedId !== id)
      if (id)
        this.props.jsonrpc('getRecord', { id, type })
          .then(fetched => this.setState({ fetched, fetchedId: id }))
          .catch(() => this.setState({ fetched: false, fetchedId: id }))
      else
        this.setState({ fetchedId: id })
  }
}

RecordFetcher = withStyles({
  centered: {
    margin: '0 auto',
    width: 'min-content'
  }
})(RecordFetcher)

import { connect } from 'react-redux'
import jsonrpc from '~/actions/jsonrpc'

RecordFetcher = connect(
  undefined,
  { jsonrpc }
)(RecordFetcher)

export default RecordFetcher