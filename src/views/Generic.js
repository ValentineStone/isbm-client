import React from 'react'
import Typography from 'material-ui/Typography'

import { withTranslation } from '/react-base-i18n.js'

class GenericView extends React.PureComponent {
  constructor() {
    super()
  }
  render() {
    return <Typography variant="display4">
      {this.props.i18n.t(this.props.pageName)}
    </Typography>
  }
}

export default withTranslation()(GenericView)