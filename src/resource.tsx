import { CancelHandler, CancellableResource, Resource } from './Contracts'
import { EventEmitter } from 'events'

export default function resource<Data>(
  promise: Promise<Data>
): Resource<Data> & CancellableResource {
  const ee = new EventEmitter()

  let _result: Data
  let _error: Error | null = null
  let loading = true

  promise
    .then((result) => (_result = result))
    .catch((error) => (_error = error))
    .finally(() => (loading = false))

  return {
    promise,
    fetch(): Data {
      if (_error) {
        throw _error
      }

      if (loading) {
        throw promise
      }

      return _result
    },
    onCancel(handler: CancelHandler): void {
      ee.on('cancelled', handler)
    },
    cancel(error: Error | null = null): void {
      if (loading) {
        _error = error
        loading = false
        ee.emit('cancelled', error)
      }
    }
  }
}
