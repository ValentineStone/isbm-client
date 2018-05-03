import React from 'react'
import ReactDOM from 'react-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'

import InvertColorsIcon from 'material-ui-icons/InvertColors'
import MenuIcon from 'material-ui-icons/Menu'
import CodeIcon from 'material-ui-icons/Code'
import StoreIcon from 'material-ui-icons/Store'
import PaletteIcon from 'material-ui-icons/Palette'
import SettingsIcon from 'material-ui-icons/Settings'
import ReceiptIcon from 'material-ui-icons/Receipt'
import TranslateIcon from 'material-ui-icons/Translate'
import AssignmentTurnedInIcon from 'material-ui-icons/AssignmentTurnedIn'
import CropOriginalIcon from 'material-ui-icons/CropOriginal'
import AccountCircleIcon from 'material-ui-icons/AccountCircle'
import AttachMoneyIcon from 'material-ui-icons/AttachMoney'

import { MuiThemeProvider } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'

import { BrowserRouter, Link, Route } from 'react-router-dom'

import I18n from './i18n.js'
import ShapeshifterView from './views/Shapeshifter.js'
import themes from './themes.js'

import store from '/store.js'

const titleElement = document.head.querySelector('title')

const MenuItem = ({ icon: Icon, action, to }) => {
  if (to) return (
    <IconButton to={to} component={Link}>
      <Icon color={location.pathname.startsWith(to, 1) ? 'primary' : undefined} />
    </IconButton>
  )
  else return (
    <IconButton onClick={action}>
      <Icon />
    </IconButton>
  )
}

class App extends React.PureComponent {
  constructor() {
    super()
    this.toggleTheme = this.toggleTheme.bind(this)
    this.toggleLang = this.toggleLang.bind(this)

    this.theme = store.getOrSet('theme', 'light')
    this.lang = store.getOrSet('lang', 'en')
    if (I18n.lang !== this.lang)
      I18n.setLang(this.lang)

    this.state = { theme: this.theme }
  }
  toggleTheme() {
    if (this.theme === 'dark')
      this.theme = 'light'
    else
      this.theme = 'dark'
    store.set('theme', this.theme)
    this.setState({ theme: this.theme })
  }
  toggleLang() {
    if (this.lang === 'en')
      this.lang = 'ru'
    else
      this.lang = 'en'
    I18n.setLang(this.lang)
    store.set('lang', this.lang)
  }
  render() {
    return (
      <MuiThemeProvider
        theme={this.state.theme === 'dark' ? themes.dark : themes.light}
      >
        <CssBaseline />
        <BrowserRouter>
          <>
            {ReactDOM.createPortal(I18n.t('IS Framing Workshop'), titleElement)}
            <AppBar
              position="sticky"
              color="default"
              style={{ opacity: .95 }}>
              <Toolbar>
                <Typography
                  style={{ flex: 1 }}
                  variant="title">
                  {I18n.t('IS Framing Workshop')}
                </Typography>
                <MenuItem icon={TranslateIcon} action={this.toggleLang} />
                <MenuItem icon={InvertColorsIcon} action={this.toggleTheme} />
                <MenuItem icon={AttachMoneyIcon} to="calculator" />
              </Toolbar>
            </AppBar>
            <Toolbar style={{ overflow: 'auto' }}>
              <MenuItem icon={ReceiptIcon} to="orders" />
              <MenuItem icon={CropOriginalIcon} to="products" />
              <MenuItem icon={AccountCircleIcon} to="clients" />
              <MenuItem icon={StoreIcon} to="warehouse" />
              <MenuItem icon={AssignmentTurnedInIcon} to="tasks" />
              <MenuItem icon={SettingsIcon} to="settings" />
              <MenuItem icon={CodeIcon} to="development" />
            </Toolbar>
            <main style={{ padding: '1em' }}>
              <Route path="/" component={ShapeshifterView} />
            </main>
          </>
        </BrowserRouter>
      </MuiThemeProvider >
    )
  }
}

export default I18n.translate(App)