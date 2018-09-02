import React from 'react'
import RecordListView from '~/containers/views/RecordListView'
import RecordEditor from '~/containers/RecordEditor'

const identity = v => v

let RecordEditorWithListView = class RecordEditorWithListView extends React.Component {
  loadAdditionalRecords = records => this.props.jsonrpc('getRecords', {
    limit: records.length < 16 ? 16 : records.length,
    skip: records.length,
    type: this.props.recordType
  }).then(records => records.map(this.props.recordTransform || identity))

  handleChange = (record) => {
    this.onChange(record && (this.props.recordTransform || identity)(record))
  }

  handleAdd = () => this.props.jsonrpc('addRecord', this.props.recordType)
    .then(record => record && (this.props.recordTransform || identity)(record))

  render() {
    const { Editor } = this.props
    return (
      <RecordListView
        key={this.props.recordType}
        loadAdditionalRecords={this.loadAdditionalRecords}
        primaryKey={this.props.primaryRecordProp}
        secondaryKey={this.props.secondaryRecordProp}
        onAdd={this.handleAdd}
        editorRootPaper={this.props.editorRootPaper}
        filterProps={this.props.filterProps}
      >
        {(recordId, onChange) => {
          this.onChange = onChange
          return (
            <RecordEditor
              recordId={recordId}
              recordType={this.props.recordType}
              onChange={this.handleChange}
            >
              {(formApi, options) =>
                <Editor
                  {...options}
                  formApi={formApi}
                  jsonrpc={this.props.jsonrpc}
                  onChange={this.handleChange}
                />
              }
            </RecordEditor>

          )
        }}
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