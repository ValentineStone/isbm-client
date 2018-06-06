import React from 'react'
import { Form } from 'react-form'

import Button from '@material-ui/core/Button'

import { ValueBasedKey } from '~/utils/ValueBasedKey'
import TextField from '~/components/form/TextField'
import Inspector from '~/components/Inspector'
import Translated from '~/containers/Translated'

class ClientEditor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.valueBasedKey = ValueBasedKey()
  }
  renderForm = formApi => (
    <form onSubmit={formApi.submitForm}>
      <Translated keyed>
        {t =>
          <>
            <TextField
              fullWidth
              field="fullname"
              label={t`Full name`}
            />
            <TextField
              fullWidth
              multiline
              field="latestOrder"
              label={t`Latest order`}
            />
            <TextField
              fullWidth
              field="id"
              label="ID"
            />
            <Button
              fullWidth
              to={`/orders/${formApi.values.id}`}
              color="secondary"
              component={Link}
            >
              To order
            </Button>
            <Inspector
              expandLevel={1}
              data={formApi.values}
            />
          </>
        }
      </Translated>
    </form>
  )
  render() {
    return (
      <Form
        preventDefault
        defaultValues={this.props.value}
        key={this.valueBasedKey(this.props.value)}
        render={this.renderForm}
      />
    )
  }
}


export default ClientEditor