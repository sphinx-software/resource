import { Executor } from '@sphinx-software/resource'

export type User = {
  name: string
  age: number
}

export type UserSearchCondition = {
  keyword: string
}

export const GET_PROFILE: Executor<UserSearchCondition, User> = (
  condition,
  onCancel
) => {
  console.log(condition)

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve({
        name: 'Rikky',
        age: 30
      })
    }, 1000)

    onCancel(() => {
      clearTimeout(timeout)
      resolve({
        name: 'Luffy - Just in case',
        age: 25
      })
    })
  })
}
