import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import Translated from '~/containers/Translated'
import RecordListView from '~/containers/views/RecordListView'
import Inspector from '~/components/Inspector'

let ClientsView = class ClientsView extends React.Component {
  constructor(props) {
    super(props)
  }

  getMoreItems = async items => {
    const more = await this.props.jsonrpc('getClients', {
      limit: items.length < 16 ? 16 : items.length,
      skip: items.length
    })
    return more.length ? more : null
  }

  render() {
    return (
      <RecordListView
        loadAdditionalRecords={this.getMoreItems}
        primaryKey="fullname"
        secondaryKey="desc"
      >
        {record => <Inspector data={record} />}
      </RecordListView>
    )
  }
}

import { connect } from 'react-redux'
import jsonrpc from '~/actions/jsonrpc'

ClientsView = connect(
  undefined,
  { jsonrpc }
)(ClientsView)

export default ClientsView