import { createThunkAction } from './thunkActions'
import action from './action'
import { TRANSLATE } from './types'

const translate = createThunkAction(
  TRANSLATE,
  lang => async (dispatch, getState) => {
    const i18nInstance = getState().i18n.instance
    if (i18nInstance) {
      localStorage.setItem("lang", lang)
      await i18nInstance.setLang(lang)
    }
    else
      throw new Error('No i18n instance present')
  },
  {
    fromThunkAction: true,
    successPayloadCreator: (result, lang) => lang
  }
)
export default translate