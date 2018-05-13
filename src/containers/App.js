import { connect } from 'react-redux'

import App from '~/components/App'
import { dummyAction, toggleTheme } from '~/actions'

function mapStateToProps(state) {
  return { theme: state.theme }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchDummyAction(e) {
      e.persist()
      dispatch(dummyAction(e))
    },
    toggleTheme: () => dispatch(toggleTheme())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)