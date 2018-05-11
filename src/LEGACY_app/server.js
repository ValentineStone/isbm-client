const endpointURL = 'http://127.0.0.1:4000'

const authorizationHeaderFromJWT = jwt => jwt ? { Authorization: 'Bearer ' + this.jwt } : undefined

const isError = json => typeof json === 'object' && json && 'error' in json

class Server {

  constructor() {
    this.jwt = undefined
  }

  jrpc(...nameAndArgs) {
    return this.exchangeJSON(nameAndArgs)
  }

  exchangeJSON(json) {
    return fetch(endpointURL, {
      method: 'POST',
      body: JSON.stringify(json),
      headers: {
        ...authorizationHeaderFromJWT(this.jwt),
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(json => {
        if (isError(json))
          throw new Error(json.error)
        else
          return json
      })
  }

  get jwt() {
    return localStorage.getItem('jwt')
  }
  set jwt(jwt) {
    if (jwt)
      return localStorage.setItem('jwt', jwt)
    else
      return localStorage.removeItem('jwt')
  }

}

const server = new Server()

export default server