import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Calendar from '~/components/Calendar'

import EditorView from '~/containers/views/RecordEditorWithListView'
import TaskEditor from '~/containers/editors/TaskEditor'
import RecordList from '~/components/InfiniteRecordList'

const badges = {
  [new Date('09.22.2018').toDateString()]: 3,
  [new Date('09.12.2018').toDateString()]: 10,
  [new Date('09.02.2018').toDateString()]: 1,
  [new Date('09.07.2018').toDateString()]: 2,
  [new Date('09.24.2018').toDateString()]: 1,
  [new Date('08.28.2018').toDateString()]: 1,
}

let TasksView = class TasksView extends React.Component {
  loadAdditionalRecords = records => this.props.jsonrpc('getRecords', {
    limit: records.length < 16 ? 16 : records.length,
    skip: records.length,
    type: 'Task'
  })

  render() {
    return (
      <>
        <Calendar badges={badges} />
        <RecordList
          className={this.props.classes.recordList}
          loadAdditionalRecords={this.loadAdditionalRecords}
        />
      </>
    )
  }
}

const styles = {
  recordList: {
    height: 400
  }
}

TasksView = withStyles(styles)(TasksView)

import { connect } from 'react-redux'
import jsonrpc from '~/actions/jsonrpc'

TasksView = connect(
  undefined,
  { jsonrpc }
)(TasksView)

export default TasksView