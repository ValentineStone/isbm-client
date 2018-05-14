import action from './action'
import translate from './translate'
import { TOGGLE_LANG } from './types'

const toggleLang = (lang1, lang2) => (dispatch, getState) => {
  const from = getState().i18n.instance.lang
  const to = from === lang1 ? lang2 : lang1
  dispatch(action(TOGGLE_LANG, { payload: { between: [lang1, lang2], from, to } }))
  return translate(to)(dispatch, getState)
}
export default toggleLang