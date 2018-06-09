import React from 'react'
import { Form } from 'react-form'

import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import Translated from '~/containers/Translated'

let RecordEditor = class RecordEditor extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    if (props.recordId !== state.recordId) {
      return {
        recordId: props.recordId,
        loadState: 'request',
        recordData: undefined
      }
    }
    return null
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.mounted = true
    this.loadRecordData(this.state.recordId)
  }
  componentWillUnmount() {
    this.mounted = false
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.recordId !== this.state.recordId) {
      this.loadRecordData(this.state.recordId)
    }
  }

  loadRecordData = async recordId => {
    await this.props.jsonrpc('getRecord', {
      type: this.props.recordType,
      id: recordId
    }).then(recordData => {
      if (this.mounted) {
        this.setState(state => {
          if (state.recordId === recordId)
            return { recordData, loadState: 'success' }
        })
      }
    })
  }

  renderForm = formApi => (
    <form onSubmit={formApi.submitForm}>
      {this.props.children(formApi)}
    </form>
  )

  render() {
    switch (this.state.loadState) {
      case 'request': return (
        <div className={this.props.classes.loader}>
          <CircularProgress size={50} />
        </div>
      )
      case 'success': return (
        <Form
          preventDefault
          defaultValues={this.state.recordData}
          key={this.props.recordId}
          render={this.renderForm}
        />
      )
      case 'failure': return (
        <Typography>
          <Translated>
            {t =>
              t`Error occurred`
              + ': '
              + (this.state.errorMessage || t`Unknown error`)
            }
          </Translated>
        </Typography>
      )
    }
  }
}

RecordEditor = withStyles({
  loader: {
    margin: '0 auto',
    width: 'min-content'
  }
})(RecordEditor)

import { connect } from 'react-redux'
import jsonrpc from '~/actions/jsonrpc'

RecordEditor = connect(
  undefined,
  { jsonrpc }
)(RecordEditor)

export default RecordEditor