import { Operation } from '../../src'

export type User = {
  name: string
  age: number
}

export type UserSearchCondition = {
  keyword: string
}

const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const GET_PROFILE: Operation<UserSearchCondition, User> = {
  initial: {
    name: 'Lucy',
    age: 25
  },
  async execute() {
    await wait(1000)
    return {
      name: 'Rikky',
      age: 30
    }
  }
}
