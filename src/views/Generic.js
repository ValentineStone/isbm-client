import React from 'react'
import Typography from '@material-ui/core/Typography'

import { withTranslation, t } from '~/app/i18n'

class GenericView extends React.PureComponent {
  constructor() {
    super()
  }
  render() {
    const pageTitle =
      this.props.pageName.charAt(0).toUpperCase()
      + this.props.pageName.slice(1)
    return <Typography variant="display4">
      {t(pageTitle)}
    </Typography>
  }
}

export default withTranslation()(GenericView)