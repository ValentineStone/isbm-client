import { AUTHENTICATE_USER } from './types'
import jsonrpc from './jsonrpc'

import { createThunkAction } from './thunkActions'

export const authenticateUser = userCredentials => async dispatch => {
  const user = await dispatch(jsonrpc('authenticateUser', userCredentials))
  if (user)
    localStorage.setItem('jwt', user.jwt)
  return user
}

const identifyUserThunkAction =
  createThunkAction(
    AUTHENTICATE_USER,
    authenticateUser,
    { fromThunkAction: true }
  )
export default identifyUserThunkAction