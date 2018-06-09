import React from 'react'
import RecordEditorView from '~/containers/views/RecordEditorView'

export default () => (
  <RecordEditorView
    recordType="Client"
    primaryRecordProp="fullname"
    secondaryRecordProp="note"
  />
)