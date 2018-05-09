import React from 'react'
import ReactDOM from 'react-dom'

import app from '/app'

import { MuiThemeProvider } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'

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

import { BrowserRouter, Link, Route } from 'react-router-dom'

import { withTranslation, t } from '/app/i18n'
import ShapeshifterView from '/views/Shapeshifter'

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
    this.state = { theme: app.getTheme() }
    this.onThemeChange = theme => this.setState({ theme })
  }
  componentDidMount() {
    app.on('themechange', this.onThemeChange)
  }
  componentWillUnmount() {
    app.off('themechange', this.onThemeChange)
  }
  render() {
    return (
      <MuiThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <BrowserRouter>
          <>
            {ReactDOM.createPortal(t`app.name`, titleElement)}
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
                <MenuItem icon={TranslateIcon} action={app.toggleLang} />
                <MenuItem icon={InvertColorsIcon} action={app.toggleTheme} />
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

export default withTranslation()(App)