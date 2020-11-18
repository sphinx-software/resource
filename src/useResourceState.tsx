import { Resource } from './Contracts'
import { Reducer, useEffect, useReducer } from 'react'

type ResourceState<Data> = {
  error: Error | null
  loading: boolean
  result: Data | null
}

enum ACTION {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED'
}

type Action<Return> = {
  type: ACTION
  payload?: Return | Error
}

function reducer<Data>(
  state: ResourceState<Data>,
  { type, payload }: Action<Data>
): ResourceState<Data> {
  switch (type) {
    case ACTION.PENDING:
      return {
        error: null,
        loading: true,
        result: null
      }
    case ACTION.REJECTED:
      return {
        error: payload as Error,
        result: null,
        loading: false
      }
    case ACTION.RESOLVED:
      return {
        error: null,
        result: payload as Data,
        loading: false
      }
  }
  return state
}

export default function useResourceState<Data>(
  resource: Resource<Data>
): ResourceState<Data> {
  const [state, dispatch] = useReducer<
    Reducer<ResourceState<Data>, Action<Data>>
  >(reducer, {
    error: null,
    loading: false,
    result: null
  })

  useEffect(() => {
    dispatch({ type: ACTION.PENDING })
    resource.promise
      .then((value) => dispatch({ type: ACTION.RESOLVED, payload: value }))
      .catch((error) => dispatch({ type: ACTION.REJECTED, payload: error }))
  }, [resource.promise])

  return state
}
