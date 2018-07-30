import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import DebugIcon from '@material-ui/icons/BugReport'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import CodeIcon from '@material-ui/icons/Code'
import PaletteIcon from '@material-ui/icons/Palette'
import TranslateIcon from '@material-ui/icons/Translate'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import IconLink from '~/components/IconLink'
import Translated from '~/containers/Translated'

import cx from '~/utils/cx'

let AppHeader
AppHeader = function AppHeader(props) {
  return (
    <AppBar
      position="static"
      color="default"
      className={cx(props.classes.appBar, props.className)}
      elevation={props.AppNavigationVisible ? 0 : undefined}
    >
      <Grid
        container
        alignItems="center"
        className={props.classes.toolbar}
      >
        <Typography
          className={props.classes.appTitle}
          color="secondary"
          variant="headline"
        >
          <Translated>
            {t => document.title = props.width === 'xs' ? t`app.shortname` : t`app.name`}
          </Translated>
        </Typography>
        {props.showDev && <IconLink Icon={CodeIcon} to="/development" />}
        <IconLink Icon={TranslateIcon} onClick={props.onToggleLang} />
        <IconLink Icon={InvertColorsIcon} onClick={props.onToggleTheme} />
        {/*<IconLink Icon={DebugIcon} onClick={debugHitboxToggle} />*/}

      </Grid>
    </AppBar>
  )
}

const styles = theme => ({
  appBar: {
    '@media print': { display: 'none !important' },
    position: 'relative',
    zIndex: 1101,
    background: theme.palette.background.paper
  },
  appTitle: {
    flex: 1
  },
  toolbar: {
    padding: '0 8px 0 16px'
  }
})

AppHeader = withStyles(styles)(withWidth()(AppHeader))

import { connect } from 'react-redux'
import toggleLang from '~/actions/toggleLang'
import toggleTheme from '~/actions/toggleTheme'

function mapStateToProps(state) {
  return { theme: state.theme }
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleLang: () => dispatch(toggleLang('en', 'ru')),
    onToggleTheme: () => dispatch(toggleTheme())
  }
}

export default connect(
  mapStateToProps,
  {
    onToggleLang: () => toggleLang('en', 'ru'),
    onToggleTheme: toggleTheme
  }
)(AppHeader)