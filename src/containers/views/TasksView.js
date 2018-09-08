import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import Calendar from '~/components/Calendar'

import EditorView from '~/containers/views/RecordEditorWithListView'
import TaskEditor from '~/containers/editors/TaskEditor'
import RecordList from '~/components/InfiniteRecordList'
import Translated from '~/containers/Translated'

const badges = {
  [new Date('09.22.2018').toDateString()]: 3
}

class TasksView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      badges: [],
      filterDate: undefined
    }
  }

  taskTransform = record => {
    record.dueDate = new Date(record.dueDate)
    record.dueDateLocale = record.dueDate.toLocaleString()
    record.dueDateInvariant = record.dueDate.toDateString()
    this.setState(state => ({ badges: [...state.badges, record.dueDate] }))
    return record
  }

  loadAdditionalRecords = records => this.props.jsonrpc('getRecords', {
    limit: records.length < 16 ? 16 : records.length,
    skip: records.length,
    type: 'Task'
  }).then(tasks => tasks.map(this.taskTransform))

  filterProps = ['dueDateInvariant']

  handleDateChange = date => this.setState(state => ({
    filterDate:
      state.filterDate && date.getTime() === state.filterDate.getTime()
        ? undefined
        : date
  }))

  render() {
    return (
      <>
        <Translated>
          {t =>
            <Calendar
              badges={this.state.badges}
              onChange={this.handleDateChange}
              locale={t.i18n.lang}
              value={this.state.filterDate}
            />
          }
        </Translated>
        {/*<EditorView
          recordType="Task"
          primaryRecordProp="summary"
          secondaryRecordProp="dueDateLocale"
          Editor={TaskEditor}
          recordTransform={taskTransform}
        />*/}
        <Paper style={{margin: '0 8px'}}>
          <RecordList
            filterProps={this.filterProps}
            className={this.props.classes.recordList}
            filter={this.state.filterDate && this.state.filterDate.toDateString()}
            primaryKey="summary"
            secondaryKey="dueDateLocale"
            loadAdditionalRecords={this.loadAdditionalRecords}
          />
        </Paper>
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