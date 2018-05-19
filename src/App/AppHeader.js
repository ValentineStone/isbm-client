import React from 'react'
import ReactDOM from 'react-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import InvertColorsIcon from '@material-ui/icons/InvertColors'
import CodeIcon from '@material-ui/icons/Code'
import PaletteIcon from '@material-ui/icons/Palette'
import TranslateIcon from '@material-ui/icons/Translate'
import withWidth from '@material-ui/core/withWidth'

import IconLink from '~/components/IconLink'
import Translated from '~/containers/Translated'


const titleElement = document.querySelector('title')

let AppHeader
AppHeader = class AppHeader extends React.PureComponent {
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
            <Translated>
              {t => {
                const appName = t`app.name`
                return <>
                  {ReactDOM.createPortal(appName, titleElement)}
                  {this.props.width === 'xs' ? t`app.shortname` : appName}
                </>
              }}
            </Translated>
          </Typography>
          {this.props.showDev && <IconLink Icon={CodeIcon} to="/development" />}
          <IconLink Icon={TranslateIcon} onClick={this.props.onToggleLang} />
          <IconLink Icon={InvertColorsIcon} onClick={this.props.onToggleTheme} />
        </Toolbar>
      </AppBar>
    )
  }
}

AppHeader = withWidth()(AppHeader)

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