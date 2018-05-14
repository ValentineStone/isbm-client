import { AUTHENTICATE_USER } from './types'
import jrpc from './jrpc'

import { createThunkAction } from './thunkActions'

export const authenticateUser = userCredentials => async dispatch => {
  const user = await dispatch(jrpc('authenticateUser', userCredentials))
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