import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import Inspector from '~/components/Inspector'
import BooleanField from '~/components/form/BooleanField'
import TextField from '~/components/form/TextField'
import SelectField from '~/components/form/SelectField'
import Translated from '~/containers/Translated'
import RecordList from '~/components/InfiniteRecordList'

import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'

import printCheck from './printCheck'

import framePriceCalc from '~/utils/framePriceCalc'

const styles = {
  marginBottom16: {
    marginBottom: 16
  },
  fieldHeader: {
    display: 'flex',
    '& > :first-child': {
      flex: 1
    }
  },
  recordList: {
    height: 200
  }
}

let RecordSelectorField = class RecordSelectorField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchingFrame: props.openByDefault
    }
  }

  toggleSearch = () => {
    if (!this.props.formApi.values.placed)
      this.setState(state => ({
        searchingFrame: !state.searchingFrame,
        frameSearchFilter: ''
      }))
  }

  handleSearchTextChange = e => this.setState({
    frameSearchFilter: e.target.value
  })

  loadAdditionalRecords = records => this.props.jsonrpc('getRecords', {
    limit: records.length < 16 ? 16 : records.length,
    skip: records.length,
    type: 'Material'
  })

  render() {
    const values = this.props.formApi.values
    const classes = this.props.classes
    const locked = Boolean(values.placed)

    const {
      formApi: {values},
      jsonrpc,
      classes,
      ...restProps
    } = this.props
    const locked = Boolean(values.placed)

    return (
      <div className={classes.marginBottom16}>
        <div className={classes.fieldHeader}>
          <div>
            <Typography variant="caption" gutterBottom>
              {this.props.label}
            </Typography>
            <Typography variant="subheading">
              {values.frameName}
            </Typography>
          </div>
          {!locked && !this.state.searchingFrame &&
            <IconButton onClick={this.toggleSearch} >
              <EditIcon />
            </IconButton>
          }
        </div>
        {this.state.searchingFrame &&
          <TextField
            helperText={false}
            onChange={this.handleSearchTextChange}
            prefix={<SearchIcon color="action" />}
            suffix={
              <IconButton onClick={this.toggleSearch}>
                <ClearIcon />
              </IconButton>
            }
          />
        }
        {this.state.searchingFrame &&
          <Paper className={classes.marginBottom16}>
            <RecordList
              className={classes.recordList}
              loadAdditionalRecords={this.loadAdditionalRecords}
              filter={this.state.frameSearchFilter}
              {...this.props}
            />
          </Paper>
        }
      </div>
    )
  }
}

RecordSelectorField = withStyles(styles)(RecordSelectorField)

import { connect } from 'react-redux'
import jsonrpc from '~/actions/jsonrpc'

RecordSelectorField = connect(
  undefined,
  { jsonrpc }
)(RecordSelectorField)

export default RecordSelectorField