/** Handle frontend for authentication. */

import { Button } from "@mui/material"
import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Button onClick={() => signIn()} variant="contained">
        Prove you are human
      </Button>
    )
  }

  return (
    <Button onClick={() => signOut()} variant="contained">
      Log out
    </Button>
  )
}
