const isFunc = v => typeof v === 'function'
const listenerTypeError = 'The "listener" argument must be of type Function'
export default class EventEmmiter {
  constructor() {
    this.events = new Map()
    this.off = this.remove
  }

  getEmitter(name) {
    let emitter = this.events.get(name)
    if (!emitter) {
      emitter = {
        on: new Set(),
        once: new Set()
      }
      this.events.set(name, emitter)
    }
    return emitter
  }

  on(name, listener) {
    if (!isFunc(listener))
      throw new TypeError(listenerTypeError)
    this.getEmitter(name).on.add(listener)
  }

  once(name, listener) {
    if (!isFunc(listener))
      throw new TypeError(listenerTypeError)
    this.getEmitter(name).once.add(listener)
  }

  remove(name, listener, type) {
    if (type !== 'on')
      this.getEmitter(name).once.delete(listener)
    if (type !== 'once')
      this.getEmitter(name).on.delete(listener)
  }

  emit(name, ...args) {
    let emitter = this.getEmitter(name)
    let once = emitter.once
    if (once.size)
      [emitter.once, once] = [new Set(), emitter.once]
    once.forEach(listener => listener(...args))
    emitter.on.forEach(listener => listener(...args))
  }
}