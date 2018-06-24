import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Inspector from '~/components/Inspector'
import TextField from '~/components/form/TextField'
import Translated from '~/containers/Translated'

export default class ClientEditor extends React.Component {
  removeRecord = () => {
    this.props.jsonrpc('removeRecord', this.props.formApi.values)
    this.props.onChange(null)
  }
  render() {
    return (
      <Translated keyed>
        {t =>
          <>
            <TextField
              fullWidth
              label={t`First Name`}
              field="firstName"
            />
            <TextField
              fullWidth
              label={t`Middle Name`}
              field="middleName"
            />
            <TextField
              fullWidth
              label={t`Last Name`}
              field="lastName"
            />
            <TextField
              multiline
              fullWidth
              label={t`Note`}
              field="note"
            />
            <Typography color="error">
              <Button
                style={{ margin: '0 0 0 auto', display: 'block' }}
                color="inherit"
                onClick={this.removeRecord}
              >
                {t`Delete`}
              </Button>
            </Typography>
            {/*<Inspector noPaper data={this.props.formApi.values} />*/}
          </>
        }
      </Translated>
    )
  }
}