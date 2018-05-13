import { connect } from 'react-redux'

import AppHeader from '~/components/AppHeader'
import { toggleLang, toggleTheme } from '~/actions'

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