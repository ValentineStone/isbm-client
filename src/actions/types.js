const createRequestType = supertype => ({
  REQUEST: supertype + '_REQUEST',
  SUCCESS: supertype + '_SUCCESS',
  FAILURE: supertype + '_FAILURE',
})

export const APP_INITIALIZE_START = 'APP_INITIALIZE_START'
export const APP_INITIALIZE_FINISH = 'APP_INITIALIZE_FINISH'

export const UNIDENTIFIED_ERROR = 'UNIDENTIFIED_ERROR'
export const DUMMY_ACTION = 'DUMMY_ACTION'

export const INITIALIZE_APP = createRequestType('INITIALIZE_APP')
export const IDENTIFY_USER = createRequestType('IDENTIFY_USER')
export const FETCH_PREFERENCES = createRequestType('FETCH_PREFERENCES')
export const INITIALIZE_I18N = createRequestType('INITIALIZE_I18N')
export const TRANSLATE = createRequestType('TRANSLATE')

export const TOGGLE_THEME = 'TOGGLE_THEME'
export const TOGGLE_LANG = 'TOGGLE_LANG'