import { Resource, Operation, Executor } from './Contracts'
import { useCallback, useState } from 'react'
import resource from './resource'

function resolveOperation<P, D>(
  operation: Operation<P, D> | Executor<P, D>
): Operation<P, D> {
  return typeof operation === 'function'
    ? {
        execute: operation
      }
    : operation
}

type DeferredExecutor<P> = (parameters: P) => void

export default function useResource<Parameters, Data>(
  operation: Operation<Parameters, Data> | Executor<Parameters, Data>
): [Resource<Data>, DeferredExecutor<Parameters>] {
  const { initial, execute } = resolveOperation(operation)

  const [resourceInstance, setResourceInstance] = useState<Resource<Data>>(
    initial
      ? resource(Promise.resolve(initial))
      : resource(new Promise(() => undefined))
  )

  const executor = useCallback(
    (parameters: Parameters) => {
      const instance: Resource<Data> = resource(
        execute(parameters, (handler) => {
          setTimeout(() => {
            instance.onCancel(handler)
          }, 0)
        })
      )

      setResourceInstance(instance)
    },
    [execute]
  )

  return [resourceInstance, executor]
}
