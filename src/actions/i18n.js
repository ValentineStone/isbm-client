import { createThunkAction } from './thunkActions'
import action from './action'
import {
  TRANSLATE,
  TOGGLE_LANG
} from './types'

export const translate = createThunkAction(
  TRANSLATE,
  lang => async (dispatch, getState) => {
    const i18nInstance = getState().i18n.instance
    if (i18nInstance)
      await i18nInstance.setLang(lang)
    else
      throw new Error('No i18n instance present')
  },
  {
    fromThunkAction: true,
    successPayloadCreator: (result, lang) => lang
  }
)

export const toggleLang = (lang1, lang2) => (dispatch, getState) => {
  const from = getState().i18n.instance.lang
  const to = from === lang1 ? lang2 : lang1
  dispatch(action(TOGGLE_LANG, { payload: { between: [lang1, lang2], from, to } }))
  return translate(to)(dispatch, getState)
}