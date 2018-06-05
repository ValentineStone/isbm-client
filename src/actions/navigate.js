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
  params: qs.parse(location.search, ignoreQueryPrefix)
})

const navigate = (url, params = {}, options = {}) => dispatch => {
  if (options.mergeParams) {
    params = assignDeep(
      {},
      qs.parse(location.search, ignoreQueryPrefix),
      params
    )
  }
  const path = (url === '.' ? location.pathname : url) + qs.stringify(params, addQueryPrefix)

  history.pushState(undefined, undefined, path)

  dispatch(action(NAVIGATE, {
    payload: getNavigation()
  }))
}


export default navigate