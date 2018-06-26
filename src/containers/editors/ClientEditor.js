import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
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
              label={t`First Name`}
              field="firstName"
            />
            <TextField
              label={t`Middle Name`}
              field="middleName"
            />
            <TextField
              label={t`Last Name`}
              field="lastName"
            />
            <TextField
              label={t`Birthday`}
              field="birthday"
            />
            <TextField
              label={t`Discount`}
              field="discount"
              suffix="%"
            />
            <TextField
              multiline
              label={t`Contacts`}
              field="contacts"
            />
            <TextField
              multiline
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
          </>
        }
      </Translated>
    )
  }
}