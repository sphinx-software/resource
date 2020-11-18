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

import { Operation, useResource } from '@sphinx-software/resource'

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
import { GET_PROFILE } from './operations'
import { useResource } from '@sphinx-software/resource'

// ...

const App = () => {
  const [userResource, execute] = useResource()
  
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

## License

MIT © [monkey-programmer](https://github.com/monkey-programmer)
