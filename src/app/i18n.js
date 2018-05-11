import I18n, { withTranslation as _withTranslation } from '~/react-base-i18n'
import { importLang } from '~/langs'

const i18nInstance = new I18n({ importLang, defaultLang: 'en' })
export default i18nInstance
export const t = i18nInstance.t
export const withTranslation =
  (instance = i18nInstance) => Component => _withTranslation(instance)(Component)