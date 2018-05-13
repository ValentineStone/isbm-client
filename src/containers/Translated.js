import { connect } from 'react-redux'

function Translated(props) {
  return props.children(props.i18n.t)
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n.instance,
    lang: state.i18n.instance.lang
  }
}

export default connect(mapStateToProps)(Translated)