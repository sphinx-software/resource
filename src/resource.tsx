import { Resource } from './Contracts'

export default function resource<Data>(promise: Promise<Data>): Resource<Data> {
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
    }
  }
}
