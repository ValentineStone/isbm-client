import { connect } from 'react-redux'

function Translated(props) {
  if (typeof props.children === 'function')
    return props.children(props.i18n.t, props.i18n)
  else
    return props.i18n.t(props.children)
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n.instance,
    lang: state.i18n.instance.lang
  }
}

export default connect(mapStateToProps)(Translated)