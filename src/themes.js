import { createMuiTheme } from 'material-ui/styles'

const colors = {
  primary: {
    main: '#4d90fe',
  },
  secondary: {
    main: '#3f51b5'
  }
}

export default {
  light: createMuiTheme({
    palette: {
      type: 'light',
      ...colors
    },
  }),
  
  dark: createMuiTheme({
    palette: {
      type: 'dark',
      ...colors
    },
  }),

  lightBase16: {
    scheme: 'google',
    author: 'seth wright (http://sethawright.com)',
    base00: '#1d1f21',
    base01: '#282a2e',
    base02: '#373b41',
    base03: '#969896',
    base04: '#b4b7b4',
    base05: '#c5c8c6',
    base06: '#e0e0e0',
    base07: 'transparent',
    base08: '#CC342B',
    base09: '#F96A38',
    base0A: '#FBA922',
    base0B: '#198844',
    base0C: '#3971ED',
    base0D: '#3971ED',
    base0E: '#A36AC7',
    base0F: '#3971ED'
  }
}