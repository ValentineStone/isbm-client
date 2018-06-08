const createRSFType = supertype => ({
  REQUEST: supertype + '_REQUEST',
  SUCCESS: supertype + '_SUCCESS',
  FAILURE: supertype + '_FAILURE',
})

export const UNIDENTIFIED_ERROR = 'UNIDENTIFIED_ERROR'
export const DUMMY_ACTION = 'DUMMY_ACTION'

export const INITIALIZE_APP = createRSFType('INITIALIZE_APP')
export const IDENTIFY_USER = createRSFType('IDENTIFY_USER')
export const FETCH_PREFERENCES = createRSFType('FETCH_PREFERENCES')
export const INITIALIZE_I18N = createRSFType('INITIALIZE_I18N')
export const TRANSLATE = createRSFType('TRANSLATE')

export const TOGGLE_THEME = 'TOGGLE_THEME'
export const TOGGLE_LANG = 'TOGGLE_LANG'

export const SET_THEME = 'SET_THEME'

export const JSONRPC = createRSFType('JSONRPC')
export const AUTHENTICATE_USER = createRSFType('AUTHENTICATE_USER')
export const LOG_OUT_USER = createRSFType('LOG_OUT_USER')