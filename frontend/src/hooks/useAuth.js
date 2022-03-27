import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const initialAuth = {
  auth: {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
  },
  setAuth: () => {
  },
}

const authContext = createContext(initialAuth)

function useAuth () {
  const [auth, setAuth] = useState(initialAuth.auth)

  useEffect(() => {
    const getUserInfo = async () => {
      const resp = await axios.get('/api/userinfo')
      setAuth(await resp.data)
    }

    getUserInfo().catch(() => {
      setAuth({ ...initialAuth.auth })
    })
  }, [])

  return { auth, setAuth }
}

export function AuthProvider ({ children }) {
  const authCxt = useAuth()
  return (
    <authContext.Provider value={authCxt}>
      {children}
    </authContext.Provider>
  )
}

export function AuthConsumer () {
  return useContext(authContext)
}

export default function RequireAuth ({ children }) {
  const { auth } = AuthConsumer()
  return auth?.username ? children : null
}
