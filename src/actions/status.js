export const STATUS_INITIAL = 'STATUS_INITIAL'
export const STATUS_REQUEST = 'STATUS_REQUEST'
export const STATUS_SUCCESS = 'STATUS_SUCCESS'
export const STATUS_FAILURE = 'STATUS_FAILURE'
export const STATUS_UNKNOWN = 'STATUS_UNKNOWN'

export const overallStatus = (...args) => {
  const statuses = args.length > 1
    ? args
    : Array.isArray(args[0])
      ? args[0]
      : Object.values(args[0])
  let overallCount = 0
  let initialCount = 0
  let requestCount = 0
  let successCount = 0
  let failureCount = 0
  for (let status of statuses) {
    switch (status) {
      case STATUS_INITIAL:
        initialCount++; overallCount++; break
      case STATUS_REQUEST:
        requestCount++; overallCount++; break
      case STATUS_SUCCESS:
        successCount++; overallCount++; break
      case STATUS_FAILURE:
        failureCount++; overallCount++; break
    }
  }
  let overallStatus
  if (failureCount)
    overallStatus = STATUS_FAILURE
  else if (requestCount)
    overallStatus = STATUS_REQUEST
  else if (successCount === overallCount)
    overallStatus = STATUS_SUCCESS
  else
    overallStatus = STATUS_INITIAL

  return overallStatus
}