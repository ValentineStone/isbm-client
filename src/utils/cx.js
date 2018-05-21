export function flatten(from, to = []) {
  if (typeof from === 'string' || from instanceof String)
    to.push(from)
  else if (from && typeof from === 'object')
    if (typeof from[Symbol.iterator] === 'function')
      for (let item of from)
        flatten(item, to)
    else
      for (let key in from)
        if (from[key])
          to.push(key)
  return to
}

export default function cx() {
  return flatten(arguments).join(' ')
}
