import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import InvertColorsIcon from '@material-ui/icons/InvertColors'
import CodeIcon from '@material-ui/icons/Code'
import PaletteIcon from '@material-ui/icons/Palette'
import TranslateIcon from '@material-ui/icons/Translate'
import withWidth from '@material-ui/core/withWidth'

import IconLink from './IconLink'
import Translated from '~/containers/Translated'

class AppHeader extends React.PureComponent {
  render() {
    return (
      <AppBar
        position="sticky"
        color="default"
        style={{ opacity: .95 }}
      >
        <Toolbar>
          <Typography
            style={{ flex: 1 }}
            variant="headline"
          >
            <Translated children={t => this.props.width === 'xs' ? t`app.shortname` : t`app.name`} />
          </Typography>
          <IconLink icon={CodeIcon} to="/development" />
          <IconLink icon={TranslateIcon} action={this.props.onToggleLang} />
          <IconLink icon={InvertColorsIcon} action={this.props.onToggleTheme} />
        </Toolbar>
      </AppBar>
    )
  }
}

export default withWidth()(AppHeader)