import {
  INITIALIZE_APP,
  IDENTIFY_USER,
  FETCH_PREFERENCES,
  INITIALIZE_I18N,
} from './types'

import {
  createThunkAction,
  createThunkActionSequence,
  noThrow,
  thunkify
} from './thunkActions'

import jrpc from './jrpc'

import setTheme from './setTheme'

import I18n from '~/utils/i18n'

const fetchPreferences = () => {
  return {
    lang: localStorage.getItem("lang") === 'ru' ? 'ru' : 'en',
    theme: localStorage.getItem("theme") === 'dark' ? 'dark' : 'light'
  }
}
const identifyUser = () => async dispatch => {
  const guestUser = { guest: true }
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    const user = await dispatch(jrpc('authenticateUser', { jwt }))
      .catch(() => guestUser)
    if (user) {
      localStorage.setItem('jwt', user.jwt)
      return user
    }
    else
      return guestUser
  }
  else
    return guestUser
}
const initializeI18n = async i18nOptions => {
  const i18nInstance = new I18n(i18nOptions)
  await i18nInstance.getTranslationQueue()
  return i18nInstance
}

const identifyUserThunkAction =
  createThunkAction(
    IDENTIFY_USER,
    identifyUser,
    { throws: true, fromThunkAction: true }
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
    [thunkify(setTheme), {
      withArguments: (getState, prevResult) => [prevResult.theme]
    }],
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

const initializeApp = noThrow(createThunkActionSequence(
  [initializeAppThunkAction, {
    withArguments: true
  }],
  [options => () => options.onAppInitialized && options.onAppInitialized(), {
    withArguments: true
  }],
))

export default initializeApp