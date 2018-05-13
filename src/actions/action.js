const dummyObject = Object.freeze({})
function action(type, payloadAndMeta = dummyObject) {
  const action = {}
  action.type = type
  if ('payload' in payloadAndMeta)
    action.payload = payloadAndMeta.payload
  if ('meta' in payloadAndMeta)
    action.meta = payloadAndMeta.meta
  if (action.payload instanceof Error)
    action.error = true
  return action
}
export default action