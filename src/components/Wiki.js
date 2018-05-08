import React from 'react'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { LinearProgress } from 'material-ui/Progress'
import { MuiThemeProvider } from 'material-ui/styles'

import { getI18nInstance } from '/react-base-i18n.js'
const i18n = getI18nInstance()

import themes from '/themes.js'

class Wiki extends React.PureComponent {
  constructor(props) {
    super(props)
    this.loadPage(this.props.page)
    this.onTranslate = this.onTranslate(this)
  }

  componentDidMount() {
    i18n.on('translate', this.onTranslate)
  }
  componentWillUnmount() {
    i18n.remove('translate', this.onTranslate)
  }

  onTranslate() {
    this.loadPage(this.props.page)
  }

  componentWillReceiveProps(props) {
    if (this.props.page !== props.page)
      this.loadPage(props.page)
  }

  loadPage(page) {
    if (!page)
      this.setState({ page: { html: 'No page selected' + page } })
    else {
      this.setState({ page: { html: 'Loading...' }, loading: true })
      fetch(`http://${i18n.lang}.wikipedia.org/w/api.php?format=json&action=parse&prop=text&origin=*&redirects=true&page=${page}`)
        .then(r => r.json())
        .then(json => {
          if (page === this.props.page)
            if (json.parse)
              this.setState({
                page: {
                  ...json.parse,
                  html: json.parse.text['*']
                },
                loading: false
              })
            else
              this.setState({ page: { html: 'Unknown page ' + page }, loading: false })
        })
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={themes.light}>

        <Paper style={{ overflow: 'auto' }}>
          {this.state.loading && <LinearProgress />}
          <section
            style={{ padding: '1em' }}
            dangerouslySetInnerHTML={{ __html: this.state.page.html }} />
        </Paper >
      </MuiThemeProvider>
    )
  }

  componentWillMount() {
    this.mountedOrMounting = true
  }
  componentWillUnmount() {
    this.mountedOrMounting = false
  }

  setState(state) {
    if (this.mountedOrMounting)
      super.setState(state)
    else
      this.state = state
  }
}


export default Wiki