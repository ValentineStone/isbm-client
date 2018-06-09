import React from 'react'

import Translated from '~/containers/Translated'
import RecordListView from '~/containers/views/RecordListView'
import Inspector from '~/components/Inspector'
import RecordEditor from '~/containers/RecordEditor'

let ClientsView = class ClientsView extends React.Component {
  loadAdditionalRecords = items => this.props.jsonrpc('getRecords', {
    limit: items.length < 16 ? 16 : items.length,
    skip: items.length,
    type: 'Client',
    props: ['fullname', 'note', 'id']
  })

  render() {
    return (
      <RecordListView
        loadAdditionalRecords={this.loadAdditionalRecords}
        primaryKey="fullname"
        secondaryKey="note"
      >
        {recordId =>
          <RecordEditor recordId={recordId} recordType="Client">
            {formApi => <Inspector data={formApi.values} expandLevel={1} />}
          </RecordEditor>
        }
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