import React from 'react'
import cx from '~/utils/cx'
import { withTheme, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Inspector, {
  chromeLight as _chromeLight,
  chromeDark as _chromeDark
} from 'react-inspector'

const styles = {
  ul: {
    padding: 0,
    margin: 0
  },
  paper: {
    padding: 16
  }
}
const chromeLight = {
  ..._chromeLight,
  name: 'chromeLight',
  BASE_BACKGROUND_COLOR: 'unset'
}

const chromeDark = {
  ..._chromeDark,
  name: 'chromeDark',
  BASE_BACKGROUND_COLOR: 'unset',

  OBJECT_NAME_COLOR: '#9CDCFE',
  OBJECT_VALUE_NULL_COLOR: '#569CD6',
  OBJECT_VALUE_UNDEFINED_COLOR: '#569CD6',
  OBJECT_VALUE_REGEXP_COLOR: '#D16969',
  OBJECT_VALUE_STRING_COLOR: '#CE9178',
  OBJECT_VALUE_SYMBOL_COLOR: '#43C9B0',
  OBJECT_VALUE_NUMBER_COLOR: '#A6CEA8',
  OBJECT_VALUE_BOOLEAN_COLOR: '#569CD6',
  OBJECT_VALUE_FUNCTION_KEYWORD_COLOR: '#569CD6',
}

class MaterialUiInspector extends React.PureComponent {
  render() {
    const { theme, classes, PaperProps, ...props } = this.props
    const chromeTheme = theme.palette.type === 'dark'
      ? chromeDark
      : chromeLight
    return (
      <Paper
        {...PaperProps}
        className={cx(classes.paper, PaperProps && PaperProps.className)}
      >
        <ul className={classes.ul}>
          <Inspector
            {...props}
            key={chromeTheme.name}
            theme={chromeTheme}
          />
        </ul>
      </Paper>
    )
  }
}

export default withStyles(styles)(
  withTheme()(
    MaterialUiInspector
  )
)