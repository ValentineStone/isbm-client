import React from 'react'

import { Form } from 'react-form'
import TextField from './form/TextField'
import FormBase from './FormBase'
import Translated from '~/containers/Translated'
import Button from '@material-ui/core/Button'
import withWidth from '@material-ui/core/withWidth'
import FormHelperText from '@material-ui/core/FormHelperText'

let LoginForm
LoginForm = class LoginForm extends React.PureComponent {
  state = {}
  value = React.createRef()
  onSubmit = async values => {
    if (this.props.onSubmit) {
      let result = await this.props.onSubmit(values)
      if (result instanceof Error)
        this.setState({ error: result.message })
    }
  }
  render() {
    const { onSubmit, ...formProps } = this.props
    return (
      <Translated>
        {t =>
          <Form preventDefault onSubmit={this.onSubmit}>
            {formApi =>
              <FormBase
                {...formProps}
                underlay={this.props.width !== 'xs'}
                title={t`Please sign in`}
                onSubmit={formApi.submitForm}
              >
                {this.state.error &&
                  <FormHelperText error>
                    {t(this.state.error) || ''}
                  </FormHelperText>
                }
                <TextField
                  field="username"
                  fullWidth
                  label={t`Username`}
                />
                <TextField
                  field="password"
                  fullWidth
                  label={t`Password`}
                  type="password"
                />
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                >
                  {t`Sign in`}
                </Button>
              </FormBase>
            }
          </Form>
        }
      </Translated>
    )
  }
}

export default withWidth()(LoginForm)