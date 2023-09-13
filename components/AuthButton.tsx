/** Handle frontend for authentication. */

import { Button } from "@mui/material"
import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
  const { data: session, status } = useSession()

  // Avoids showing button on load
  if (status == "loading") {
    return
  }

  if (!session) {
    return (
      <Button onClick={() => signIn()} variant="contained">
        Prove you are human
      </Button>
    )
  }
}
