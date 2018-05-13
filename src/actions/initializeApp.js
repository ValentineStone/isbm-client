import {
  INITIALIZE_APP,
  IDENTIFY_USER,
  FETCH_PREFERENCES,
  INITIALIZE_I18N,
} from './types'

import {
  createThunkAction,
  createThunkActionSequence,
  noThrow
} from './thunkActions'

import I18n from '~/react-base-i18n'

const identifyUser = async () => ({ username: 'bob' })
const fetchPreferences = () => ({ lang: 'ru', theme: 'dark' })
const initializeI18n = async (i18nOptions) => {
  const i18nInstance = new I18n(i18nOptions)
  await i18nInstance.getTranslationQueue()
  return i18nInstance
}

const identifyUserThunkAction =
  createThunkAction(
    IDENTIFY_USER,
    identifyUser,
    { throws: true }
  )
const fetchPreferencesThunkAction =
  createThunkAction(
    FETCH_PREFERENCES,
    fetchPreferences,
    { throws: true }
  )
const initializeI18nThunkAction =
  createThunkAction(
    INITIALIZE_I18N,
    initializeI18n,
    { throws: true }
  )

const initializeAppThunkActionSequence =
  createThunkActionSequence(
    identifyUserThunkAction,
    fetchPreferencesThunkAction,
    [initializeI18nThunkAction, {
      withArguments: (getState, prevResult, options) => [{
        ...options.i18nOptions,
        initialLang: getState().preferences.lang
      }]
    }]
  )

const initializeAppThunkAction =
  createThunkAction(
    INITIALIZE_APP,
    initializeAppThunkActionSequence,
    { fromThunkAction: true, throws: true }
  )

export const initializeApp = noThrow(createThunkActionSequence(
  [initializeAppThunkAction, {
    withArguments: true
  }],
  [options => () => options.onAppInitialized && options.onAppInitialized(), {
    withArguments: true
  }],
))