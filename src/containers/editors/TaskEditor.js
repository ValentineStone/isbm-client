import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import Inspector from '~/components/Inspector'
import TextField from '~/components/form/TextField'
import DateTimePicker from '~/components/form/DateTimePicker'
import Translated from '~/containers/Translated'

export default class TaskEditor extends React.Component {
  removeRecord = () => {
    this.props.jsonrpc('removeRecord', this.props.formApi.values)
    this.props.onChange(null)
  }
  finishTask = () => {
    this.props.formApi.setValue(
      'finished',
      Date.now() < new Date(this.props.formApi.values.dueDate).getTime()
        ? 'inTime'
        : 'late'
    )
  }
  render() {
    const values = this.props.formApi.values
    const now = Date.now()
    const dueDate = new Date(values.dueDate).getTime()
    const status = values.finished
    ? values.finished === 'late'
      ? 'Finished, overdue'
      : 'Finished'
      : now > dueDate
        ? `Overdue`
        : `Pending`
    const color = values.finished
      ? values.finished === 'late'
        ? 'error'
        : 'secondary'
      : now > dueDate
        ? 'error'
        : 'textSecondary'
    return (
      <Translated keyed>
        {(t, i18n) =>
          <>
            <Typography
              gutterBottom
              variant="headline"
              color={color}
              align="center"
            >
              {t(status)}
            </Typography>
            <TextField
              multiline
              label={t`Task summary`}
              field="summary"
              disabled={Boolean(values.finished)}
            />
            <DateTimePicker
              label={t`Due date`}
              field="dueDate"
              disabled={Boolean(values.finished)}
            />
            <div style={{ display: 'flex' }}>
              <div>
                <Typography gutterBottom color="textSecondary">
                  {t`Task created` + ' '}
                </Typography>
              </div>
              <div style={{ flex: 1 }}>
                <Typography gutterBottom align="right">
                  {new Date(values.timeCreated)
                    .toLocaleString(i18n.lang)}
                </Typography>
              </div>
            </div>
            {values.timeEdited !== values.timeCreated &&
              <div style={{ display: 'flex' }}>
                <div>
                  <Typography gutterBottom color="textSecondary">
                    {t`Task edited` + ' '}
                  </Typography>
                </div>
                <div style={{ flex: 1 }}>
                  <Typography gutterBottom align="right">
                    {new Date(values.timeEdited)
                      .toLocaleString(i18n.lang)}
                  </Typography>
                </div>
              </div>
            }
            <Typography color="error" align="right">
              {!values.finished &&
                <Button color="primary" onClick={this.finishTask}>
                  {t`Finish`}
                </Button>
              }
              <Button color="inherit" onClick={this.removeRecord}>
                {t`Delete`}
              </Button>
            </Typography>
          </>
        }
      </Translated>
    )
  }
}