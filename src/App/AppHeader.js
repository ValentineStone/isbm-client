import React from 'react'
import ReactDOM from 'react-dom'

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

const titleElement = document.querySelector('title')


const debugStylesheet = document.head.querySelector('#debug-stylesheet')
const debugHitboxToggle = () => {
  if (localStorage.getItem('debuggingHitboxes') === 'true') {
    debugStylesheet.innerHTML = ''
    localStorage.setItem('debuggingHitboxes', 'false')
  }
  else {
    debugStylesheet.innerHTML = '* {outline: 1px solid rgba(127,127,127,.5);}'
    localStorage.setItem('debuggingHitboxes', 'true')
  }
}
if (localStorage.getItem('debuggingHitboxes') === 'true')
  debugStylesheet.innerHTML = '* {outline: 1px solid rgba(127,127,127,.5);}'

let AppHeader
AppHeader = function AppHeader(props) {
  return (
    <AppBar
      position="static"
      color="default"
      className={cx(props.classes.appBar, props.className)}
      elevation={props.navigationVisible ? 0 : undefined}
    >
      <Grid
        container
        alignItems="center"
        className={props.classes.toolbar}
      >
        <Typography
          className={props.classes.appTitle}
          variant="display1"
        >
          <Translated>
            {t => {
              const appName = t`app.name`
              return <>
                {ReactDOM.createPortal(appName, titleElement)}
                {props.width === 'xs' ? t`app.shortname` : appName}
              </>
            }}
          </Translated>
        </Typography>
        {props.showDev && <IconLink Icon={CodeIcon} to="/development" />}
        <IconLink Icon={TranslateIcon} onClick={props.onToggleLang} />
        <IconLink Icon={InvertColorsIcon} onClick={props.onToggleTheme} />
        <IconLink Icon={DebugIcon} onClick={debugHitboxToggle} />
      </Grid>
    </AppBar>
  )
}

const styles = {
  appBar: {
    position: 'relative',
    zIndex: 1101
  },
  appTitle: {
    flex: 1
  },
  toolbar: {
    padding: '0 8px 0 16px'
  }
}

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
  mapDispatchToProps
)(AppHeader)