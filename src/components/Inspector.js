import React from 'react'
import { withTheme } from '@material-ui/core/styles'
import Inspector from 'react-inspector'

export default withTheme()(({ theme, ...props }) => {
  const chromeTheme = theme.palette.type === 'dark' ? 'chromeDark' : 'chromeLight'
  return <ul style={{ padding: 0, margin: 0 }}><Inspector {...props} key={chromeTheme} theme={chromeTheme} /></ul>
})