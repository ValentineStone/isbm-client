import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { withStyles } from '@material-ui/core/styles'

class ResponsiveBlocker extends React.Component {
  render() {
    return (
      <Dialog
        fullScreen={this.props.fullScreen}
        open={this.props.open}
        aria-labelledby="responsive-dialog-title"
      >
        {this.props.children}
      </Dialog>
    )
  }
}

ResponsiveBlocker.defaultProps = {
  open: false
}

export default withMobileDialog({ breakpoint: 'xs' })(ResponsiveBlocker)