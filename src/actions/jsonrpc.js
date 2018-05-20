import { JSONRPC } from './types'

import { createThunkAction } from './thunkActions'

const endpointURL = `${location.protocol}//${location.hostname}:4000`

const isValidJSONRPC =
  json => typeof json === 'object' && json && json.jsonrpc === '2.0'

const toJsonrpc = (method, ...params) => ({
  method,
  params,
  jsonrpc: '2.0',
  id: 'dn-mr:' + Date.now() + '-' + Math.random()
})

const exchangeJSONRPC = async (_json, jwt) => {
  const headers = { 'Content-Type': 'application/json' }
  if (jwt) headers.Authorization = `Bearer ${jwt}`
  const result = await fetch(endpointURL, {
    method: 'POST',
    body: JSON.stringify(_json),
    headers
  })
  const json = await result.json()
  if (isValidJSONRPC(json))
    if (json.error)
      throw new Error(json.error)
    else
      return json.result
  else
    throw new TypeError('Recieved malformed JSON-RPC response: '
      + JSON.stringify(json, null, 2))
}


const jsonrpc = (...args) => (dispatch, getState) => {
  const jwt = getState().user.jwt
  return exchangeJSONRPC(toJsonrpc(...args), jwt)
}

const jsonrpcThunkAction = createThunkAction(
  JSONRPC, jsonrpc, {
    fromThunkAction: true,
    requestPayloadCreator: (jsonrpc, jwt) => ({ jsonrpc, jwt }),
    throws: failureAction => failureAction.payload
  })
export default jsonrpcThunkAction