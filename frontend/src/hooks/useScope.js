import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useInterval from './useInterval'

export const initialScope = {
  admin: [],
  editor: [],
  viewer: [],
}

const scopeContext = createContext(initialScope)

function useScope () {
  const [scope, setScope] = useState(initialScope)

  useEffect(() => getUserScope(), [])
  useInterval(() => getUserScope(), 10000)

  const getUserScope = () => {
    axios.get('/api/userscope').then(
      resp => setScope(resp.data),
    ).catch(
      () => setScope({ ...initialScope }),
    )
  }

  return scope
}

export default function ScopeProvider ({ children }) {
  const scopeCxt = useScope()
  return (
    <scopeContext.Provider value={scopeCxt}>
      {children}
    </scopeContext.Provider>
  )
}

export function ScopeConsumer () {
  return useContext(scopeContext)
}

export function canModifyData (workspaceId) {
  const { admin, editor } = ScopeConsumer()
  return admin.includes(workspaceId) || editor.includes(workspaceId)
}

export function canGrantPerm (workspaceId) {
  const { admin } = ScopeConsumer()
  return admin.includes(workspaceId)
}
