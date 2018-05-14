const createAsyncType = supertype => ({
  REQUEST: supertype + '_REQUEST',
  SUCCESS: supertype + '_SUCCESS',
  FAILURE: supertype + '_FAILURE',
})

export const APP_INITIALIZE_START = 'APP_INITIALIZE_START'
export const APP_INITIALIZE_FINISH = 'APP_INITIALIZE_FINISH'

export const UNIDENTIFIED_ERROR = 'UNIDENTIFIED_ERROR'
export const DUMMY_ACTION = 'DUMMY_ACTION'

export const INITIALIZE_APP = createAsyncType('INITIALIZE_APP')
export const IDENTIFY_USER = createAsyncType('IDENTIFY_USER')
export const FETCH_PREFERENCES = createAsyncType('FETCH_PREFERENCES')
export const INITIALIZE_I18N = createAsyncType('INITIALIZE_I18N')
export const TRANSLATE = createAsyncType('TRANSLATE')

export const TOGGLE_THEME = 'TOGGLE_THEME'
export const TOGGLE_LANG = 'TOGGLE_LANG'

export const SET_THEME = 'SET_THEME'

export const JRPC = createAsyncType('JRPC')
export const AUTHENTICATE_USER = createAsyncType('AUTHENTICATE_USER')
export const LOG_OUT_USER = createAsyncType('LOG_OUT_USER')