import action from './action'
import translate from './translate'
import { NAVIGATE } from './types'
import assignDeep from 'assign-deep'
import qs from 'qs'

const ignoreQueryPrefix = { ignoreQueryPrefix: true }
const addQueryPrefix = { addQueryPrefix: true }


export const getNavigation = () => ({
  location,
  history,
  params: qs.parse(location.search, ignoreQueryPrefix),
  pathname: location.pathname
})

export const updateNavigation = () => dispatch => dispatch(
  action(NAVIGATE, {
    payload: getNavigation()
  })
)

const navigate = (url, params = {}, options = {}) => {
  if (options.mergeParams) {
    params = assignDeep(
      {},
      qs.parse(location.search, ignoreQueryPrefix),
      params || {}
    )
  }
  const path = (url === '.' ? location.pathname : url) + qs.stringify(params, addQueryPrefix)

  if (options.replace)
    history.replaceState(undefined, undefined, path)
  else
    history.pushState(undefined, undefined, path)

  return updateNavigation()
}

export default navigate