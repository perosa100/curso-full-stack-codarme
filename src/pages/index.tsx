import { Container, Spinner } from '@chakra-ui/react'
import { Login } from 'components'
import { firebaseClient } from 'config/firebase/client'
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
    firebaseClient.auth().onAuthStateChanged((user) => {
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
  const authenticateUser = firebaseClient.auth().currentUser

  return authenticateUser ? <Agenda /> : <Login />
}
