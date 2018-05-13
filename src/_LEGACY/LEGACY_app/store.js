const store = {
  get: keyName => localStorage.getItem(keyName),
  set: (keyName, value) => localStorage.setItem(keyName, value),
  remove: keyName => localStorage.removeItem(keyName),
  getOrSet: (keyName, value) => {
    const existing = store.get(keyName)
    if (existing)
      return existing
    else
      store.set(keyName, value)
    return value
  }
}

store.setIfUnset = store.getOrSet

export default store