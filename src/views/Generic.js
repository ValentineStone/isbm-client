import React from 'react'
import Typography from 'material-ui/Typography'

import { withTranslation, t } from '/react-base-i18n.js'

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