import { Resource, Operation } from './Contracts'
import { useCallback, useState } from 'react'
import resource from './resource'

type Executor<P> = (parameters: P) => void

export default function useResource<Parameters, Data>({
  initial,
  execute
}: Operation<Parameters, Data>): [Resource<Data>, Executor<Parameters>] {
  const [resourceInstance, setResourceInstance] = useState<Resource<Data>>(
    initial
      ? resource(Promise.resolve(initial))
      : resource(new Promise(() => undefined))
  )

  const executor = useCallback(
    (parameters: Parameters) => {
      setResourceInstance(resource(execute(parameters)))
    },
    [execute]
  )

  return [resourceInstance, executor]
}
