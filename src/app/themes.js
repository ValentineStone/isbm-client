import { createMuiTheme } from 'material-ui/styles'
import app from '/app'

const colors = {
  primary: {
    main: '#4d90fe',
  },
  secondary: {
    main: '#3f51b5'
  }
}

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    ...colors
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    ...colors
  },
})