export type Resource<Data> = {
  promise: Promise<Data>
  fetch(): Data
}

type Executor<Parameters, Return> = (parameters: Parameters) => Promise<Return>

export type Operation<Parameters, Return> = {
  execute: Executor<Parameters, Return>
  initial?: Return | Promise<Return>
}
