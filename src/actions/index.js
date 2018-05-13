import { createAction } from 'redux-actions'
import * as types from './types'

export * from './types'
export { default as action } from './action'
export { translate, toggleLang } from './i18n'
export { initializeApp } from './initializeApp'

export const dummyAction = createAction(types.DUMMY_ACTION)
export const toggleTheme = createAction(types.TOGGLE_THEME)