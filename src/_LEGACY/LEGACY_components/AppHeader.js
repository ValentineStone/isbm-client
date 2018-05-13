import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import InvertColorsIcon from '@material-ui/icons/InvertColors'
import CodeIcon from '@material-ui/icons/Code'
import PaletteIcon from '@material-ui/icons/Palette'
import TranslateIcon from '@material-ui/icons/Translate'

import IconLink from './IconLink'

import app from '~/app'
import { withTranslation, t } from '~/app/i18n'

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
            variant="title"
          >
            {t`app.name`}
          </Typography>
          <IconLink icon={TranslateIcon} action={app.toggleLang} />
          <IconLink icon={InvertColorsIcon} action={app.toggleTheme} />
          <IconLink icon={CodeIcon} to="/development" />
        </Toolbar>
      </AppBar>
    )
  }
}

export default withTranslation()(AppHeader)