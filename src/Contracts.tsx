export type CancellableResource = {
  cancel(error?: Error | string | unknown): void
  onCancel(handler: CancelHandler): void
}

export type Resource<Data> = {
  promise: Promise<Data>
  fetch(): Data
} & CancellableResource

export type CancelHandler = (error?: Error | string | unknown) => void
export type Canceller = (handler: CancelHandler) => void

export type Executor<Parameters, Return> = (
  parameters: Parameters,
  canceller: Canceller
) => Promise<Return>

export type Operation<Parameters, Return> = {
  execute: Executor<Parameters, Return>
  initial?: Return | Promise<Return>
}
