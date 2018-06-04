import React from 'react'
import { connect } from 'react-redux'

function Translated(props) {
  let translated
  if (typeof props.children === 'function')
    translated = props.children(props.i18n.t, props.i18n)
  else
    translated = props.i18n.t(props.children)
  if (props.keyed)
    return (
      <React.Fragment key={props.i18n.lang}>
        {translated}
      </React.Fragment>
    )
  else return translated
}

function mapStateToProps(state) {
  return {
    i18n: state.i18n.instance,
    lang: state.i18n.instance.lang
  }
}

export default connect(mapStateToProps)(Translated)