/** Handle frontend for authentication. */

import { Button } from "@mui/material"
import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
  const { data: session, status } = useSession()

  const authUser = () => {
    signIn("google")
  }

  // Avoids showing button on load
  if (status == "loading") {
    return
  }

  if (!session) {
    return (
      <Button onClick={() => authUser()} variant="contained">
        Prove you are human to unlock content
      </Button>
    )
  }

  return (
    <Button onClick={() => signOut()} variant="contained">
      Sign out
    </Button>
  )
}
