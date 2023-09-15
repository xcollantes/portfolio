/** Handle frontend for authentication. */

import { Button } from "@mui/material"
import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
  const { data: session, status } = useSession()

  const authUser = () => {
    // `prompt`: https://stackoverflow.com/q/77102556/8278075
    signIn("google", undefined, { prompt: "select_account" })
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
}
