import React from 'react'
import { connect } from 'react-redux'

const TranslatedContext = React.createContext(undefined)
TranslatedContext.Provider.displayName = 'TranslatedContext.Provider'
TranslatedContext.Consumer.displayName = 'TranslatedContext.Consumer'

let Provider = function Provider(props) {
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

Provider = connect(
  state => ({
    i18n: state.i18n.instance,
    lang: state.i18n.instance.lang
  })
)(Provider)

export { Provider }

let Translated = function Translated(props) {
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

Translated = connect(
  state => ({
    i18n: state.i18n.instance,
    lang: state.i18n.instance.lang
  })
)(Translated)

export default Translated