import { JRPC } from './types'

import { createThunkAction } from './thunkActions'

const endpointURL = 'http://192.168.0.15:4000'

const isJRPCError =
  json => typeof json === 'object' && json && 'error' in json

const exchangeJSON = async (_json, jwt) => {
  const headers = { 'Content-Type': 'application/json' }
  if (jwt) headers.Authorization = `Bearer ${jwt}`
  const result = await fetch(endpointURL, {
    method: 'POST',
    body: JSON.stringify(_json),
    headers
  })
  const json = await result.json()
  if (isJRPCError(json))
    throw new Error(json.error)
  else
    return json
}


const jrpc = (...args) => (dispatch, getState) => {
  const jwt = getState().user.jwt
  return exchangeJSON(args, jwt)
}

const jrpcThunkAction = createThunkAction(
  JRPC, jrpc, {
    fromThunkAction: true,
    requestPayloadCreator: (jrpc, jwt) => ({ jrpc, jwt }),
    throws: failureAction => failureAction.payload
  })
export default jrpcThunkAction