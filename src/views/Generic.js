import React from 'react'
import Typography from 'material-ui/Typography'

import I18n from '../i18n.js'

class GenericView extends React.PureComponent {
  constructor() {
    super()
  }
  render() {
    return <Typography variant="display4">
      {I18n.t(this.props.pageName)}
    </Typography>
  }
}

export default I18n.translate(GenericView)