import { TOGGLE_THEME } from './types'
import setTheme from './setTheme'

import action from './action'

const toggleTheme = (lang1, lang2) => (dispatch, getState) => {
  const from = getState().theme.palette.type
  const to = from === 'dark' ? 'light' : 'dark'
  dispatch(action(TOGGLE_THEME, { payload: { from, to } }))
  dispatch(setTheme(to))
}
export default toggleTheme