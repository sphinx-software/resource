# @sphinx-software/resource

> Asynchronous resource with `Suspense` supports 

[![NPM](https://img.shields.io/npm/v/@sphinx-software/resource.svg)](https://www.npmjs.com/package/@sphinx-software/resource) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @sphinx-software/resource
```

## The asynchronous equation

```text
Data = await Operation(Parameter)
```

In the traditional approach, the above equation is showing how we deal with async resources / data


Let's change the equation into a new form:


```text
Resource = Operation()

Data = Resource.fetch(Parameter)
```

That's what library all about. It helps you defer the `Operation` and its `Parameters` 👌


## Usage

Let's declare an Operation called `GET_PROFILE`

```tsx
// The operations.tsx file

import { Operation } from '@sphinx-software/resource'

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
  async execute(condition) {
    
    // TODO will call the real searching API with the given condition
    console.log(condition)

    await wait(1000)

    return {
      name: 'Rikky',
      age: 30
    }
  }
}
``` 

An `Operation` needs at least one `execute` method with given parameters.

You can also define the default value of the resource by providing the `initial` property


## The `useResource()` hook

Now, let's get the `Resource` with the newly created `Operation`


```tsx
import React, { Suspense } from 'react'
import { GET_PROFILE, User } from './operations'
import { useResource, Resource } from '@sphinx-software/resource'

// ...

const UserDetail = ({ resource }: { resource: Resource<User> }) => {
  
  const user = resource.fetch()
  
  return (<span>Hello {user.name}</span>)
}

const App = () => {
  const [userResource, execute] = useResource(GET_PROFILE)
  
  return (
    <div>
      <button onClick={() => execute({ keyword: 'rikky' })}>Load</button>
      <Suspense fallback='Loading...'>
        <UserDetail resource={userResource} />
      </Suspense>
    </div>
  )
}
```

- Each time you press the `Load` button, the resource will be re-created.
- Calling the `fetch()` method will get the user data or - __make the `UserDetail` component suspended__

## The `useResourceState()` hook

Sometimes, you just need to read the execution state of the resource to update the
component based on it. You can call the `useResourceState()` hook for it.

```tsx
// ...

const { error, loading, result } = useResourceState(userResource)

```


### Canceling the operation

We eventually want to cancel the operation while it is executing.
In operation definition, we can archive it by registering the cancel callback.

```tsx
export const WAIT: Operation<number, void> = {
  execute(ms, onCancel) {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(), ms)

      onCancel(() => {
        clearTimeout(timeout)
      })
    })
  }
}
```

That's it! Happy coding! ❤️

## License

MIT © [monkey-programmer](https://github.com/monkey-programmer)
