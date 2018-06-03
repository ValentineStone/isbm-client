import React from 'react'

import TextField from './fields/TextField'
import ObjectField from './fields/ObjectField'
import FormBase from './FormBase'
import Translated from '~/containers/Translated'
import Button from '@material-ui/core/Button'
import withWidth from '@material-ui/core/withWidth'
import FormHelperText from '@material-ui/core/FormHelperText'

let LoginForm
LoginForm = class LoginForm extends React.PureComponent {
  state = {}
  value = React.createRef()
  onSubmit = async e => {
    e.preventDefault()
    if (this.props.onSubmit) {
      let result = await this.props.onSubmit(this.value.current.getValue())
      if (result instanceof Error)
        this.setState({ error: result.message })
    }
  }
  render() {
    const { onSubmit, ...formProps } = this.props
    return (
      <Translated>
        {t =>
          <FormBase
            {...formProps}
            underlay={this.props.width !== 'xs'}
            title={t`Please sign in`}
            onSubmit={this.onSubmit}
          >
            {this.state.error &&
              <FormHelperText error>
                {t(this.state.error)}
              </FormHelperText>
            }
            <ObjectField ref={this.value}>
              <TextField name="username" label={t`Username`} />
              <TextField name="password" label={t`Password`} type="password" />
            </ObjectField>
            <Button
              fullWidth
              color="primary"
              type="submit"
            >
              {t`Sign in`}
            </Button>
          </FormBase>
        }
      </Translated>
    )
  }
}

export default withWidth()(LoginForm)