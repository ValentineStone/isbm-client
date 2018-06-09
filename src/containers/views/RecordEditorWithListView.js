import React from 'react'
import RecordListView from '~/containers/views/RecordListView'
import Inspector from '~/components/Inspector'
import RecordEditor from '~/containers/RecordEditor'

let RecordEditorWithListView = class RecordEditorWithListView extends React.Component {
  loadAdditionalRecords = records => this.props.jsonrpc('getRecords', {
    limit: records.length < 16 ? 16 : records.length,
    skip: records.length,
    type: this.props.recordType,
    props: [
      'id',
      this.props.primaryRecordProp,
      this.props.secondaryRecordProp
    ]
  })

  render() {
    return (
      <RecordListView
        key={this.props.recordType}
        loadAdditionalRecords={this.loadAdditionalRecords}
        primaryKey={this.props.primaryRecordProp}
        secondaryKey={this.props.secondaryRecordProp}
      >
        {recordId =>
          <RecordEditor recordId={recordId} recordType={this.props.recordType}>
            {formApi => <Inspector data={formApi.values} expandLevel={1} />}
          </RecordEditor>
        }
      </RecordListView>
    )
  }
}

import { connect } from 'react-redux'
import jsonrpc from '~/actions/jsonrpc'

RecordEditorWithListView = connect(
  undefined,
  { jsonrpc }
)(RecordEditorWithListView)

export default RecordEditorWithListView