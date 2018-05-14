import { LOG_OUT_USER } from './types'
import jrpc from './jrpc'

import { createThunkAction } from './thunkActions'

export const logOutUser = () => async dispatch => {
  const success = await dispatch(jrpc('logOutUser'))
  if (success)
    localStorage.removeItem('jwt')
}

const logOutUserThunkAction =
  createThunkAction(
    LOG_OUT_USER,
    logOutUser,
    { fromThunkAction: true }
  )
export default logOutUserThunkAction