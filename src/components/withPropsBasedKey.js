import React from 'react'
import displayNameOf from '~/utils/displayNameOf'

let uniqueKeyCounter = 0
const falsy = () => false

const withPropsBasedKey = ({ needsNewKey: falsy }) => Component => {
  let prevProps = undefined
  let uniqueKey = uniqueKeyCounter++
  const HOC = props => {
    if (prevProps) {
      const newKeyRequired = needsNewKey(props, prevProps)
      if (newKeyRequired === false)
        ; // no new key needed
      else if (newKeyRequired === true)
        uniqueKey = uniqueKeyCounter++
      else if (
        typeof newKeyRequired === 'string'
        || typeof newKeyRequired === 'number'
      )
        uniqueKey = newKeyRequired
      else
        throw new TypeError('withPropsBasedKey: needsNewKey should return '
          + 'true, false or a string or number key')
    }
    prevProps = props
    return <Component {...props} key={uniqueKey} />
  }
  HOC.displayName = `withPropsBasedKey(${displayNameOf(Component)})`
  return HOC
}