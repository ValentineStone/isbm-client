import { createMuiTheme } from '@material-ui/core/styles'

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#66afe0',
      contrastText: 'white'
    },
    secondary: {
      main: '#267f99',
    },
    error: {
      main: '#f14b4c'
    }
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#569cd6',
      contrastText: 'white'
    },
    secondary: {
      main: '#4ec9b0',
      contrastText: 'white'
    },
    background: {
      default: '#252526',
      paper: '#1e1e1e'
    },
    error: {
      main: '#f14b4c'
    }
  },
})