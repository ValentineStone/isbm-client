import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import Inspector from '~/components/Inspector'
import TextField from '~/components/form/TextField'
import Translated from '~/containers/Translated'

export default class MaterialEditor extends React.Component {
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
              label={t`Material name`}
              field="name"
            />
            <TextField
              label={t`Vendor code`}
              field="vendorCode"
            />
            <TextField
              disabled
              value={t`Frame`}
              label={t`Material type`}
            />
            <TextField
              label={t`Frame width`}
              field="frameWidth"
              suffix={t`cm`}
              scale={0.01}
            />
            <TextField
              label={t`Frame price`}
              field="framePrice"
              suffix={t`rub`}
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