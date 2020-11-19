import React, { Suspense, useEffect } from 'react'
import {
  Resource,
  useResource,
  useResourceState
} from '@sphinx-software/resource'
import { GET_PROFILE, User } from './operations'

const UserDetail = ({ resource }: { resource: Resource<User> }) => {
  const user = resource.fetch()
  return <span>Hello {user.name}</span>
}

const App = () => {
  const [userResource, execute] = useResource(GET_PROFILE)
  const { error, loading, result } = useResourceState(userResource)

  useEffect(() => execute({ keyword: 'rikky' }), [execute])
  return (
    <div>
      <Suspense fallback='Loading...'>
        <UserDetail resource={userResource} />
      </Suspense>

      <span aria-label='smile' role='img'>
        😄
      </span>

      <div>
        <button onClick={() => execute({ keyword: 'rikky' })}>Load</button>
        <button onClick={() => userResource.cancel()}>Cancel</button>
      </div>
      <ul>
        <li>
          <strong>error</strong>&nbsp;
          <pre>{JSON.stringify(error)}</pre>
        </li>
        <li>
          <strong>loading</strong>&nbsp;
          <pre>{JSON.stringify(loading)}</pre>
        </li>
        <li>
          <strong>result</strong>&nbsp;
          <pre>{JSON.stringify(result)}</pre>
        </li>
      </ul>
    </div>
  )
}

export default App
