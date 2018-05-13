import action from './action'

export const createPayloadAndMeta = (
  payloadCreator, metaCreator, allowUndefined, ...args
) => {
  const payloadAndMeta = {}
  if (payloadCreator)
    payloadAndMeta.payload = payloadCreator(...args)
  else if (args.length && (args[0] !== undefined || allowUndefined))
    payloadAndMeta.payload = args[0]
  if (metaCreator)
    payloadAndMeta.meta = metaCreator(...args)
  return payloadAndMeta
}

export const createThunkAction = (
  TYPE,
  wrappedFunction,
  {
    fromThunkAction,
    throws,

    requestPayloadCreator,
    requestMetaCreator,
    successPayloadCreator,
    successMetaCreator,
    failurePayloadCreator,
    failureMetaCreator,

  } = {},
) => {
  const REQUEST_TYPE = TYPE.REQUEST || TYPE[0]
  const SUCCESS_TYPE = TYPE.SUCCESS || TYPE[1]
  const FAILURE_TYPE = TYPE.FAILURE || TYPE[2]
  return (...args) => async (dispatch, getState) => {
    if (REQUEST_TYPE !== undefined)
      dispatch(action(REQUEST_TYPE, createPayloadAndMeta(
        requestPayloadCreator,
        requestMetaCreator,
        true,
        ...args
      )))
    try {
      const result = fromThunkAction
        ? await wrappedFunction(...args)(dispatch, getState)
        : await wrappedFunction(...args)

      if (SUCCESS_TYPE !== undefined)
        dispatch(action(SUCCESS_TYPE, createPayloadAndMeta(
          successPayloadCreator,
          successMetaCreator,
          false,
          result, ...args
        )))
    } catch (error) {
      if (FAILURE_TYPE !== undefined) {
        const failureAction = dispatch(action(FAILURE_TYPE, createPayloadAndMeta(
          failurePayloadCreator,
          failureMetaCreator,
          true,
          error, ...args
        )))
        if (throws)
          if (throws === 'function')
            throw throws(failureAction)
          else
            throw new Error(`${FAILURE_TYPE}: ${error}`)
      }
      else
        throw error
    }
  }
}

const dummyObject = Object.freeze({})
const dummyArray = Object.freeze([])

const joinThunkActions = (
  { sequential },
  ...thunkActionsAndOptions
) => {

  if (Boolean(sequential) !== sequential)
    throw new TypeError('Failed to join thunk actions: options.sequential is undefined')

  return (...args) => async (dispatch, getState) => {

    const results = []
    let previousResult = undefined

    for (const entry of thunkActionsAndOptions) {

      const thunkAction = Array.isArray(entry)
        ? entry[0]
        : entry

      const options = Array.isArray(entry)
        ? entry[1]
        : dummyObject

      let thunkArguments = dummyArray
      if (typeof options.withArguments === 'function')
        if (sequential)
          thunkArguments = options.withArguments(getState, previousResult, ...args)
        else
          thunkArguments = options.withArguments(getState, ...args)
      else if (options.withArguments === true)
        thunkArguments = args

      if (sequential)
        previousResult = await thunkAction(...thunkArguments)(dispatch, getState)
      else
        results.push(thunkAction(...thunkArguments)(dispatch, getState))
    }
    if (sequential)
      return await Promise.all(results)
    else
      return previousResult
  }
}

export const createThunkActionSequence =
  (...args) => joinThunkActions({ sequential: true }, ...args)
export const createThunkActionUnion =
  (...args) => joinThunkActions({ sequential: false }, ...args)

export const noThrow = (
  originalThunkAction,
  errorAction
) => value => async (dispatch, getState) => {
  try {
    await originalThunkAction(value)(dispatch, getState)
  } catch (error) {
    if (errorAction)
      dispatch(errorAction(error))
  }
}