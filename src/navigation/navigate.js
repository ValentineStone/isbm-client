import { getNavState, setNavState } from './navState'
import merge from 'lodash/merge'


const navigate = (options, prevNavState) => {
  const {
    path,
    hash,
    params,
    merge = false,
    mergeParams = merge && params,
    push = true,
  } = options

  let newNavState = options
  let newParams = newNavState.params

  if (merge) {
    if (!prevNavState)
      prevNavState = getNavState()
    if (mergeParams)
      newParams = merge({}, prevNavState.params, newNavState.params)
    newNavState = {
      ...prevNavState,
      ...newNavState,
      params: newParams
    }
  }

  newNavState = getNavState(newNavState)

  setNavState(newNavState, push)

  return newNavState
}

export default navigate