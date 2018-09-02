import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import TextField from '~/components/form/TextField'
import RecordList from '~/components/InfiniteRecordList'

import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'

const styles = {
  marginBottom16: {
    marginBottom: 16
  },
  fieldHeader: {
    position: 'relative',
  },
  floatRightButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  recordList: {
    height: 200
  }
}

let RecordSelectorField = class RecordSelectorField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searching: props.openByDefault
    }
  }

  toggleSearch = () => {
    if (!this.props.formApi.values.placed)
      this.setState(state => ({
        searching: !state.searching,
        searchFilter: ''
      }))
  }

  handleSearchTextChange = e => this.setState({
    searchFilter: e.target.value
  })

  loadAdditionalRecords = records => this.props.jsonrpc('getRecords', {
    limit: records.length < 16 ? 16 : records.length,
    skip: records.length,
    type: this.props.recordType
  })

  
  handleRecordClick = record => {
    this.setState({ searching: false })
    if (this.props.onRecordClick)
      this.props.onRecordClick(record)
  }

  render() {
    const {
      formApi: {values},
      jsonrpc,
      classes,
      label,
      displayProp,
      children,
      ...restProps
    } = this.props
    const locked = Boolean(values.placed)

    return (
      <div className={classes.marginBottom16}>
        <div className={classes.fieldHeader}>
          <div>
            <Typography variant="caption" gutterBottom>
              {label}
            </Typography>
            {typeof children === 'function'
              ? children(values)
              : children
            }
            {displayProp &&
              <Typography variant="subheading">
                {values[displayProp]}
              </Typography>
            }
          </div>
          {!locked && !this.state.searching &&
            <IconButton
              onClick={this.toggleSearch}
              className={classes.floatRightButton}
            >
              <EditIcon />
            </IconButton>
          }
        </div>
        {this.state.searching &&
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
        {this.state.searching &&
          <Paper className={classes.marginBottom16}>
            <RecordList
              className={classes.recordList}
              loadAdditionalRecords={this.loadAdditionalRecords}
              filter={this.state.searchFilter}
              {...restProps}
              onRecordClick={this.handleRecordClick}
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