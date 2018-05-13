import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

import {
  IDENTIFY_USER,
  FETCH_PREFERENCES,
  INITIALIZE_I18N,
  DUMMY_ACTION,
  TOGGLE_THEME,
  TRANSLATE,
} from '~/actions'

import { lightTheme, darkTheme } from '~/themes'

export const stateWithInitialStatus = (...keys) => {
  return keys.reduce((state, key) => (state[key] = STATUS_INITIAL, state), {})
}

const errorReducer = (state, action) => {
  if (action.error)
    console.error(
      `Reducer: ${action.type}:`, action.payload,
      '\nWith state being', state
    )
  return state
}

const rootReducer = combineReducers({
  preferences(state = {}, action) {
    switch (action.type) {
      case FETCH_PREFERENCES.SUCCESS:
        return { ...action.payload }
      default:
        return state
    }
  },
  user(state = {}, action) {
    switch (action.type) {
      case IDENTIFY_USER.SUCCESS:
        return { ...action.payload }
      default:
        return state
    }
  },
  i18n(state = {}, action) {
    switch (action.type) {
      case INITIALIZE_I18N.SUCCESS:
        return {
          instance: action.payload,
          currentLang: action.payload.lang
        }
      case TRANSLATE.SUCCESS:
        return { ...state, currentLang: action.payload }
      default:
        return state
    }
  },
  dummy(state = null, action) {
    switch (action.type) {
      case DUMMY_ACTION:
        return action.payload || state
      default:
        return state
    }
  },
  theme(state = null, action) {
    switch (action.type) {
      case FETCH_PREFERENCES.SUCCESS:
        return action.payload.theme === 'dark' ? darkTheme : lightTheme
      case TOGGLE_THEME:
        return state && (state === darkTheme ? lightTheme : darkTheme)
      default:
        return state
    }
  }
})

export default reduceReducers(rootReducer, errorReducer)