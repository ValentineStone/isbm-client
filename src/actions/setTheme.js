import { SET_THEME } from './types'
import { createAction } from 'redux-actions'
import { lightTheme, darkTheme } from '~/themes'

const setTheme = createAction(SET_THEME, theme => {
  const themeObject = theme === 'dark' ? darkTheme : lightTheme
  localStorage.setItem("theme", themeObject.palette.type)
  return { themeObject, theme }
})
export default setTheme