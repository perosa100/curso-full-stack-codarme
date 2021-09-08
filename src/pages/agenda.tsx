import { Button } from '@chakra-ui/button'
import { firebaseClient } from 'config/firebase/client'

export default function Agenda() {
  const handleLogout = () => firebaseClient.auth().signOut()
  return (
    <div>
      agenda
      <Button onClick={handleLogout}>Sair</Button>
    </div>
  )
}
