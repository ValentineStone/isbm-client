export default (objA, objB) => {
  if (Object.is(objA, objB)) {
    return true
  }
  if (typeof objA !== 'object' || objA === null ||
    typeof objB !== 'object' || objB === null) {
    return false
  }
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) {
    return false
  }
  // Test for A's keys different from B.
  for (const keyA of keysA) {
    if (!hasOwnProperty.call(objB, keyA) ||
      !Object.is(objA[keyA], objB[keyA])) {
      return false
    }
  }
  return true
}