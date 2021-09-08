import { Container, Spinner } from '@chakra-ui/react'
import { Login } from 'components'
import app from 'config/firebase/client'
import { useEffect, useState } from 'react'

import Agenda from './agenda'

interface Auth {
  loading: boolean
  user: any
}
export default function Index() {
  const [auth, setAuth] = useState<Auth>({
    loading: true,
    user: ''
  })

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setAuth({
        loading: false,
        user
      })
    })
  }, [])

  if (auth.loading) {
    return (
      <Container p={4}>
        <Spinner />
      </Container>
    )
  }
  const authenticateUser = app.auth().currentUser

  return authenticateUser ? <Agenda /> : <Login />
}
