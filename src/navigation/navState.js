import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'

export const getNavState = (state = location) => {
  const path = state.pathname || state.path || ''
  const hash = state.search || ''
  let search = state.search || ''
  let params = state.params
  if (params)
    search = qs.parse(params, { addQueryPrefix: true })
  else
    params = qs.parse(search, { ignoreQueryPrefix: true })
  const href = path + search + hash
  return {
    path,
    hash,
    params,
    search,
    href,
  }
}

export const isSameNavState = (navStateA, navStateB) => {
  return navStateA.href === navStateB.href
    || navStateA.pathname === navStateB.pathname
    && navStateA.hash === navStateB.hash
    && isEqual(navStateA.params, navStateB.params)
}

export const setNavState = (navState, push = true) => {
  if (push)
    history.pushState(undefined, undefined, navState.href)
  else
    history.replaceState(undefined, undefined, navState.href)
}