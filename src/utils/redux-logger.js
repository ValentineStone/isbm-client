const pad = (v, times) => String(v).padStart(times, 0)

const formatTime = time =>
  `${pad(time.getHours(), 2)
  }:${pad(time.getMinutes(), 2)
  }:${pad(time.getSeconds(), 2)
  }.${pad(time.getMilliseconds(), 3)}`

const loggerMiddleware = store => next => action => {
  if (action && typeof action === 'object' && 'type' in action) {
    const prevState = store.getState()
    console.group(
      `%caction %c${action.type} %c@ ${formatTime(new Date())}`,
      'color: gray; font-weight: lighter',
      '',
      'color: gray; font-weight: lighter'
    )
    console.log('%cprev state', 'color: #9E9E9E; font-weight: bold', prevState)
    console.log('%caction    ', 'color: #03A9F4; font-weight: bold', action)
    next(action)
    const nextState = store.getState()
    console.log('%cnext state', 'color: #4CAF50; font-weight: bold', nextState)
    console.groupEnd()
  }
  else {
    next(action)
  }
}

export default loggerMiddleware