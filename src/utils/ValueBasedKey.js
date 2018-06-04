let keyCounter = 0
export const ValueBasedKey = prefix => {
  const stringPrefix = prefix ? prefix + '.' : ''
  let prevValue = undefined
  let key = stringPrefix + keyCounter++
  return value => {
    if (!Object.is(prevValue, value)) {
      key = stringPrefix + keyCounter++
      prevValue = value
    }
    return key
  }
}