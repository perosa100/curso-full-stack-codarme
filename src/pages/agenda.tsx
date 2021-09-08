import { Button } from '@chakra-ui/button'

import app from './../config/firebase/client'

export default function Agenda() {
  const handleLogout = () => app.auth().signOut()
  return (
    <div>
      agenda
      <Button onClick={handleLogout}>Sair</Button>
    </div>
  )
}
