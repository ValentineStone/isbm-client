import React from 'react'
import Badge from '@material-ui/core/Badge'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import NativeCalendar from 'react-calendar/dist/entry.nostyle'

class Calendar extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.lastBadges === props.badges)
      return null
    else {
      const badgesPerDate = {}
      for (let date of props.badges) {
        const dateString = date.toDateString()
        badgesPerDate[dateString] = (badgesPerDate[dateString] || 0) + 1
      }
      return {
        lastBadges: props.badges,
        badgesPerDate
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = { badgesPerDate: {} }
  }

  render() {
    const {classes, badges, ...props} = this.props
    return (
      <Paper className={this.props.classes.calendar}>
        <NativeCalendar
          tileContent={this.tileContent}
          {...props}
        />
      </Paper>
    )
  }

  tileContent = ({ date }) => {
    const count = this.state.badgesPerDate[date.toDateString()]
    if (count)
      return (
        <Badge
          color="primary"
          badgeContent={count}
          className={this.props.classes.badge}
        >{''}</Badge>
      )
    else
      return null
  }


}

const styles = theme => ({
  badge: {
    position: 'absolute',
    right: 14,
    top: 5,
  },
  calendar: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    padding: theme.spacing.unit,
    width: 400,
    '& button': {
      background: 'transparent',
      fontFamily: theme.typography.fontFamily,
      padding: 10,
      color: 'inherit',
      overflow: 'visible !important',
      position: 'relative',
      border: '1px solid transparent',
    },
    '& button:focus': {
      border: `1px solid rgba(0,0,0,.2)`,
      outline: 'none'
    },
    '& button:hover': {
      background: 'rgba(0,0,0,.1)'
    },
    '& button.react-calendar__navigation__arrow': {
      fontSize: 16
    },
    '& .react-calendar__navigation': {
      marginBottom: 10,
    },
    '& .react-calendar__month-view__weekdays__weekday': {
      textAlign: 'center',
      paddingBottom: 20,
    },
    '& button.react-calendar__month-view__days__day--neighboringMonth': {
      color: theme.palette.text.secondary,
    },
    [`& button.react-calendar__tile--active,
      & button.react-calendar__tile--hasActive,
      & button:hover.react-calendar__tile--active,
      & button:hover.react-calendar__tile--hasActive`]: {
      borderColor: theme.palette.primary.main
    }
  }
})

export default withStyles(styles)(Calendar)