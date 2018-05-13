import { createMuiTheme } from 'material-ui/styles'

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